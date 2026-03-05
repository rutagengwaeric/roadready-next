import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Admin routes
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = req.cookies.get("rr_admin_token")?.value;
    if (!token) return NextResponse.redirect(new URL("/admin/login", req.url));
    const payload = await verifyToken(token);
    if (!payload?.isAdmin) return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  // Protected app routes
  if (pathname.startsWith("/app") || pathname.startsWith("/test") || pathname.startsWith("/levels") || pathname.startsWith("/payment")) {
    const token = req.cookies.get("rr_token")?.value;
    if (!token) return NextResponse.redirect(new URL("/login", req.url));
    const payload = await verifyToken(token);
    if (!payload) return NextResponse.redirect(new URL("/login", req.url));
  }

  // Redirect logged-in users away from auth pages
  if (pathname === "/login" || pathname === "/register") {
    const token = req.cookies.get("rr_token")?.value;
    if (token) {
      const payload = await verifyToken(token);
      if (payload) return NextResponse.redirect(new URL("/app", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*", "/test/:path*", "/levels/:path*", "/payment/:path*", "/admin/:path*", "/login", "/register"],
};
