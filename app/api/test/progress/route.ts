import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") || "tests";

  const results =
    type === "keywords"
      ? await prisma.keywordResult.findMany({ where: { userId: user.id } })
      : await prisma.testResult.findMany({ where: { userId: user.id } });

  return NextResponse.json(results);
}

export async function POST(req: NextRequest) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const {
    type,
    testNumber,
    startTestNumber,
    stopTestNumber,
    signStartTestN,
    signStopTestN,
    questions,
    marks,
  } = body;

  const data = {
    userId: user.id,
    testNumber: Number(testNumber),
    startTestNumber: Number(startTestNumber),
    stopTestNumber: Number(stopTestNumber),
    signStartTestN: Number(signStartTestN),
    signStopTestN: Number(signStopTestN),
    questions: Array.isArray(questions) ? questions.join(",") : String(questions),
    marks: Array.isArray(marks) ? marks.join(",") : String(marks),
  };

  if (type === "keywords") {
    await prisma.keywordResult.upsert({
      where: { userId_testNumber: { userId: user.id, testNumber: Number(testNumber) } },
      update: data,
      create: data,
    });
  } else {
    await prisma.testResult.upsert({
      where: { userId_testNumber: { userId: user.id, testNumber: Number(testNumber) } },
      update: data,
      create: data,
    });
  }

  return NextResponse.json({ success: true });
}
