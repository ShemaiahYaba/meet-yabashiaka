import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { put } from "@vercel/blob";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const ext = file.name.split(".").pop() ?? "png";
  const slug = id.toLowerCase().replace(/_/g, "-");
  const filename = `images/${slug}/${Date.now()}.${ext}`;

  const blob = await put(filename, file, {
    access: "private",
    addRandomSuffix: false,
  });

  return NextResponse.json({ url: blob.url });
}
