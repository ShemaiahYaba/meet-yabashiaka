import { useQuery } from "@tanstack/react-query";
import type { DisplayProject } from "@/lib/projects";

async function fetchProjects(): Promise<DisplayProject[]> {
  const res = await fetch("/api/projects");
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    staleTime: 5 * 60 * 1000,
  });
}
