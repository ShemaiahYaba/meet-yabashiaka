import { put, head } from "@vercel/blob";
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

// Resolved shape consumed by the portfolio UI
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

async function blobExists(key: string): Promise<boolean> {
  try {
    await head(
      `https://${process.env.BLOB_STORE_ID}.public.blob.vercel-storage.com/${key}`
    );
    return true;
  } catch {
    return false;
  }
}

async function readBlob<T>(key: string, fallback: T): Promise<T> {
  try {
    const url = `https://${process.env.BLOB_STORE_ID}.public.blob.vercel-storage.com/${key}`;
    const res = await fetch(url, { next: { revalidate: 0 } });
    if (!res.ok) return fallback;
    return res.json() as Promise<T>;
  } catch {
    return fallback;
  }
}

async function writeBlob<T>(key: string, data: T): Promise<void> {
  await put(key, JSON.stringify(data, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
  });
}

export async function getProjects(): Promise<ProjectData[]> {
  return readBlob<ProjectData[]>(PROJECTS_KEY, seedProjects as ProjectData[]);
}

export async function saveProjects(projects: ProjectData[]): Promise<void> {
  await writeBlob(PROJECTS_KEY, projects);
}

export async function getAdminConfig(): Promise<AdminConfig> {
  return readBlob<AdminConfig>(CONFIG_KEY, seedConfig as AdminConfig);
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
