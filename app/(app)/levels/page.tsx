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
    <div style={{ minHeight: "100vh", backgroundColor: "#f9f5ff", display: "flex", flexDirection: "column" }}>
      {/* Top bar */}
      <div style={{ backgroundColor: "#fff", borderBottom: "1px solid #eee", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 16px", height: 60, display: "flex", alignItems: "center", gap: 12 }}>
          <Link href="/app" style={{ width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 8, border: "1px solid #eee", flexShrink: 0 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5d6eff" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
          </Link>
          <Image src="/assets/images/icons/full logo.svg" alt="RoadReady" width={100} height={36} style={{ objectFit: "contain" }} />
          <div style={{ flex: 1, textAlign: "right" }}>
            <p style={{ fontSize: "1.3rem", fontWeight: 700, color: "#202842" }}>{testType === "keywords" ? "Amagambo" : "Ibizami"}</p>
            <p style={{ fontSize: "1.2rem", color: "rgba(32,40,66,0.55)" }}>{completedNums.size}/{total} birangiye</p>
          </div>
        </div>
        {/* Progress bar under topbar */}
        <div style={{ height: 4, backgroundColor: "#e8e4ff", width: "100%" }}>
          <div style={{ height: "100%", backgroundColor: "#5d6eff", width: `${progressPct}%`, transition: "width 0.5s ease" }} />
        </div>
      </div>

      <div style={{ maxWidth: 640, margin: "0 auto", padding: "24px 16px", flex: 1, width: "100%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14 }}>
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
                style={{
                  background: "#fff",
                  border: `1px solid ${result ? "#d2d7ff" : isUnlocked ? "#ece8e8" : "#ece8e8"}`,
                  borderRadius: 12,
                  padding: "18px 16px",
                  opacity: isUnlocked ? 1 : 0.5,
                  transition: "0.2s",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10,
                    background: result ? "#5d6eff" : isUnlocked ? "#eeefff" : "#f5f5f5",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 700, fontSize: "1.4rem",
                    color: result ? "#fff" : isUnlocked ? "#5d6eff" : "#aaa",
                  }}>
                    {result ? "✓" : num}
                  </div>

                  {!isUnlocked && (
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="#aaa"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/></svg>
                  )}

                  {bestMark !== null && (
                    <span style={{
                      fontSize: "1.2rem", fontWeight: 700, padding: "2px 8px", borderRadius: 20,
                      background: passed ? "#d4edda" : "#ffeeba",
                      color: passed ? "#155724" : "#856404",
                    }}>
                      {bestMark}/{maxMark}
                    </span>
                  )}
                </div>

                <p style={{ fontWeight: 700, fontSize: "1.5rem", color: "#202842" }}>
                  Ikizami {num < 10 ? `0${num}` : num}
                </p>
                <p style={{ fontSize: "1.2rem", color: "rgba(32,40,66,0.55)", marginTop: 2 }}>
                  {testType === "keywords" ? "5 ibibazo" : "20 ibibazo"}
                </p>

                {isUnlocked && (
                  <Link
                    href={`/test?type=${testType}&num=${num}`}
                    className="btn btn-primary"
                    style={{ marginTop: 12, height: 38, width: "100%", fontSize: "1.3rem", display: "flex", justifyContent: "center" }}
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
