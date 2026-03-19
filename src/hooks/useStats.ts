import { useQuery } from "@tanstack/react-query";

export interface DynamicStats {
  soloProjects: number;
  collaborations: number;
  githubCommits: number;
}

async function fetchStats(): Promise<DynamicStats> {
  const res = await fetch("/api/stats");
  if (!res.ok) throw new Error("Failed to fetch stats");
  return res.json();
}

export function useStats() {
  return useQuery({
    queryKey: ["stats"],
    queryFn: fetchStats,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
