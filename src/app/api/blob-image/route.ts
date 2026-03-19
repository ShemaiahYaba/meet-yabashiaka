import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const blobUrl = searchParams.get("url");

  if (!blobUrl || !blobUrl.includes("blob.vercel-storage.com")) {
    return new NextResponse(null, { status: 400 });
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return new NextResponse(null, { status: 500 });

  const res = await fetch(blobUrl, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) return new NextResponse(null, { status: res.status });

  const buffer = await res.arrayBuffer();
  return new NextResponse(buffer, {
    headers: {
      "Content-Type": res.headers.get("content-type") ?? "image/jpeg",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
