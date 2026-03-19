import { NextResponse } from "next/server";
import { getProjects, getAdminConfig } from "@/lib/projects";
import { fetchGithubStats } from "@/lib/github";

export async function GET() {
  const [projects, config, githubStats] = await Promise.all([
    getProjects(),
    getAdminConfig(),
    fetchGithubStats().catch(() => ({ totalContributions: 0, contributionGraph: [], pinnedRepos: [] })),
  ]);

  const visibleProjects = projects.filter((p) => p.visible);

  const soloProjects =
    config.statsOverrides.soloProjects ??
    visibleProjects.filter((p) => !p.isCollaboration && p.progress === 100)
      .length;

  const collaborations =
    config.statsOverrides.collaborations ??
    visibleProjects.filter((p) => p.isCollaboration).length;

  const githubCommits =
    config.statsOverrides.githubCommits ?? githubStats.totalContributions;

  return NextResponse.json({
    soloProjects,
    collaborations,
    githubCommits,
    contributionGraph: githubStats.contributionGraph,
  });
}
