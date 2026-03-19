import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getProjects, saveProjects } from "@/lib/projects";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const updates = await request.json();
  const projects = await getProjects();
  const index = projects.findIndex((p) => p.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  projects[index] = { ...projects[index], ...updates };
  await saveProjects(projects);

  return NextResponse.json(projects[index]);
}
