import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { signToken } from "@/lib/auth";
import { normalizePhone } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const { username, email, phone: rawPhone, password } = await req.json();

    if (!username || !email || !rawPhone || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const phone = normalizePhone(rawPhone);

    const existing = await prisma.user.findFirst({
      where: { OR: [{ email }, { phone }] },
    });

    if (existing) {
      return NextResponse.json(
        { error: existing.email === email ? "email_taken" : "phone_taken" },
        { status: 409 }
      );
    }

    const hashed = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: { username, email, phone, password: hashed },
    });

    const token = await signToken({ userId: user.id, phone: user.phone });

    const res = NextResponse.json({ success: true });
    res.cookies.set("rr_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return res;
  } catch (err) {
    console.error("Register error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
