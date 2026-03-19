"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Upload, Plus, X } from "lucide-react";
import { useAdminProjects, useUpdateProject, useUploadImage } from "@/hooks/useAdminProjects";
import type { ProjectData } from "@/lib/projects";

export default function EditProjectPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data: projects, isLoading } = useAdminProjects();
  const updateProject = useUpdateProject();
  const uploadImage = useUploadImage();

  const project = projects?.find((p) => p.id === id);

  const [form, setForm] = useState<Partial<ProjectData>>({});
  const [newGalleryUrl, setNewGalleryUrl] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (project) {
      setForm({
        customTitle: project.customTitle,
        customDescription: project.customDescription,
        customImage: project.customImage,
        customGallery: project.customGallery,
        liveUrl: project.liveUrl,
        tech: project.tech,
        progress: project.progress,
        isCollaboration: project.isCollaboration,
        visible: project.visible,
      });
    }
  }, [project]);

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-2xl px-4 py-8">
        <div className="h-8 w-48 rounded-md bg-[hsl(var(--muted))] animate-pulse mb-6" />
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-12 rounded-md bg-[hsl(var(--card))] animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container mx-auto max-w-2xl px-4 py-8">
        <p className="text-sm text-destructive">Project not found.</p>
        <Link href="/admin" className="text-xs text-primary mt-2 inline-block">
          ← Back to dashboard
        </Link>
      </div>
    );
  }

  function field(key: keyof typeof form) {
    return {
      value: (form[key] as string) ?? "",
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setForm((prev) => ({ ...prev, [key]: e.target.value })),
    };
  }

  async function handleSave() {
    await updateProject.mutateAsync({ id, updates: form });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await uploadImage.mutateAsync({ projectId: id, file });
    setForm((prev) => ({ ...prev, customImage: url }));
  }

  async function handleGalleryUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await uploadImage.mutateAsync({ projectId: id, file });
    setForm((prev) => ({
      ...prev,
      customGallery: [...(prev.customGallery ?? []), url],
    }));
  }

  function addGalleryUrl() {
    if (!newGalleryUrl.trim()) return;
    setForm((prev) => ({
      ...prev,
      customGallery: [...(prev.customGallery ?? []), newGalleryUrl.trim()],
    }));
    setNewGalleryUrl("");
  }

  function removeGalleryItem(index: number) {
    setForm((prev) => ({
      ...prev,
      customGallery: (prev.customGallery ?? []).filter((_, i) => i !== index),
    }));
  }

  const inputClass =
    "w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:ring-1 focus:ring-primary";
  const labelClass = "block text-xs font-medium text-[hsl(var(--muted-foreground))] mb-1.5";

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Link
          href="/admin"
          className="text-[hsl(var(--muted-foreground))] hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-lg font-semibold text-foreground">
            {project.customTitle ?? project.github.name}
          </h1>
          <p className="font-code text-xs text-[hsl(var(--muted-foreground))]">
            {project.fullName}
          </p>
        </div>
      </div>

      {/* GitHub README (reference only) */}
      {project.github.readme && (
        <details className="mb-6 rounded-md border border-border">
          <summary className="cursor-pointer px-4 py-2.5 text-xs font-medium text-[hsl(var(--muted-foreground))] hover:text-foreground select-none">
            GitHub README (reference)
          </summary>
          <pre className="px-4 py-3 text-[11px] text-[hsl(var(--muted-foreground))] whitespace-pre-wrap leading-relaxed border-t border-border max-h-64 overflow-y-auto font-code">
            {project.github.readme}
          </pre>
        </details>
      )}

      <div className="space-y-5 rounded-md border border-border bg-[hsl(var(--card))] p-6">
        {/* Title */}
        <div>
          <label className={labelClass}>Display Title</label>
          <input
            className={inputClass}
            placeholder={project.github.name}
            {...field("customTitle")}
          />
        </div>

        {/* Description */}
        <div>
          <label className={labelClass}>Description</label>
          <textarea
            className={`${inputClass} min-h-24 resize-y`}
            placeholder={project.github.description || "No GitHub description"}
            value={(form.customDescription as string) ?? ""}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, customDescription: e.target.value }))
            }
          />
        </div>

        {/* Cover image */}
        <div>
          <label className={labelClass}>Cover Image</label>
          {form.customImage && (
            <p className="font-code text-[10px] text-[hsl(var(--muted-foreground))] mb-2 truncate">
              {form.customImage}
            </p>
          )}
          <div className="flex gap-2">
            <input
              className={`${inputClass} flex-1`}
              placeholder="/images/my-project/cover.png or blob URL"
              value={(form.customImage as string) ?? ""}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, customImage: e.target.value }))
              }
            />
            <label className="flex items-center gap-1.5 cursor-pointer rounded-md border border-border px-3 py-2 text-xs text-[hsl(var(--muted-foreground))] hover:text-foreground hover:bg-[hsl(var(--muted))] transition-colors whitespace-nowrap">
              <Upload className="h-3.5 w-3.5" />
              Upload
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>
        </div>

        {/* Gallery */}
        <div>
          <label className={labelClass}>Gallery</label>
          <div className="space-y-1.5 mb-2">
            {(form.customGallery ?? []).map((url, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="font-code text-[10px] text-[hsl(var(--muted-foreground))] flex-1 truncate">
                  {url}
                </span>
                <button
                  onClick={() => removeGalleryItem(i)}
                  className="text-[hsl(var(--muted-foreground))] hover:text-destructive transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              className={`${inputClass} flex-1`}
              placeholder="Paste image URL and press Add"
              value={newGalleryUrl}
              onChange={(e) => setNewGalleryUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addGalleryUrl()}
            />
            <button
              onClick={addGalleryUrl}
              className="flex items-center gap-1 rounded-md border border-border px-3 py-2 text-xs text-[hsl(var(--muted-foreground))] hover:text-foreground hover:bg-[hsl(var(--muted))] transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              Add
            </button>
            <label className="flex items-center gap-1.5 cursor-pointer rounded-md border border-border px-3 py-2 text-xs text-[hsl(var(--muted-foreground))] hover:text-foreground hover:bg-[hsl(var(--muted))] transition-colors whitespace-nowrap">
              <Upload className="h-3.5 w-3.5" />
              Upload
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleGalleryUpload}
              />
            </label>
          </div>
        </div>

        {/* Live URL */}
        <div>
          <label className={labelClass}>Live URL</label>
          <input
            className={inputClass}
            placeholder="https://"
            {...field("liveUrl")}
          />
        </div>

        {/* Tech stack */}
        <div>
          <label className={labelClass}>Tech (comma-separated icon keys)</label>
          <input
            className={inputClass}
            placeholder="nextjs, typescript, supabase"
            value={(form.tech as string[])?.join(", ") ?? ""}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                tech: e.target.value.split(",").map((t) => t.trim()).filter(Boolean),
              }))
            }
          />
        </div>

        {/* Progress */}
        <div>
          <label className={labelClass}>
            Progress — {form.progress ?? project.progress}%
          </label>
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={(form.progress as number) ?? project.progress}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, progress: Number(e.target.value) }))
            }
            className="w-full accent-primary"
          />
        </div>

        {/* Toggles */}
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={(form.isCollaboration as boolean) ?? project.isCollaboration}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, isCollaboration: e.target.checked }))
              }
              className="accent-primary"
            />
            <span className="text-sm text-foreground">Collaboration</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={(form.visible as boolean) ?? project.visible}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, visible: e.target.checked }))
              }
              className="accent-primary"
            />
            <span className="text-sm text-foreground">Visible on portfolio</span>
          </label>
        </div>

        {/* Save */}
        <div className="flex items-center gap-3 pt-2 border-t border-border">
          <button
            onClick={handleSave}
            disabled={updateProject.isPending}
            className="rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {updateProject.isPending ? "Saving..." : "Save Changes"}
          </button>
          {saved && (
            <span className="text-xs text-[hsl(var(--gh-green))]">Saved!</span>
          )}
          {updateProject.isError && (
            <span className="text-xs text-destructive">Save failed.</span>
          )}
        </div>
      </div>
    </div>
  );
}
