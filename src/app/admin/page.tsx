"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Eye, EyeOff, RefreshCw, ChevronUp, ChevronDown, Pencil, LogOut,
  CheckCircle, Clock, Lock, Unlock, Users, User, Github, ExternalLink,
  LayoutGrid, List, Star, GitFork,
} from "lucide-react";
import {
  useAdminProjects, useUpdateProject, useReorderProjects, useSyncGithub,
} from "@/hooks/useAdminProjects";
import { resolveImageSrc } from "@/lib/projects";
import { IconRenderer } from "@/components/icon-renderer";

type Filter = "all" | "visible" | "hidden";
type ViewMode = "grid" | "list";

export default function AdminDashboard() {
  const router = useRouter();
  const { data: projects, isLoading, error } = useAdminProjects();
  const updateProject = useUpdateProject();
  const reorderProjects = useReorderProjects();
  const syncGithub = useSyncGithub();

  const [filter, setFilter] = useState<Filter>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

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

  const filtered = sorted.filter((p) => {
    if (filter === "visible") return p.visible;
    if (filter === "hidden") return !p.visible;
    return true;
  });

  const totalCount = sorted.length;
  const visibleCount = sorted.filter((p) => p.visible).length;
  const hiddenCount = totalCount - visibleCount;
  const syncedCount = sorted.filter((p) => p.github.lastSynced).length;
  const completedCount = sorted.filter((p) => p.progress === 100).length;
  const inProgressCount = sorted.filter((p) => p.progress > 0 && p.progress < 100).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Topbar */}
      <div className="sticky top-0 z-10 border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto w-full max-w-screen-2xl px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span className="font-mono text-sm font-semibold text-gray-800">
              portfolio admin
            </span>
            <span className="text-gray-400">·</span>
            <span className="font-mono text-xs text-gray-600">~/projects</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => syncGithub.mutate()}
              disabled={syncGithub.isPending}
              className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-xs font-semibold text-white hover:bg-green-700 disabled:opacity-50 transition-colors shadow-sm"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${syncGithub.isPending ? "animate-spin" : ""}`} />
              {syncGithub.isPending ? "Syncing..." : "Sync GitHub"}
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-screen-2xl px-6 py-8">
        {/* Sync feedback */}
        {syncGithub.isSuccess && (
          <div className="mb-6 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            <CheckCircle className="h-4 w-4 flex-shrink-0" />
            Sync complete — {syncGithub.data.synced} projects updated
            {syncGithub.data.newRepos > 0 && `, ${syncGithub.data.newRepos} new repos discovered (hidden by default)`}.
          </div>
        )}
        {syncGithub.isError && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            Sync failed. Check your GITHUB_TOKEN environment variable.
          </div>
        )}

        {/* Stats row */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-8">
          {[
            { label: "Total", value: totalCount, color: "text-gray-900", bg: "bg-white" },
            { label: "Visible", value: visibleCount, color: "text-green-600", bg: "bg-green-50 border-green-100" },
            { label: "Hidden", value: hiddenCount, color: "text-gray-500", bg: "bg-white" },
            { label: "Synced", value: syncedCount, color: "text-blue-600", bg: "bg-blue-50 border-blue-100" },
            { label: "Completed", value: completedCount, color: "text-gray-700", bg: "bg-white" },
            { label: "In Progress", value: inProgressCount, color: "text-amber-600", bg: "bg-amber-50 border-amber-100" },
          ].map((stat) => (
            <div key={stat.label} className={`rounded-xl border border-gray-200 ${stat.bg} px-4 py-3`}>
              <p className="text-[11px] text-gray-700 font-medium uppercase tracking-wide mb-1">{stat.label}</p>
              <p className={`font-mono text-2xl font-bold ${stat.color}`}>
                {isLoading ? "—" : stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white p-1 shadow-sm">
            {(["all", "visible", "hidden"] as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium rounded-md transition-colors capitalize ${
                  filter === f
                    ? "bg-gray-900 text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                {f}
                {!isLoading && (
                  <span className={`font-mono text-[10px] ${filter === f ? "text-gray-400" : "text-gray-600"}`}>
                    {f === "all" ? totalCount : f === "visible" ? visibleCount : hiddenCount}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600">
              {isLoading ? "" : `${filtered.length} project${filtered.length !== 1 ? "s" : ""}`}
            </span>
            <div className="flex items-center gap-0.5 rounded-lg border border-gray-200 bg-white p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded transition-colors ${viewMode === "grid" ? "bg-gray-900 text-white" : "text-gray-500 hover:text-gray-700"}`}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded transition-colors ${viewMode === "list" ? "bg-gray-900 text-white" : "text-gray-500 hover:text-gray-700"}`}
              >
                <List className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Skeletons */}
        {isLoading && (
          <div className={viewMode === "grid"
            ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
            : "space-y-2"}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className={`animate-pulse rounded-xl border border-gray-200 bg-white ${viewMode === "grid" ? "h-72" : "h-16"}`} />
            ))}
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-4 text-sm text-red-600">
            Failed to load projects.
          </div>
        )}

        {/* Grid view */}
        {!isLoading && !error && viewMode === "grid" && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filtered.map((project) => {
              const globalIndex = sorted.findIndex((p) => p.id === project.id);
              return (
                <div
                  key={project.id}
                  className={`group relative flex flex-col overflow-hidden rounded-xl border bg-white transition-all hover:shadow-md ${
                    project.visible ? "border-gray-200" : "border-gray-100 opacity-60 hover:opacity-90"
                  }`}
                >
                  {/* Cover */}
                  <div className="relative h-36 w-full overflow-hidden bg-gray-100">
                    {project.customImage ? (
                      <Image
                        src={resolveImageSrc(project.customImage)}
                        alt={project.customTitle ?? project.github.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        unoptimized={project.customImage.includes("blob.vercel-storage.com")}
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                        <span className="text-xs font-mono text-gray-600">no image</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                    {/* Visibility toggle */}
                    <button
                      onClick={() => updateProject.mutate({ id: project.id, updates: { visible: !project.visible } })}
                      className={`absolute top-2 right-2 flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold backdrop-blur-sm transition-colors ${
                        project.visible
                          ? "bg-green-500/90 text-white"
                          : "bg-black/50 text-gray-300 hover:bg-black/70"
                      }`}
                    >
                      {project.visible ? <Eye className="h-2.5 w-2.5" /> : <EyeOff className="h-2.5 w-2.5" />}
                      {project.visible ? "Visible" : "Hidden"}
                    </button>

                    {/* Reorder */}
                    <div className="absolute top-2 left-2 flex flex-col gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => move(project.id, "up")} disabled={globalIndex === 0}
                        className="rounded bg-black/50 p-0.5 text-white backdrop-blur-sm disabled:opacity-20 hover:bg-black/70 transition-colors">
                        <ChevronUp className="h-3 w-3" />
                      </button>
                      <button onClick={() => move(project.id, "down")} disabled={globalIndex === sorted.length - 1}
                        className="rounded bg-black/50 p-0.5 text-white backdrop-blur-sm disabled:opacity-20 hover:bg-black/70 transition-colors">
                        <ChevronDown className="h-3 w-3" />
                      </button>
                    </div>

                    {/* Progress bar */}
                    {project.progress > 0 && project.progress < 100 && (
                      <div className="absolute bottom-0 left-0 right-0">
                        <div className="h-1 bg-black/20">
                          <div className="h-full bg-blue-500" style={{ width: `${project.progress}%` }} />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="flex flex-col flex-1 p-3.5">
                    <div className="flex items-start justify-between gap-1 mb-1">
                      <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-1">
                        {project.customTitle ?? project.github.name}
                      </h3>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        {project.progress === 100
                          ? <CheckCircle className="h-3 w-3 text-green-500" />
                          : <Clock className="h-3 w-3 text-amber-400" />}
                      </div>
                    </div>

                    <p className="font-mono text-[9px] text-gray-600 mb-2 truncate">
                      {project.fullName}
                    </p>

                    <p className="text-[11px] text-gray-700 line-clamp-2 leading-relaxed mb-3 flex-1">
                      {(project.customDescription ?? project.github.description) || "No description yet"}
                    </p>

                    {/* Tech tags */}
                    {project.tech.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {project.tech.slice(0, 4).map((t) => (
                          <div key={t} className="flex items-center gap-0.5 rounded-full border border-gray-200 bg-gray-50 px-1.5 py-0.5">
                            <IconRenderer name={t} className="h-2.5 w-2.5" />
                            <span className="font-mono text-[9px] text-gray-500">{t}</span>
                          </div>
                        ))}
                        {project.tech.length > 4 && (
                          <span className="text-[9px] text-gray-500">+{project.tech.length - 4}</span>
                        )}
                      </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-2.5 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        {project.isCollaboration
                          ? <Users className="h-3 w-3 text-gray-500" />
                          : <User className="h-3 w-3 text-gray-500" />}
                        {project.github.isPrivate
                          ? <Lock className="h-3 w-3 text-gray-500" />
                          : <Unlock className="h-3 w-3 text-gray-500" />}
                        {project.github.stars > 0 && (
                          <span className="flex items-center gap-0.5 text-[10px] text-gray-600">
                            <Star className="h-2.5 w-2.5" />
                            {project.github.stars}
                          </span>
                        )}
                        {project.github.htmlUrl && (
                          <a href={project.github.htmlUrl} target="_blank" rel="noopener noreferrer"
                            className="text-gray-500 hover:text-gray-700 transition-colors">
                            <Github className="h-3 w-3" />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                            className="text-gray-500 hover:text-gray-700 transition-colors">
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                      <Link
                        href={`/admin/projects/${project.id}`}
                        className="flex items-center gap-1 rounded-md bg-gray-100 px-2 py-1 text-[10px] font-medium text-gray-600 hover:bg-gray-200 transition-colors"
                      >
                        <Pencil className="h-2.5 w-2.5" />
                        Edit
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* List view */}
        {!isLoading && !error && viewMode === "list" && (
          <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm">
            {filtered.map((project, idx) => {
              const globalIndex = sorted.findIndex((p) => p.id === project.id);
              return (
                <div
                  key={project.id}
                  className={`flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-gray-50 ${
                    idx !== filtered.length - 1 ? "border-b border-gray-100" : ""
                  } ${!project.visible ? "opacity-60" : ""}`}
                >
                  {/* Thumbnail */}
                  <div className="relative h-10 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                    {project.customImage ? (
                      <Image
                        src={resolveImageSrc(project.customImage)}
                        alt={project.customTitle ?? project.github.name}
                        fill className="object-cover"
                        unoptimized={project.customImage.includes("blob.vercel-storage.com")}
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center">
                        <span className="font-mono text-[8px] text-gray-400">—</span>
                      </div>
                    )}
                  </div>

                  {/* Reorder */}
                  <div className="flex flex-col gap-0.5">
                    <button onClick={() => move(project.id, "up")} disabled={globalIndex === 0}
                      className="text-gray-400 hover:text-gray-600 disabled:opacity-20 transition-colors">
                      <ChevronUp className="h-3.5 w-3.5" />
                    </button>
                    <button onClick={() => move(project.id, "down")} disabled={globalIndex === sorted.length - 1}
                      className="text-gray-400 hover:text-gray-600 disabled:opacity-20 transition-colors">
                      <ChevronDown className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Title */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {project.customTitle ?? project.github.name}
                    </p>
                    <p className="font-mono text-[10px] text-gray-600 truncate">{project.fullName}</p>
                  </div>

                  {/* Tech (abbreviated) */}
                  <div className="hidden md:flex items-center gap-1">
                    {project.tech.slice(0, 4).map((t) => (
                      <IconRenderer key={t} name={t} className="h-3.5 w-3.5" />
                    ))}
                    {project.tech.length > 4 && <span className="text-[10px] text-gray-600">+{project.tech.length - 4}</span>}
                  </div>

                  {/* Progress */}
                  <div className="hidden lg:flex items-center gap-2 w-24">
                    <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${project.progress}%` }} />
                    </div>
                    <span className="font-mono text-[10px] text-gray-600 w-8 text-right">{project.progress}%</span>
                  </div>

                  {/* Status icons */}
                  <div className="flex items-center gap-2">
                    {project.isCollaboration ? <Users className="h-3.5 w-3.5 text-gray-500" /> : <User className="h-3.5 w-3.5 text-gray-500" />}
                    {project.github.isPrivate ? <Lock className="h-3.5 w-3.5 text-gray-500" /> : <Unlock className="h-3.5 w-3.5 text-gray-500" />}
                    {project.progress === 100
                      ? <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                      : <Clock className="h-3.5 w-3.5 text-amber-400" />}
                  </div>

                  {/* Visibility */}
                  <button
                    onClick={() => updateProject.mutate({ id: project.id, updates: { visible: !project.visible } })}
                    className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold transition-colors ${
                      project.visible
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                    }`}
                  >
                    {project.visible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                    {project.visible ? "Visible" : "Hidden"}
                  </button>

                  <Link
                    href={`/admin/projects/${project.id}`}
                    className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    <Pencil className="h-3 w-3" />
                    Edit
                  </Link>
                </div>
              );
            })}
          </div>
        )}

        {!isLoading && !error && filtered.length === 0 && (
          <div className="rounded-xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
            <p className="text-sm text-gray-600">
              No {filter !== "all" ? filter : ""} projects.
              {filter !== "all" && (
                <button onClick={() => setFilter("all")} className="ml-2 text-blue-600 hover:underline">
                  Show all
                </button>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
