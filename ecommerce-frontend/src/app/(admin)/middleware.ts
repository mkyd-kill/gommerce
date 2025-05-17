import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isAdminRoute = pathname.startsWith("/admin");

  if (!isAdminRoute) return NextResponse.next();

  const token = req.cookies.get("accessToken")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // token decode and validation
  const payload = decodeJWT(token);

  if (!payload?.role || payload.role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

function decodeJWT(token: string) {
  try {
    const base64 = token.split(".")[1];
    const decoded = JSON.parse(atob(base64));
    return decoded;
  } catch {
    return null;
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
