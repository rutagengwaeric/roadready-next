import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.redirect(new URL("/admin/login", process.env.NEXTAUTH_URL || "http://localhost:3001"));
  res.cookies.set("rr_admin_token", "", { maxAge: 0, path: "/" });
  return res;
}
