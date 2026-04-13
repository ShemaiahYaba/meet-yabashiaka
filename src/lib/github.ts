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

export interface ContributionDay {
  date: string;
  count: number;
}

export interface GithubStats {
  totalContributions: number;
  contributionGraph: ContributionDay[];
  pinnedRepos: GithubRepo[];
}

const STATS_QUERY = `
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
              nodes { topic { name } }
            }
          }
        }
      }
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;

export async function fetchGithubStats(): Promise<GithubStats> {
  const res = await fetch(GRAPHQL_API, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ query: STATS_QUERY }),
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error(`GitHub GraphQL error: ${res.status}`);

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

  const calendar = user.contributionsCollection.contributionCalendar;
  const contributionGraph: ContributionDay[] = (calendar.weeks ?? []).flatMap(
    (week: { contributionDays: { date: string; contributionCount: number }[] }) =>
      week.contributionDays.map((d) => ({ date: d.date, count: d.contributionCount }))
  );

  return {
    totalContributions: calendar.totalContributions,
    contributionGraph,
    pinnedRepos,
  };
}

export async function fetchRepoReadme(repoName: string): Promise<string> {
  try {
    const res = await fetch(`${GITHUB_API}/repos/${OWNER}/${repoName}/readme`, {
      headers: authHeaders(),
      next: { revalidate: 0 },
    });
    if (!res.ok) return "";
    const data = await res.json();
    return Buffer.from(data.content, "base64").toString("utf-8");
  } catch {
    return "";
  }
}

// Returns true if the repo has contributors other than the owner (i.e. is a collaboration)
export async function detectCollaboration(repoName: string): Promise<boolean> {
  try {
    const res = await fetch(
      `${GITHUB_API}/repos/${OWNER}/${repoName}/contributors?per_page=10`,
      { headers: authHeaders(), next: { revalidate: 0 } }
    );
    if (!res.ok) return false;
    const contributors: { login: string }[] = await res.json();
    return contributors.some((c) => c.login.toLowerCase() !== OWNER.toLowerCase());
  } catch {
    return false;
  }
}

export async function fetchAllRepos(): Promise<GithubRepo[]> {
  const repos: GithubRepo[] = [];
  let page = 1;

  while (true) {
    const res = await fetch(
      `${GITHUB_API}/users/${OWNER}/repos?per_page=100&page=${page}&type=owner`,
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
