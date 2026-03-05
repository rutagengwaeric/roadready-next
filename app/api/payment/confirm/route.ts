import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/lib/auth";
import { getExpirationDate } from "@/lib/paypack";
import prisma from "@/lib/prisma";

const VALID_AMOUNTS = [900, 2000, 3000, 5000];

export async function POST(req: NextRequest) {
  try {
    const user = await getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { amount, paymentRef } = await req.json();

    if (!VALID_AMOUNTS.includes(Number(amount)) || !paymentRef) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    // Prevent duplicate inserts
    const existing = await prisma.payment.findUnique({ where: { paymentRef } });
    if (existing) return NextResponse.json({ success: true });

    const expirationDate = getExpirationDate(Number(amount));

    await prisma.payment.create({
      data: {
        userId: user.id,
        amountPaid: Number(amount),
        paymentExpirationDate: expirationDate,
        paymentRef,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Payment confirm error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
