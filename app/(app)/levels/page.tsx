import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getUser, hasActivePayment } from "@/lib/auth";
import prisma from "@/lib/prisma";

const TOTAL_TESTS = 20;
const TOTAL_KEYWORDS = 4;

export default async function LevelsPage({ searchParams }: { searchParams: Promise<{ test?: string }> }) {
  const params = await searchParams;
  const testType = params.test || "tests";

  const user = await getUser();
  if (!user) redirect("/login");
  if (!(await hasActivePayment(user.id))) redirect("/payment");

  const results =
    testType === "keywords"
      ? await prisma.keywordResult.findMany({ where: { userId: user.id } })
      : await prisma.testResult.findMany({ where: { userId: user.id } });

  const total = testType === "keywords" ? TOTAL_KEYWORDS : TOTAL_TESTS;
  const completedNums = new Set(results.map(r => r.testNumber));
  const maxUnlocked = completedNums.size > 0 ? Math.max(...completedNums) + 1 : 1;
  const progressPct = Math.round((completedNums.size / total) * 100);

  return (
    <div className="min-h-screen bg-[#f9f5ff] flex flex-col">
      {/* Top bar */}
      <div className="bg-white border-b border-[#eee] sticky top-0 z-[100]">
        <div className="max-w-[640px] mx-auto px-4 h-[60px] flex items-center gap-3">
          <Link href="/app" className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#eee] shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5d6eff" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
          </Link>
          <Image src="/assets/images/icons/full logo.svg" alt="RoadReady" width={100} height={36} className="object-contain" />
          <div className="flex-1 text-right">
            <p className="text-[1.3rem] font-bold text-[#202842]">{testType === "keywords" ? "Amagambo" : "Ibizami"}</p>
            <p className="text-[1.2rem] text-[#202842]/55">{completedNums.size}/{total} birangiye</p>
          </div>
        </div>
        {/* Progress bar under topbar */}
        <div className="h-1 bg-[#e8e4ff] w-full">
          <div className="h-full bg-[#5d6eff] transition-[width_0.5s_ease]" style={{ width: `${progressPct}%` }} />
        </div>
      </div>

      <div className="max-w-[640px] mx-auto px-4 pt-6 pb-6 flex-1 w-full">
        <div className="grid gap-[14px]" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))" }}>
          {Array.from({ length: total }, (_, i) => i + 1).map(num => {
            const result = results.find(r => r.testNumber === num);
            const isUnlocked = num <= maxUnlocked;
            const marks = result?.marks ? result.marks.split(",").map(Number) : [];
            const bestMark = marks.length > 0 ? Math.max(...marks) : null;
            const maxMark = testType === "keywords" ? 5 : 20;
            const passed = bestMark !== null && bestMark >= (testType === "keywords" ? 3 : 12);

            return (
              <div
                key={num}
                className="bg-white rounded-xl p-[18px_16px] transition-all duration-200"
                style={{
                  border: `1px solid ${result ? "#d2d7ff" : "#ece8e8"}`,
                  opacity: isUnlocked ? 1 : 0.5,
                }}
              >
                <div className="flex items-center justify-between mb-2.5">
                  <div
                    className="w-10 h-10 rounded-[10px] flex items-center justify-center font-bold text-[1.4rem]"
                    style={{
                      background: result ? "#5d6eff" : isUnlocked ? "#eeefff" : "#f5f5f5",
                      color: result ? "#fff" : isUnlocked ? "#5d6eff" : "#aaa",
                    }}
                  >
                    {result ? "✓" : num}
                  </div>

                  {!isUnlocked && (
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="#aaa"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/></svg>
                  )}

                  {bestMark !== null && (
                    <span
                      className="text-[1.2rem] font-bold px-2 py-0.5 rounded-full"
                      style={{
                        background: passed ? "#d4edda" : "#ffeeba",
                        color: passed ? "#155724" : "#856404",
                      }}
                    >
                      {bestMark}/{maxMark}
                    </span>
                  )}
                </div>

                <p className="font-bold text-[1.5rem] text-[#202842]">
                  Ikizami {num < 10 ? `0${num}` : num}
                </p>
                <p className="text-[1.2rem] text-[#202842]/55 mt-0.5">
                  {testType === "keywords" ? "5 ibibazo" : "20 ibibazo"}
                </p>

                {isUnlocked && (
                  <Link
                    href={`/test?type=${testType}&num=${num}`}
                    className="btn btn-primary mt-3 w-full justify-center"
                    style={{ height: 38, fontSize: "1.3rem" }}
                  >
                    {result ? "Subiramo" : "Tangira"}
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <footer className="app-footer">
        <p>&copy; Copyright 2025 RoadReady - A Binary Solutions Company.</p>
        <p>Designed By ClaroCreatives</p>
      </footer>
    </div>
  );
}
