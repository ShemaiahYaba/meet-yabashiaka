import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getProjects, saveProjects } from "@/lib/projects";

// Body: { orderedIds: string[] }  — full ordered list of project ids
export async function PUT(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { orderedIds } = await request.json() as { orderedIds: string[] };
  const projects = await getProjects();

  for (const project of projects) {
    const index = orderedIds.indexOf(project.id);
    if (index !== -1) project.sortOrder = index;
  }

  await saveProjects(projects);
  return NextResponse.json({ ok: true });
}
