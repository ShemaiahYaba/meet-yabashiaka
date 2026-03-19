import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SESSION_COOKIE = "admin_session";
const PROTECTED_PREFIXES = ["/admin"];
const PUBLIC_ADMIN_PATHS = ["/admin/login"];

function getSecret(): Uint8Array {
  const key = process.env.ADMIN_SECRET_KEY ?? "";
  return new TextEncoder().encode(key);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  if (!isProtected) return NextResponse.next();

  const isPublicAdminPath = PUBLIC_ADMIN_PATHS.some((p) => pathname === p);
  if (isPublicAdminPath) return NextResponse.next();

  const token = request.cookies.get(SESSION_COOKIE)?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  try {
    await jwtVerify(token, getSecret());
    return NextResponse.next();
  } catch {
    const response = NextResponse.redirect(
      new URL("/admin/login", request.url)
    );
    response.cookies.delete(SESSION_COOKIE);
    return response;
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
