import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const now = new Date();

  const [totalUsers, totalPayments, activeSubscriptions, revenue] = await Promise.all([
    prisma.user.count(),
    prisma.payment.count(),
    prisma.payment.count({ where: { paymentExpirationDate: { gte: now } } }),
    prisma.payment.aggregate({ _sum: { amountPaid: true } }),
  ]);

  return NextResponse.json({
    totalUsers,
    totalPayments,
    activeSubscriptions,
    totalRevenue: revenue._sum.amountPaid ?? 0,
  });
}
