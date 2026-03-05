import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getUser, hasActivePayment } from "@/lib/auth";
import prisma from "@/lib/prisma";

export default async function LevelsPage({ searchParams }: { searchParams: Promise<{ test?: string }> }) {
  const { test: testType = "tests" } = await searchParams;
  const isKeywords = testType === "keywords";

  const user = await getUser();
  if (!user) redirect("/login");
  if (!(await hasActivePayment(user.id))) redirect("/payment");

  const results = isKeywords
    ? await prisma.keywordResult.findMany({ where: { userId: user.id } })
    : await prisma.testResult.findMany({ where: { userId: user.id } });

  const total = isKeywords ? 4 : 20;
  const completedNums = new Set(results.map(r => r.testNumber));
  const maxUnlocked = completedNums.size > 0 ? Math.max(...completedNums) + 1 : 1;
  const progressPct = Math.round((completedNums.size / total) * 100);

  return (
    <div className="min-h-screen bg-[#f9f5ff] flex flex-col">

      {/* Top bar */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
        <div className="max-w-[640px] mx-auto px-4 h-[60px] flex items-center gap-3">
          <Link href="/app"
            className="w-9 h-9 shrink-0 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5d6eff" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
            </svg>
          </Link>
          <Image src="/assets/images/icons/full logo.svg" alt="RoadReady" width={100} height={36} className="object-contain" />
          <div className="flex-1 text-right">
            <p className="text-[1.4rem] font-bold text-[#202842]">{isKeywords ? "Amagambo" : "Ibizami"}</p>
            <p className="text-[1.2rem] text-[#202842]/50">{completedNums.size}/{total} birangiye</p>
          </div>
        </div>
        {/* Progress strip */}
        <div className="h-[3px] bg-[#e8e4ff]">
          <div className="h-full bg-[#5d6eff] transition-[width_.5s_ease]" style={{ width: `${progressPct}%` }} />
        </div>
      </div>

      {/* Level grid */}
      <div className="max-w-[640px] mx-auto w-full px-4 py-6 flex-1">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {Array.from({ length: total }, (_, i) => i + 1).map(num => {
            const result     = results.find(r => r.testNumber === num);
            const isUnlocked = num <= maxUnlocked;
            const marks      = result?.marks ? result.marks.split(",").map(Number) : [];
            const bestMark   = marks.length > 0 ? Math.max(...marks) : null;
            const maxMark    = isKeywords ? 5 : 20;
            const passed     = bestMark !== null && bestMark >= (isKeywords ? 3 : 12);

            return (
              <div key={num}
                className="bg-white rounded-xl p-4 border transition-all"
                style={{
                  borderColor: result ? "#c7ccff" : "#ece8e8",
                  opacity: isUnlocked ? 1 : 0.5,
                }}>
                {/* Header row */}
                <div className="flex items-center justify-between mb-2">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-[1.3rem] font-bold"
                       style={{
                         background: result ? "#5d6eff" : isUnlocked ? "#eeefff" : "#f0f0f0",
                         color:      result ? "#fff"    : isUnlocked ? "#5d6eff" : "#aaa",
                       }}>
                    {result ? "✓" : num}
                  </div>
                  {bestMark !== null && (
                    <span className="text-[1.1rem] font-bold px-2 py-0.5 rounded-full"
                          style={{
                            background: passed ? "#d4edda" : "#ffeeba",
                            color:      passed ? "#155724" : "#856404",
                          }}>
                      {bestMark}/{maxMark}
                    </span>
                  )}
                  {!isUnlocked && (
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="#ccc">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                    </svg>
                  )}
                </div>

                <p className="text-[1.4rem] font-bold text-[#202842]">
                  Ikizami {String(num).padStart(2, "0")}
                </p>
                <p className="text-[1.2rem] text-[#202842]/50 mt-0.5">
                  {isKeywords ? "5 ibibazo" : "20 ibibazo"}
                </p>

                {isUnlocked && (
                  <Link href={`/test?type=${testType}&num=${num}`}
                    className="btn btn-primary mt-3 w-full justify-center"
                    style={{ height: 36, fontSize: "1.3rem" }}>
                    {result ? "Subiramo" : "Tangira"}
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <footer className="app-footer">
        <p>&copy; Copyright 2025 RoadReady — A Binary Solutions Company.</p>
        <p>Designed By ClaroCreatives</p>
      </footer>
    </div>
  );
}
