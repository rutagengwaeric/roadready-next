import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { signToken } from "@/lib/auth";
import { normalizePhone } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const { phone: rawPhone, password } = await req.json();

    if (!rawPhone || !password) {
      return NextResponse.json({ error: "missing_fields" }, { status: 400 });
    }

    const phone = normalizePhone(rawPhone);

    const user = await prisma.user.findUnique({ where: { phone } });

    if (!user) {
      return NextResponse.json({ error: "user_not_found" }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return NextResponse.json({ error: "wrong_password" }, { status: 401 });
    }

    const token = await signToken({ userId: user.id, phone: user.phone });

    const res = NextResponse.json({ success: true, userId: user.id });
    res.cookies.set("rr_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return res;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
