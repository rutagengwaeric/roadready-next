import { NextResponse } from "next/server";
import { getUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function PUT(req: Request) {
  const session = await getUser();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { currentPassword, newPassword } = await req.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: "Ntabwo wujuje ibisabwa byose." }, { status: 400 });
    }

    if (newPassword.length < 5) {
      return NextResponse.json({ error: "Ijambo ry'ibanga rigomba kugira byibuze imibare/inyuguti 5" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { id: session.id } });
    if (!user) return NextResponse.json({ error: "Konti ntiboneka" }, { status: 404 });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Ijambo ry'ibanga rikoreshwa sicyo." }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword }
    });

    return NextResponse.json({ success: true, message: "Password updated successfully" });
  } catch (err: any) {
    console.error("Password change error:", err);
    return NextResponse.json({ error: "Nkibazo cyabaye guhindura, ongera ugerageze" }, { status: 500 });
  }
}
