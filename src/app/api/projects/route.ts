import { NextResponse } from "next/server";
import { getProjects, getVisibleProjects } from "@/lib/projects";

export async function GET() {
  const projects = await getProjects();
  const visible = getVisibleProjects(projects);
  return NextResponse.json(visible);
}
