import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { ProjectData } from "@/lib/projects";

async function fetchAllProjects(): Promise<ProjectData[]> {
  const res = await fetch("/api/projects/all");
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}

async function updateProject(id: string, updates: Partial<ProjectData>): Promise<ProjectData> {
  const res = await fetch(`/api/projects/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error("Failed to update project");
  return res.json();
}

async function reorderProjects(orderedIds: string[]): Promise<void> {
  const res = await fetch("/api/projects/reorder", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ orderedIds }),
  });
  if (!res.ok) throw new Error("Failed to reorder projects");
}

async function triggerSync(): Promise<{ synced: number; newRepos: number }> {
  const res = await fetch("/api/sync-github", { method: "POST" });
  if (!res.ok) throw new Error("Sync failed");
  return res.json();
}

async function uploadImage(projectId: string, file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch(`/api/projects/${projectId}/image`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Upload failed");
  const data = await res.json();
  return data.url as string;
}

export function useAdminProjects() {
  return useQuery({
    queryKey: ["admin-projects"],
    queryFn: fetchAllProjects,
    staleTime: 0,
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<ProjectData> }) =>
      updateProject(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function useReorderProjects() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (orderedIds: string[]) => reorderProjects(orderedIds),
    onMutate: async (orderedIds) => {
      await queryClient.cancelQueries({ queryKey: ["admin-projects"] });
      const previous = queryClient.getQueryData<ProjectData[]>(["admin-projects"]);
      queryClient.setQueryData<ProjectData[]>(["admin-projects"], (old) => {
        if (!old) return old;
        return [...old].sort(
          (a, b) => orderedIds.indexOf(a.id) - orderedIds.indexOf(b.id)
        );
      });
      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) {
        queryClient.setQueryData(["admin-projects"], ctx.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function useSyncGithub() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: triggerSync,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
    },
  });
}

export function useUploadImage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ projectId, file }: { projectId: string; file: File }) =>
      uploadImage(projectId, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
    },
  });
}
