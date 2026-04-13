import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getProjects } from "@/lib/projects";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const projects = await getProjects();
  return NextResponse.json(projects);
}
