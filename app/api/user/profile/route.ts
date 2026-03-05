import { NextResponse } from "next/server";
import { getUser, hasActivePayment } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const activeSub = await hasActivePayment(user.id);
  
  // Find latest active payment to get expiry
  const latestPayment = await prisma.payment.findFirst({
    where: { userId: user.id },
    orderBy: { paymentExpirationDate: "desc" },
  });

  const totalTests = await prisma.testResult.count({ where: { userId: user.id } });
  const totalKeywords = await prisma.keywordResult.count({ where: { userId: user.id } });

  return NextResponse.json({
    id: user.id,
    username: user.username,
    email: user.email,
    phone: user.phone,
    hasActiveSubscription: activeSub,
    subscriptionEnd: latestPayment?.paymentExpirationDate || null,
    totalTests,
    totalKeywords
  });
}

export async function PUT(req: Request) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { username, email } = await req.json();

    const existingEmail = await prisma.user.findFirst({
      where: { email, id: { not: user.id } }
    });

    if (existingEmail) {
      return NextResponse.json({ error: "Iyi email isanzwe ikoreshwa n'undi muntu." }, { status: 400 });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { username, email }
    });

    return NextResponse.json({ success: true, message: "Profile updated" });
  } catch (err: any) {
    console.error("Profile update error:", err);
    return NextResponse.json({ error: "Nkibazo cyabaye mu guhindura amakuru" }, { status: 500 });
  }
}
