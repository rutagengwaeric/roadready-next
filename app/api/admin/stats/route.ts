import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const [
    totalUsers,
    totalPayments,
    activeSubscriptions,
    revenue,
    totalTestResults,
    totalKeywordResults,
    recentUsers,
    recentPayments,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.payment.count(),
    prisma.payment.count({ where: { paymentExpirationDate: { gte: now } } }),
    prisma.payment.aggregate({ _sum: { amountPaid: true } }),
    prisma.testResult.count(),
    prisma.keywordResult.count(),
    prisma.user.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
    prisma.payment.count({ where: { paymentDate: { gte: sevenDaysAgo } } }),
  ]);

  // Users with at least one test
  const usersWithTests = await prisma.testResult.findMany({ select: { userId: true }, distinct: ["userId"] });
  const usersWithKeywords = await prisma.keywordResult.findMany({ select: { userId: true }, distinct: ["userId"] });
  const activeLearners = new Set([...usersWithTests.map(u => u.userId), ...usersWithKeywords.map(u => u.userId)]).size;

  return NextResponse.json({
    totalUsers,
    totalPayments,
    activeSubscriptions,
    totalRevenue: revenue._sum.amountPaid ?? 0,
    totalTestResults,
    totalKeywordResults,
    activeLearners,
    recentUsers,
    recentPayments,
  });
}
