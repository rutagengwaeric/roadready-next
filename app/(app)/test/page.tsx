import { redirect } from "next/navigation";
import { getUser, hasActivePayment } from "@/lib/auth";
import TestClient from "@/components/test/TestClient";
import prisma from "@/lib/prisma";

export default async function TestPage({ searchParams }: { searchParams: Promise<{ type?: string; num?: string }> }) {
  const params = await searchParams;
  const testType = (params.type || "tests") as "tests" | "keywords";
  const testNum = Number(params.num || 1);

  const user = await getUser();
  if (!user) redirect("/login");
  if (!(await hasActivePayment(user.id))) redirect("/payment");

  // Load existing progress
  const existing =
    testType === "keywords"
      ? await prisma.keywordResult.findUnique({ where: { userId_testNumber: { userId: user.id, testNumber: testNum } } })
      : await prisma.testResult.findUnique({ where: { userId_testNumber: { userId: user.id, testNumber: testNum } } });

  return <TestClient testType={testType} testNumber={testNum} existing={existing} />;
}
