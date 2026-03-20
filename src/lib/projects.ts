import { put, list } from "@vercel/blob";
import seedProjects from "../../data/projects.json";
import seedConfig from "../../data/admin-config.json";

export interface GithubData {
  name: string;
  description: string;
  readme: string;
  stars: number;
  topics: string[];
  isPrivate: boolean;
  htmlUrl: string;
  lastSynced: string | null;
}

export interface ProjectData {
  id: string;
  fullName: string;
  visible: boolean;
  sortOrder: number;
  isCollaboration: boolean;
  liveUrl: string | null;
  customTitle: string | null;
  customDescription: string | null;
  customImage: string | null;
  customGallery: string[];
  tech: string[];
  progress: number;
  github: GithubData;
}

export interface AdminConfig {
  statsOverrides: {
    soloProjects: number | null;
    collaborations: number | null;
    githubCommits: number | null;
  };
}

export interface DisplayProject {
  id: string;
  title: string;
  description: string;
  defaultImage: string;
  gallery: string[];
  github: string | null;
  url: string | null;
  tech: string[];
  isCollaboration: boolean;
  private: boolean;
  progress: number;
  isCompleted: boolean;
  dataAiHint: string;
}

const PROJECTS_KEY = "projects.json";
const CONFIG_KEY = "admin-config.json";

// Module-level cache for blob URLs — saves list() round trip on warm instances
const _blobUrlCache = new Map<string, string>();

async function readBlob<T>(key: string, fallback: T): Promise<T> {
  try {
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) return fallback;

    let url = _blobUrlCache.get(key);
    if (!url) {
      const { blobs } = await list({ prefix: key, token });
      const blob = blobs.find((b) => b.pathname === key);
      if (!blob) return fallback;
      url = blob.url;
      _blobUrlCache.set(key, url);
    }

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 0 },
    });
    if (!res.ok) return fallback;
    return res.json() as Promise<T>;
  } catch {
    return fallback;
  }
}

async function writeBlob<T>(key: string, data: T): Promise<void> {
  await put(key, JSON.stringify(data, null, 2), {
    access: "private",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

export async function getProjects(): Promise<ProjectData[]> {
  return readBlob<ProjectData[]>(PROJECTS_KEY, seedProjects as ProjectData[]);
}

export async function getAdminConfig(): Promise<AdminConfig> {
  return readBlob<AdminConfig>(CONFIG_KEY, seedConfig as AdminConfig);
}

export async function saveProjects(projects: ProjectData[]): Promise<void> {
  await writeBlob(PROJECTS_KEY, projects);
}

export async function saveAdminConfig(config: AdminConfig): Promise<void> {
  await writeBlob(CONFIG_KEY, config);
}

export function toDisplayProject(p: ProjectData): DisplayProject {
  return {
    id: p.id,
    title: p.customTitle ?? p.github.name,
    description: p.customDescription ?? p.github.description,
    defaultImage: p.customImage ?? "",
    gallery:
      p.customGallery.length > 0
        ? p.customGallery
        : p.customImage
          ? [p.customImage]
          : [],
    github: p.github.htmlUrl || null,
    url: p.liveUrl,
    tech: p.tech,
    isCollaboration: p.isCollaboration,
    private: p.github.isPrivate,
    progress: p.progress,
    isCompleted: p.progress === 100,
    dataAiHint: p.id.toLowerCase().replace(/_/g, "-"),
  };
}

export function getVisibleProjects(projects: ProjectData[]): DisplayProject[] {
  return projects
    .filter((p) => p.visible)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map(toDisplayProject);
}

// Returns true if the URL is a private Vercel Blob URL that needs proxying
export function isBlobUrl(url: string): boolean {
  return url.includes("blob.vercel-storage.com");
}

// Returns the correct src for displaying an image (proxied if blob, direct if public path)
export function resolveImageSrc(url: string): string {
  if (!url) return "";
  if (isBlobUrl(url)) return `/api/blob-image?url=${encodeURIComponent(url)}`;
  return url;
}
