import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import crypto from "crypto";
import { sendPasswordResetEmail } from "@/lib/email";

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            // Return a success response anyway to prevent email enumeration attacks
            return NextResponse.json({ success: true, message: "If the email exists, a reset link was sent." });
        }

        // Generate secure random token
        const resetToken = crypto.randomBytes(32).toString("hex");
        const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

        // Save token to DB
        await prisma.user.update({
            where: { id: user.id },
            data: {
                resetToken,
                resetTokenExpiry,
            },
        });

        // Send email via Resend
        // Format full URL to point back to the app
        const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
        const resetUrl = `${origin}/reset-password?token=${resetToken}`;

        // Attempt sending email
        await sendPasswordResetEmail(user.email, resetUrl);

        // Dev/Test helper since the email might fail if Resend isn't configured
        console.log(`Password reset link for ${user.email}: ${resetUrl}`);

        return NextResponse.json({ success: true, message: "Reset link sent" });
    } catch (error) {
        console.error("Forgot password error:", error);
        return NextResponse.json({ error: "Nkibazo cyabaye mukohereza, ongera ugerageze" }, { status: 500 });
    }
}
