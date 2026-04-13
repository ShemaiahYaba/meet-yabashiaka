import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getProjects, saveProjects } from "@/lib/projects";
import { fetchGithubStats, fetchAllRepos, fetchRepoReadme, detectCollaboration } from "@/lib/github";

function isCronRequest(request: Request): boolean {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) return false;
  return request.headers.get("authorization") === `Bearer ${cronSecret}`;
}

async function runSync(request: Request) {
  const authed = await isAuthenticated();
  const isCron = isCronRequest(request);

  if (!authed && !isCron) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [existingProjects, allRepos, githubStats] = await Promise.all([
    getProjects(),
    fetchAllRepos(),
    fetchGithubStats().catch(() => ({ totalContributions: 0, pinnedRepos: [] })),
  ]);

  const repoMap = new Map(allRepos.map((r) => [r.name, r]));

  // Update github data for existing tracked projects
  const updated = await Promise.all(
    existingProjects.map(async (project) => {
      const repo = repoMap.get(project.id);
      if (!repo) return project;

      const [readme, isCollab] = await Promise.all([
        fetchRepoReadme(project.id),
        detectCollaboration(project.id),
      ]);

      return {
        ...project,
        isCollaboration: isCollab,
        github: {
          name: repo.name,
          description: repo.description ?? "",
          readme,
          stars: repo.stargazerCount,
          topics: repo.topics,
          isPrivate: repo.isPrivate,
          htmlUrl: repo.url,
          lastSynced: new Date().toISOString(),
        },
      };
    })
  );

  // Add all repos not yet tracked (hidden by default, admin enables what they want)
  const trackedIds = new Set(existingProjects.map((p) => p.id));
  const maxSort = Math.max(...existingProjects.map((p) => p.sortOrder), -1);
  let sortOffset = maxSort + 1;

  for (const repo of allRepos) {
    if (!trackedIds.has(repo.name)) {
      const [readme, isCollab] = await Promise.all([
        fetchRepoReadme(repo.name),
        detectCollaboration(repo.name),
      ]);
      updated.push({
        id: repo.name,
        fullName: repo.nameWithOwner,
        visible: false,
        sortOrder: sortOffset++,
        isCollaboration: isCollab,
        liveUrl: null,
        customTitle: null,
        customDescription: null,
        customImage: null,
        customGallery: [],
        tech: repo.topics,
        progress: 0,
        github: {
          name: repo.name,
          description: repo.description ?? "",
          readme,
          stars: repo.stargazerCount,
          topics: repo.topics,
          isPrivate: repo.isPrivate,
          htmlUrl: repo.url,
          lastSynced: new Date().toISOString(),
        },
      });
    }
  }

  await saveProjects(updated);

  return NextResponse.json({
    ok: true,
    synced: updated.length,
    newRepos: sortOffset - maxSort - 1,
  });
}

// Vercel cron calls GET
export async function GET(request: Request) {
  return runSync(request);
}

// Admin manual trigger calls POST
export async function POST(request: Request) {
  return runSync(request);
}
