import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.redirect(
    new URL("/login", process.env.NEXTAUTH_URL || "http://localhost:3001"),
    303
  );
  res.cookies.set("rr_token", "", { maxAge: 0, path: "/" });
  return res;
}
