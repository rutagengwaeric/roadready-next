import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") || 1);
  const limit = 20;

  const [payments, total] = await Promise.all([
    prisma.payment.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { paymentDate: "desc" },
      include: { user: { select: { username: true, phone: true, email: true } } },
    }),
    prisma.payment.count(),
  ]);

  return NextResponse.json({ payments, total, page, pages: Math.ceil(total / limit) });
}
