import { redirect } from "next/navigation";
import Link from "next/link";
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/app" className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div className="flex-1">
            <h1 className="font-bold text-gray-900">{testType === "keywords" ? "Amagambo Ngenderwaho" : "Ibizami"}</h1>
            <p className="text-xs text-gray-500">{completedNums.size}/{total} birangiye</p>
          </div>
          <div className="text-right">
            <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#5d63ff] rounded-full" style={{ width: `${(completedNums.size / total) * 100}%` }} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="grid sm:grid-cols-2 gap-4">
          {Array.from({ length: total }, (_, i) => i + 1).map(num => {
            const result = results.find(r => r.testNumber === num);
            const isUnlocked = num <= maxUnlocked;
            const marks = result?.marks ? result.marks.split(",").map(Number) : [];
            const bestMark = marks.length > 0 ? Math.max(...marks) : null;
            const maxMark = testType === "keywords" ? 5 : 20;

            return (
              <div
                key={num}
                className={`bg-white rounded-2xl border p-5 transition-all ${isUnlocked ? "border-gray-200 hover:border-[#5d63ff]/40 hover:shadow-sm cursor-pointer" : "border-gray-100 opacity-50 cursor-not-allowed"}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${result ? "bg-[#5d63ff] text-white" : isUnlocked ? "bg-[#5d63ff]/10 text-[#5d63ff]" : "bg-gray-100 text-gray-400"}`}>
                    {result ? "✓" : num}
                  </div>
                  {!isUnlocked && (
                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  )}
                  {bestMark !== null && (
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${bestMark >= maxMark * 0.75 ? "bg-green-100 text-green-700" : bestMark >= maxMark * 0.5 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-600"}`}>
                      {bestMark}/{maxMark}
                    </span>
                  )}
                </div>
                <p className="font-semibold text-gray-900 text-sm">Ikizami {num < 10 ? `0${num}` : num}</p>
                <p className="text-xs text-gray-500 mt-0.5">{testType === "keywords" ? "5 ibibazo" : "20 ibibazo"}</p>
                {isUnlocked && (
                  <Link
                    href={`/test?type=${testType}&num=${num}`}
                    className="mt-3 w-full block text-center py-2 rounded-xl text-xs font-semibold bg-[#5d63ff]/10 text-[#5d63ff] hover:bg-[#5d63ff] hover:text-white transition-all"
                  >
                    {result ? "Subiramo" : "Tangira"}
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
