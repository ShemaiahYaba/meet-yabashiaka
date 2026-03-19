"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  RefreshCw,
  ChevronUp,
  ChevronDown,
  Pencil,
  LogOut,
  CheckCircle,
  Clock,
  Lock,
  Unlock,
  Users,
  User,
} from "lucide-react";
import {
  useAdminProjects,
  useUpdateProject,
  useReorderProjects,
  useSyncGithub,
} from "@/hooks/useAdminProjects";

export default function AdminDashboard() {
  const router = useRouter();
  const { data: projects, isLoading, error } = useAdminProjects();
  const updateProject = useUpdateProject();
  const reorderProjects = useReorderProjects();
  const syncGithub = useSyncGithub();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  function move(id: string, direction: "up" | "down") {
    if (!projects) return;
    const sorted = [...projects].sort((a, b) => a.sortOrder - b.sortOrder);
    const idx = sorted.findIndex((p) => p.id === id);
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= sorted.length) return;
    const orderedIds = sorted.map((p) => p.id);
    [orderedIds[idx], orderedIds[swapIdx]] = [orderedIds[swapIdx], orderedIds[idx]];
    reorderProjects.mutate(orderedIds);
  }

  const sorted = projects
    ? [...projects].sort((a, b) => a.sortOrder - b.sortOrder)
    : [];

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-lg font-semibold text-foreground">
            Project Dashboard
          </h1>
          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">
            Manage visibility, order, and overrides
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => syncGithub.mutate()}
            disabled={syncGithub.isPending}
            className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs text-foreground hover:bg-[hsl(var(--muted))] disabled:opacity-50 transition-colors"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 ${syncGithub.isPending ? "animate-spin" : ""}`}
            />
            {syncGithub.isPending ? "Syncing..." : "Sync GitHub"}
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs text-[hsl(var(--muted-foreground))] hover:text-foreground hover:bg-[hsl(var(--muted))] transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" />
            Logout
          </button>
        </div>
      </div>

      {syncGithub.isSuccess && (
        <div className="mb-4 rounded-md border border-[hsl(var(--gh-green))/30] bg-[hsl(var(--gh-green))/10] px-4 py-2 text-xs text-[hsl(var(--gh-green))]">
          Sync complete — {syncGithub.data.synced} projects updated,{" "}
          {syncGithub.data.newRepos} new repos added (hidden by default).
        </div>
      )}

      {syncGithub.isError && (
        <div className="mb-4 rounded-md border border-destructive/30 bg-destructive/10 px-4 py-2 text-xs text-destructive">
          Sync failed. Check your GITHUB_TOKEN env var.
        </div>
      )}

      {isLoading && (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-16 rounded-md border border-border bg-[hsl(var(--card))] animate-pulse"
            />
          ))}
        </div>
      )}

      {error && (
        <p className="text-sm text-destructive">Failed to load projects.</p>
      )}

      {!isLoading && !error && (
        <div className="space-y-2">
          {sorted.map((project, index) => (
            <div
              key={project.id}
              className="flex items-center gap-3 rounded-md border border-border bg-[hsl(var(--card))] px-4 py-3"
            >
              {/* Reorder */}
              <div className="flex flex-col gap-0.5">
                <button
                  onClick={() => move(project.id, "up")}
                  disabled={index === 0}
                  className="text-[hsl(var(--muted-foreground))] hover:text-foreground disabled:opacity-20 transition-colors"
                >
                  <ChevronUp className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => move(project.id, "down")}
                  disabled={index === sorted.length - 1}
                  className="text-[hsl(var(--muted-foreground))] hover:text-foreground disabled:opacity-20 transition-colors"
                >
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Title & meta */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {project.customTitle ?? project.github.name}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="font-code text-[10px] text-[hsl(var(--muted-foreground))]">
                    {project.fullName}
                  </span>
                  {project.github.lastSynced && (
                    <span className="text-[10px] text-[hsl(var(--muted-foreground))]">
                      · synced {new Date(project.github.lastSynced).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>

              {/* Status badges */}
              <div className="flex items-center gap-2">
                {project.isCollaboration ? (
                  <Users className="h-3.5 w-3.5 text-[hsl(var(--muted-foreground))]" />
                ) : (
                  <User className="h-3.5 w-3.5 text-[hsl(var(--muted-foreground))]" />
                )}
                {project.github.isPrivate ? (
                  <Lock className="h-3.5 w-3.5 text-[hsl(var(--muted-foreground))]" />
                ) : (
                  <Unlock className="h-3.5 w-3.5 text-[hsl(var(--muted-foreground))]" />
                )}
                {project.progress === 100 ? (
                  <CheckCircle className="h-3.5 w-3.5 text-[hsl(var(--gh-green))]" />
                ) : (
                  <Clock className="h-3.5 w-3.5 text-[hsl(var(--muted-foreground))]" />
                )}
              </div>

              {/* Visibility toggle */}
              <button
                onClick={() =>
                  updateProject.mutate({
                    id: project.id,
                    updates: { visible: !project.visible },
                  })
                }
                className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium transition-colors ${
                  project.visible
                    ? "bg-[hsl(var(--gh-green))/15] text-[hsl(var(--gh-green))] hover:bg-[hsl(var(--gh-green))/25]"
                    : "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted-foreground))/20]"
                }`}
              >
                {project.visible ? (
                  <Eye className="h-3 w-3" />
                ) : (
                  <EyeOff className="h-3 w-3" />
                )}
                {project.visible ? "Visible" : "Hidden"}
              </button>

              {/* Edit */}
              <Link
                href={`/admin/projects/${project.id}`}
                className="flex items-center gap-1 rounded-md border border-border px-2.5 py-1 text-xs text-[hsl(var(--muted-foreground))] hover:text-foreground hover:bg-[hsl(var(--muted))] transition-colors"
              >
                <Pencil className="h-3 w-3" />
                Edit
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
