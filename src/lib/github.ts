const GITHUB_API = "https://api.github.com";
const GRAPHQL_API = "https://api.github.com/graphql";
const OWNER = "ShemaiahYaba";

function authHeaders() {
  const token = process.env.GITHUB_TOKEN;
  return {
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  };
}

export interface GithubRepo {
  name: string;
  nameWithOwner: string;
  description: string | null;
  isPrivate: boolean;
  url: string;
  stargazerCount: number;
  topics: string[];
}

export interface GithubStats {
  totalContributions: number;
  pinnedRepos: GithubRepo[];
}

const PINNED_REPOS_QUERY = `
  query {
    user(login: "${OWNER}") {
      pinnedItems(first: 6, types: [REPOSITORY]) {
        nodes {
          ... on Repository {
            name
            nameWithOwner
            description
            isPrivate
            url
            stargazerCount
            repositoryTopics(first: 10) {
              nodes {
                topic { name }
              }
            }
          }
        }
      }
      contributionsCollection {
        contributionCalendar {
          totalContributions
        }
      }
    }
  }
`;

export async function fetchGithubStats(): Promise<GithubStats> {
  const res = await fetch(GRAPHQL_API, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ query: PINNED_REPOS_QUERY }),
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    throw new Error(`GitHub GraphQL error: ${res.status}`);
  }

  const json = await res.json();
  const user = json.data?.user;

  if (!user) throw new Error("GitHub user not found");

  const pinnedRepos: GithubRepo[] = (user.pinnedItems?.nodes ?? []).map(
    (node: {
      name: string;
      nameWithOwner: string;
      description: string | null;
      isPrivate: boolean;
      url: string;
      stargazerCount: number;
      repositoryTopics: { nodes: { topic: { name: string } }[] };
    }) => ({
      name: node.name,
      nameWithOwner: node.nameWithOwner,
      description: node.description,
      isPrivate: node.isPrivate,
      url: node.url,
      stargazerCount: node.stargazerCount,
      topics: node.repositoryTopics.nodes.map(
        (t: { topic: { name: string } }) => t.topic.name
      ),
    })
  );

  return {
    totalContributions:
      user.contributionsCollection.contributionCalendar.totalContributions,
    pinnedRepos,
  };
}

export async function fetchRepoReadme(repoName: string): Promise<string> {
  try {
    const res = await fetch(
      `${GITHUB_API}/repos/${OWNER}/${repoName}/readme`,
      {
        headers: authHeaders(),
        next: { revalidate: 0 },
      }
    );
    if (!res.ok) return "";
    const data = await res.json();
    return Buffer.from(data.content, "base64").toString("utf-8");
  } catch {
    return "";
  }
}

export async function fetchAllRepos(): Promise<GithubRepo[]> {
  const repos: GithubRepo[] = [];
  let page = 1;

  while (true) {
    const res = await fetch(
      `${GITHUB_API}/users/${OWNER}/repos?per_page=100&page=${page}&type=all`,
      { headers: authHeaders(), next: { revalidate: 0 } }
    );
    if (!res.ok) break;
    const data = await res.json();
    if (!data.length) break;

    for (const r of data) {
      repos.push({
        name: r.name,
        nameWithOwner: r.full_name,
        description: r.description,
        isPrivate: r.private,
        url: r.html_url,
        stargazerCount: r.stargazers_count,
        topics: r.topics ?? [],
      });
    }

    if (data.length < 100) break;
    page++;
  }

  return repos;
}
