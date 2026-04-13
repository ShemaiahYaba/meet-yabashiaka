"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft, Upload, Plus, X, Save, Eye, EyeOff,
  Github, ExternalLink, Star, Lock, Unlock, Users, User,
  CheckCircle, Clock, ImageIcon, Code2, Link2, Settings2,
} from "lucide-react";
import { useAdminProjects, useUpdateProject, useUploadImage } from "@/hooks/useAdminProjects";
import { resolveImageSrc } from "@/lib/projects";
import type { ProjectData } from "@/lib/projects";
import { IconRenderer } from "@/components/icon-renderer";

export default function EditProjectPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data: projects, isLoading } = useAdminProjects();
  const updateProject = useUpdateProject();
  const uploadImage = useUploadImage();

  const project = projects?.find((p) => p.id === id);
  const [form, setForm] = useState<Partial<ProjectData>>({});
  const [newTech, setNewTech] = useState("");
  const [saved, setSaved] = useState(false);
  const [activeSection, setActiveSection] = useState<"display" | "media" | "links" | "technical">("display");
  const coverInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (project) {
      setForm({
        customTitle: project.customTitle,
        customDescription: project.customDescription,
        customImage: project.customImage,
        customGallery: [...project.customGallery],
        liveUrl: project.liveUrl,
        tech: [...project.tech],
        progress: project.progress,
        isCollaboration: project.isCollaboration,
        visible: project.visible,
      });
    }
  }, [project]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-500">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
          <span className="text-sm">Loading project...</span>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-3">Project not found.</p>
          <Link href="/admin" className="text-sm text-blue-600 hover:underline">← Back to dashboard</Link>
        </div>
      </div>
    );
  }

  // Derived preview values
  const previewTitle = (form.customTitle as string) || project.github.name;
  const previewDescription = (form.customDescription as string) || project.github.description || "No description";
  const previewImage = (form.customImage as string) || null;
  const previewTech = (form.tech as string[]) || [];
  const previewProgress = (form.progress as number) ?? project.progress;
  const previewVisible = (form.visible as boolean) ?? project.visible;
  const previewCollab = (form.isCollaboration as boolean) ?? project.isCollaboration;

  async function handleSave() {
    await updateProject.mutateAsync({ id, updates: form });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  async function handleCoverUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await uploadImage.mutateAsync({ projectId: id, file });
    setForm((prev) => ({ ...prev, customImage: url }));
  }

  async function handleGalleryUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    for (const file of files) {
      const url = await uploadImage.mutateAsync({ projectId: id, file });
      setForm((prev) => ({
        ...prev,
        customGallery: [...((prev.customGallery as string[]) ?? []), url],
      }));
    }
  }

  function addTech() {
    const t = newTech.trim().toLowerCase();
    if (!t) return;
    setForm((prev) => ({ ...prev, tech: [...((prev.tech as string[]) ?? []), t] }));
    setNewTech("");
  }

  function removeTech(t: string) {
    setForm((prev) => ({ ...prev, tech: ((prev.tech as string[]) ?? []).filter((x) => x !== t) }));
  }

  function removeGalleryItem(idx: number) {
    setForm((prev) => ({
      ...prev,
      customGallery: ((prev.customGallery as string[]) ?? []).filter((_, i) => i !== idx),
    }));
  }

  const inputClass = "w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all";
  const labelClass = "block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide";

  const sections = [
    { id: "display", label: "Display", icon: Eye },
    { id: "media", label: "Media", icon: ImageIcon },
    { id: "links", label: "Links", icon: Link2 },
    { id: "technical", label: "Technical", icon: Code2 },
  ] as const;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto max-w-screen-2xl px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700 transition-colors">
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm">Dashboard</span>
              </Link>
              <span className="text-gray-200">/</span>
              <div>
                <span className="text-sm font-semibold text-gray-900">{previewTitle}</span>
                <span className="ml-2 font-mono text-xs text-gray-600">{project.fullName}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                previewVisible ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
              }`}>
                {previewVisible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                {previewVisible ? "Visible" : "Hidden"}
              </span>
              <button
                onClick={handleSave}
                disabled={updateProject.isPending}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-sm"
              >
                <Save className="h-3.5 w-3.5" />
                {updateProject.isPending ? "Saving..." : saved ? "Saved!" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-screen-2xl px-6 py-8">
        <div className="flex gap-8">
          {/* Left — form */}
          <div className="flex-1 min-w-0">
            {/* Section tabs */}
            <div className="flex items-center gap-1 mb-6 border-b border-gray-200">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveSection(s.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
                    activeSection === s.id
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-800"
                  }`}
                >
                  <s.icon className="h-3.5 w-3.5" />
                  {s.label}
                </button>
              ))}
            </div>

            {/* Display section */}
            {activeSection === "display" && (
              <div className="space-y-5">
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h3 className="text-sm font-semibold text-gray-900 mb-5 flex items-center gap-2">
                    <Eye className="h-4 w-4 text-gray-500" /> Portfolio Display
                  </h3>
                  <div className="space-y-5">
                    <div>
                      <label className={labelClass}>Display Title</label>
                      <input
                        className={inputClass}
                        placeholder={project.github.name}
                        value={(form.customTitle as string) ?? ""}
                        onChange={(e) => setForm((p) => ({ ...p, customTitle: e.target.value }))}
                      />
                      <p className="mt-1.5 text-xs text-gray-600">
                        GitHub name: <span className="font-mono">{project.github.name}</span>
                      </p>
                    </div>

                    <div>
                      <label className={labelClass}>Description</label>
                      <textarea
                        className={`${inputClass} min-h-32 resize-y`}
                        placeholder={project.github.description || "Write a description for this project..."}
                        value={(form.customDescription as string) ?? ""}
                        onChange={(e) => setForm((p) => ({ ...p, customDescription: e.target.value }))}
                      />
                      <p className="mt-1.5 text-xs text-gray-600">
                        {((form.customDescription as string) ?? "").length} chars
                      </p>
                    </div>

                    <div className="flex items-center gap-6 pt-1">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div
                          onClick={() => setForm((p) => ({ ...p, visible: !((p.visible as boolean) ?? project.visible) }))}
                          className={`relative h-5 w-9 rounded-full transition-colors cursor-pointer ${
                            (form.visible as boolean) ?? project.visible ? "bg-blue-600" : "bg-gray-200"
                          }`}
                        >
                          <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                            (form.visible as boolean) ?? project.visible ? "translate-x-4" : "translate-x-0.5"
                          }`} />
                        </div>
                        <span className="text-sm text-gray-700">Visible on portfolio</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <div
                          onClick={() => setForm((p) => ({ ...p, isCollaboration: !((p.isCollaboration as boolean) ?? project.isCollaboration) }))}
                          className={`relative h-5 w-9 rounded-full transition-colors cursor-pointer ${
                            (form.isCollaboration as boolean) ?? project.isCollaboration ? "bg-blue-600" : "bg-gray-200"
                          }`}
                        >
                          <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                            (form.isCollaboration as boolean) ?? project.isCollaboration ? "translate-x-4" : "translate-x-0.5"
                          }`} />
                        </div>
                        <span className="text-sm text-gray-700">Collaboration</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* README reference */}
                {project.github.readme && (
                  <details className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                    <summary className="cursor-pointer px-6 py-4 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 select-none">
                      <Github className="h-4 w-4 text-gray-500" />
                      GitHub README
                      <span className="ml-auto text-xs text-gray-600 font-normal">reference only · not shown on portfolio</span>
                    </summary>
                    <pre className="px-6 pb-5 pt-3 text-[11px] text-gray-600 whitespace-pre-wrap leading-relaxed border-t border-gray-100 max-h-72 overflow-y-auto font-mono bg-gray-50">
                      {project.github.readme}
                    </pre>
                  </details>
                )}
              </div>
            )}

            {/* Media section */}
            {activeSection === "media" && (
              <div className="space-y-5">
                {/* Cover image */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h3 className="text-sm font-semibold text-gray-900 mb-5 flex items-center gap-2">
                    <ImageIcon className="h-4 w-4 text-gray-500" /> Cover Image
                  </h3>

                  {/* Preview */}
                  {previewImage && (
                    <div className="relative h-48 w-full overflow-hidden rounded-lg bg-gray-100 mb-4">
                      <Image
                        src={resolveImageSrc(previewImage)}
                        alt="Cover preview"
                        fill
                        className="object-cover"
                        unoptimized={previewImage.includes("blob.vercel-storage.com")}
                      />
                      <button
                        onClick={() => setForm((p) => ({ ...p, customImage: null }))}
                        className="absolute top-2 right-2 rounded-full bg-white/90 p-1 text-gray-600 hover:bg-white shadow-sm transition-colors"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <input
                      className={`${inputClass} flex-1`}
                      placeholder="/images/my-project/cover.png"
                      value={(form.customImage as string) ?? ""}
                      onChange={(e) => setForm((p) => ({ ...p, customImage: e.target.value || null }))}
                    />
                    <button
                      onClick={() => coverInputRef.current?.click()}
                      disabled={uploadImage.isPending}
                      className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-100 transition-colors whitespace-nowrap disabled:opacity-50"
                    >
                      <Upload className="h-3.5 w-3.5" />
                      {uploadImage.isPending ? "Uploading..." : "Upload"}
                    </button>
                    <input ref={coverInputRef} type="file" accept="image/*" className="hidden" onChange={handleCoverUpload} />
                  </div>
                </div>

                {/* Gallery */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                      <ImageIcon className="h-4 w-4 text-gray-500" /> Gallery
                      <span className="ml-1 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500 font-normal">
                        {((form.customGallery as string[]) ?? []).length} images
                      </span>
                    </h3>
                    <button
                      onClick={() => galleryInputRef.current?.click()}
                      disabled={uploadImage.isPending}
                      className="flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
                    >
                      <Upload className="h-3 w-3" />
                      Upload Images
                    </button>
                    <input ref={galleryInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleGalleryUpload} />
                  </div>

                  {/* Gallery grid */}
                  {((form.customGallery as string[]) ?? []).length > 0 ? (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-4">
                      {((form.customGallery as string[]) ?? []).map((url, i) => (
                        <div key={i} className="group relative aspect-video overflow-hidden rounded-lg bg-gray-100">
                          <Image
                            src={resolveImageSrc(url)}
                            alt={`Gallery ${i + 1}`}
                            fill
                            className="object-cover"
                            unoptimized={url.includes("blob.vercel-storage.com")}
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />
                          <button
                            onClick={() => removeGalleryItem(i)}
                            className="absolute top-1 right-1 rounded-full bg-white/0 group-hover:bg-white/90 p-1 text-transparent group-hover:text-gray-700 shadow-sm transition-all"
                          >
                            <X className="h-3 w-3" />
                          </button>
                          <span className="absolute bottom-1 left-1 font-mono text-[9px] text-white/0 group-hover:text-white/80 transition-colors">
                            {i + 1}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-lg border-2 border-dashed border-gray-200 px-6 py-10 text-center mb-4">
                      <p className="text-sm text-gray-600">No gallery images yet</p>
                    </div>
                  )}

                  {/* Add by URL */}
                  <div className="flex gap-2 pt-3 border-t border-gray-100">
                    <input
                      className={`${inputClass} flex-1`}
                      placeholder="Paste image URL..."
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          const val = (e.target as HTMLInputElement).value.trim();
                          if (val) {
                            setForm((p) => ({ ...p, customGallery: [...((p.customGallery as string[]) ?? []), val] }));
                            (e.target as HTMLInputElement).value = "";
                          }
                        }
                      }}
                    />
                    <button
                      onClick={(e) => {
                        const input = (e.currentTarget.previousElementSibling as HTMLInputElement);
                        const val = input.value.trim();
                        if (val) {
                          setForm((p) => ({ ...p, customGallery: [...((p.customGallery as string[]) ?? []), val] }));
                          input.value = "";
                        }
                      }}
                      className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      <Plus className="h-3.5 w-3.5" /> Add URL
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Links section */}
            {activeSection === "links" && (
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-900 mb-5 flex items-center gap-2">
                  <Link2 className="h-4 w-4 text-gray-500" /> External Links
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className={labelClass}>Live URL</label>
                    <div className="relative">
                      <ExternalLink className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
                      <input
                        className={`${inputClass} pl-9`}
                        placeholder="https://your-project.vercel.app"
                        value={(form.liveUrl as string) ?? ""}
                        onChange={(e) => setForm((p) => ({ ...p, liveUrl: e.target.value || null }))}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>GitHub URL</label>
                    <div className="relative">
                      <Github className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
                      <input
                        className={`${inputClass} pl-9 bg-gray-50 cursor-not-allowed`}
                        value={project.github.htmlUrl || "Private / not available"}
                        readOnly
                      />
                    </div>
                    <p className="mt-1.5 text-xs text-gray-600">Synced from GitHub — not editable here</p>
                  </div>
                </div>
              </div>
            )}

            {/* Technical section */}
            {activeSection === "technical" && (
              <div className="space-y-5">
                {/* Tech stack */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h3 className="text-sm font-semibold text-gray-900 mb-5 flex items-center gap-2">
                    <Code2 className="h-4 w-4 text-gray-500" /> Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4 min-h-10">
                    {((form.tech as string[]) ?? []).map((t) => (
                      <div key={t} className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 group">
                        <IconRenderer name={t} className="h-3.5 w-3.5" />
                        <span className="text-xs font-medium text-gray-700">{t}</span>
                        <button onClick={() => removeTech(t)} className="text-gray-400 hover:text-red-500 transition-colors ml-0.5">
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      className={inputClass}
                      placeholder="Add tech icon key (e.g. nextjs, typescript, docker)"
                      value={newTech}
                      onChange={(e) => setNewTech(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addTech()}
                    />
                    <button onClick={addTech}
                      className="flex items-center gap-1.5 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-700 transition-colors whitespace-nowrap">
                      <Plus className="h-3.5 w-3.5" /> Add
                    </button>
                  </div>
                </div>

                {/* Progress */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h3 className="text-sm font-semibold text-gray-900 mb-5 flex items-center gap-2">
                    <Settings2 className="h-4 w-4 text-gray-500" /> Progress & Status
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <label className={`${labelClass} mb-0`}>Completion</label>
                        <span className={`font-mono text-sm font-bold ${
                          previewProgress === 100 ? "text-green-600" : previewProgress > 0 ? "text-blue-600" : "text-gray-500"
                        }`}>
                          {previewProgress}%
                        </span>
                      </div>
                      <input
                        type="range" min={0} max={100} step={5}
                        value={previewProgress}
                        onChange={(e) => setForm((p) => ({ ...p, progress: Number(e.target.value) }))}
                        className="w-full accent-blue-600"
                      />
                      <div className="flex justify-between text-[10px] text-gray-600 mt-1">
                        <span>Not started</span>
                        <span>In Progress</span>
                        <span>Completed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right — preview & github metadata */}
          <div className="w-80 flex-shrink-0 space-y-4">
            {/* Live card preview */}
            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Portfolio Preview</p>
              <div className="rounded-lg border border-gray-200 overflow-hidden bg-[#161b22]">
                {/* Image */}
                <div className="relative h-28 w-full bg-[#21262d]">
                  {previewImage ? (
                    <Image
                      src={resolveImageSrc(previewImage)}
                      alt="preview"
                      fill
                      className="object-cover opacity-90"
                      unoptimized={previewImage.includes("blob.vercel-storage.com")}
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center">
                      <span className="font-mono text-[10px] text-gray-500">no image</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/30" />
                  {previewProgress < 100 && previewProgress > 0 && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                      <div className="h-full bg-blue-400" style={{ width: `${previewProgress}%` }} />
                    </div>
                  )}
                </div>
                {/* Content */}
                <div className="p-3">
                  <p className="text-xs font-semibold text-[#2f81f7] mb-1 truncate">{previewTitle}</p>
                  <p className="text-[10px] text-[#8b949e] line-clamp-2 leading-relaxed mb-2">{previewDescription}</p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {previewTech.slice(0, 3).map((t) => (
                      <div key={t} className="flex items-center gap-0.5 rounded-full border border-[#30363d] bg-[#21262d] px-1.5 py-0.5">
                        <IconRenderer name={t} className="h-2.5 w-2.5" />
                        <span className="font-mono text-[8px] text-[#8b949e]">{t}</span>
                      </div>
                    ))}
                    {previewTech.length > 3 && <span className="text-[9px] text-[#8b949e]">+{previewTech.length - 3}</span>}
                  </div>
                  <div className="flex items-center gap-2 pt-2 border-t border-[#30363d]">
                    {previewCollab ? <Users className="h-3 w-3 text-[#8b949e]" /> : <User className="h-3 w-3 text-[#8b949e]" />}
                    {project.github.isPrivate ? <Lock className="h-3 w-3 text-[#8b949e]" /> : <Unlock className="h-3 w-3 text-[#8b949e]" />}
                    {previewProgress === 100 ? <CheckCircle className="h-3 w-3 text-green-500" /> : <Clock className="h-3 w-3 text-[#8b949e]" />}
                    <span className={`ml-auto text-[9px] font-semibold ${previewVisible ? "text-green-400" : "text-[#8b949e]"}`}>
                      {previewVisible ? "● visible" : "○ hidden"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* GitHub metadata */}
            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">GitHub Metadata</p>
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">Repository</span>
                  <span className="font-mono text-gray-700 truncate max-w-40">{project.github.name || "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Visibility</span>
                  <span className={`font-medium ${project.github.isPrivate ? "text-amber-600" : "text-green-600"}`}>
                    {project.github.isPrivate ? "Private" : "Public"}
                  </span>
                </div>
                {project.github.stars > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Stars</span>
                    <span className="flex items-center gap-1 text-gray-700">
                      <Star className="h-3 w-3 text-amber-400" /> {project.github.stars}
                    </span>
                  </div>
                )}
                {project.github.topics.length > 0 && (
                  <div>
                    <span className="text-gray-500 block mb-1.5">Topics</span>
                    <div className="flex flex-wrap gap-1">
                      {project.github.topics.map((t) => (
                        <span key={t} className="rounded-full bg-blue-50 border border-blue-100 px-2 py-0.5 text-[10px] text-blue-600 font-medium">{t}</span>
                      ))}
                    </div>
                  </div>
                )}
                {project.github.lastSynced && (
                  <div className="flex justify-between pt-2 border-t border-gray-100">
                    <span className="text-gray-500">Last synced</span>
                    <span className="text-gray-500">{new Date(project.github.lastSynced).toLocaleDateString()}</span>
                  </div>
                )}
                {project.github.htmlUrl && (
                  <a href={project.github.htmlUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs text-gray-600 hover:bg-gray-50 transition-colors mt-1">
                    <Github className="h-3.5 w-3.5" />
                    View on GitHub
                    <ExternalLink className="h-3 w-3 ml-auto text-gray-500" />
                  </a>
                )}
              </div>
            </div>

            {/* Save (sticky bottom) */}
            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              {updateProject.isError && (
                <p className="text-xs text-red-600 mb-3">Save failed. Please try again.</p>
              )}
              <button
                onClick={handleSave}
                disabled={updateProject.isPending}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-sm"
              >
                <Save className="h-4 w-4" />
                {updateProject.isPending ? "Saving..." : saved ? "Changes Saved!" : "Save Changes"}
              </button>
              {saved && (
                <p className="text-center text-xs text-green-600 mt-2 flex items-center justify-center gap-1">
                  <CheckCircle className="h-3 w-3" /> All changes saved
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
