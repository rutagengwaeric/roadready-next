import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
    try {
        const { token, password } = await req.json();

        if (!token || !password) {
            return NextResponse.json({ error: "Token and password are required" }, { status: 400 });
        }

        if (password.length < 5) {
            return NextResponse.json({ error: "Ijambo ry'ibanga rigomba kugira byibuze imibare/inyuguti 5" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({ where: { resetToken: token } });

        if (!user) {
            return NextResponse.json({ error: "Iyi kode ntiyemewe cyangwa yarakoreshejwe." }, { status: 400 });
        }

        if (!user.resetTokenExpiry || user.resetTokenExpiry < new Date()) {
            return NextResponse.json({ error: "Iyi kode yatakaje agaciro. Ongera usabe indi." }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                resetToken: null,
                resetTokenExpiry: null,
            },
        });

        return NextResponse.json({ success: true, message: "Password reset successful" });
    } catch (error) {
        console.error("Reset password error:", error);
        return NextResponse.json({ error: "Nkibazo cyabaye mukohereza, ongera ugerageze" }, { status: 500 });
    }
}
