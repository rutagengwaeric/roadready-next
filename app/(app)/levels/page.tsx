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

  const [testResults, keywordResults] = await Promise.all([
    prisma.testResult.findMany({ where: { userId: user.id } }),
    prisma.keywordResult.findMany({ where: { userId: user.id } }),
  ]);

  const results = isKeywords ? keywordResults : testResults;
  const total = isKeywords ? 4 : 20;
  const completedNums = new Set(results.map(r => r.testNumber));
  const maxUnlocked = completedNums.size > 0 ? Math.max(...completedNums) + 1 : 1;
  const progressPct = Math.round((completedNums.size / total) * 100);

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "inherit", display: "flex", flexDirection: "column" }}>

      {/* Header */}
      <header style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", position: "sticky", top: 0, zIndex: 40 }}>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 20px", height: 60, display: "flex", alignItems: "center", gap: 14 }}>
          <Link href="/app" style={{ width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 8, border: "1px solid #e2e8f0", background: "#fff", flexShrink: 0, textDecoration: "none" }} className="back-icon-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
            </svg>
          </Link>
          <Image src="/assets/images/icons/full logo.svg" alt="RoadReady" width={96} height={32} style={{ objectFit: "contain" }} />
          <div style={{ flex: 1 }} />
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: "1.3rem", fontWeight: 700, color: "#0f172a", lineHeight: 1 }}>{isKeywords ? "Amagambo" : "Ibizami"}</p>
            <p style={{ fontSize: "1.1rem", color: "#94a3b8", marginTop: 2 }}>{completedNums.size}/{total} birangiye</p>
          </div>
        </div>
        {/* Progress strip */}
        <div style={{ height: 3, background: "#f1f5f9" }}>
          <div style={{ height: "100%", width: `${progressPct}%`, background: "#4f46e5", transition: "width 0.5s ease" }} />
        </div>
      </header>

      {/* Body */}
      <div style={{ flex: 1, maxWidth: 860, margin: "0 auto", width: "100%", padding: "24px 20px 48px" }}>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 6, marginBottom: 24, background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10, padding: 4 }}>
          <Link
            href="/levels?test=tests"
            style={{
              flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
              padding: "9px 16px", borderRadius: 7, textDecoration: "none", fontSize: "1.35rem", fontWeight: 600,
              background: !isKeywords ? "#4f46e5" : "transparent",
              color: !isKeywords ? "#fff" : "#64748b",
              transition: "background 0.15s, color 0.15s",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
            </svg>
            Ibizami
            <span style={{ fontSize: "1.1rem", fontWeight: 700, padding: "1px 7px", borderRadius: 20, background: !isKeywords ? "rgba(255,255,255,0.2)" : "#f1f5f9", color: !isKeywords ? "#fff" : "#94a3b8" }}>
              {testResults.length}/20
            </span>
          </Link>
          <Link
            href="/levels?test=keywords"
            style={{
              flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
              padding: "9px 16px", borderRadius: 7, textDecoration: "none", fontSize: "1.35rem", fontWeight: 600,
              background: isKeywords ? "#10b981" : "transparent",
              color: isKeywords ? "#fff" : "#64748b",
              transition: "background 0.15s, color 0.15s",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            Amagambo
            <span style={{ fontSize: "1.1rem", fontWeight: 700, padding: "1px 7px", borderRadius: 20, background: isKeywords ? "rgba(255,255,255,0.2)" : "#f1f5f9", color: isKeywords ? "#fff" : "#94a3b8" }}>
              {keywordResults.length}/4
            </span>
          </Link>
        </div>

        {/* Progress bar card */}
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "16px 20px", marginBottom: 20, display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: "1.25rem", fontWeight: 600, color: "#334155" }}>Urwego rwawe</span>
              <span style={{ fontSize: "1.25rem", fontWeight: 700, color: isKeywords ? "#10b981" : "#4f46e5" }}>{progressPct}%</span>
            </div>
            <div style={{ height: 6, background: "#f1f5f9", borderRadius: 99, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${progressPct}%`, background: isKeywords ? "#10b981" : "#4f46e5", borderRadius: 99 }} />
            </div>
          </div>
          <div style={{ textAlign: "center", flexShrink: 0 }}>
            <p style={{ fontSize: "2.2rem", fontWeight: 800, color: isKeywords ? "#10b981" : "#4f46e5", lineHeight: 1 }}>{completedNums.size}</p>
            <p style={{ fontSize: "1.1rem", color: "#94a3b8" }}>/ {total}</p>
          </div>
        </div>

        {/* Level grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
          {Array.from({ length: total }, (_, i) => i + 1).map(num => {
            const result = results.find(r => r.testNumber === num);
            const isUnlocked = num <= maxUnlocked;
            const marks = result?.marks ? result.marks.split(",").map(Number) : [];
            const bestMark = marks.length > 0 ? Math.max(...marks) : null;
            const maxMark = isKeywords ? 5 : 20;
            const passed = bestMark !== null && bestMark >= (isKeywords ? 3 : 12);
            const accentColor = isKeywords ? "#10b981" : "#4f46e5";

            return (
              <div
                key={num}
                style={{
                  background: "#fff",
                  border: `1px solid ${result ? (passed ? "#a7f3d0" : "#fde68a") : "#e2e8f0"}`,
                  borderRadius: 12,
                  padding: "16px",
                  opacity: isUnlocked ? 1 : 0.5,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {/* Top row */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: 8,
                    background: result ? (passed ? "#ecfdf5" : "#fffbeb") : isUnlocked ? "#eef2ff" : "#f8fafc",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    {result ? (
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={passed ? "#059669" : "#d97706"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    ) : isUnlocked ? (
                      <span style={{ fontSize: "1.3rem", fontWeight: 800, color: accentColor }}>{num}</span>
                    ) : (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                      </svg>
                    )}
                  </div>

                  {bestMark !== null && (
                    <span style={{
                      fontSize: "1.1rem", fontWeight: 700, padding: "2px 8px", borderRadius: 20,
                      background: passed ? "#ecfdf5" : "#fffbeb",
                      color: passed ? "#059669" : "#d97706",
                      border: `1px solid ${passed ? "#a7f3d0" : "#fde68a"}`,
                    }}>
                      {bestMark}/{maxMark}
                    </span>
                  )}
                </div>

                <div>
                  <p style={{ fontSize: "1.4rem", fontWeight: 700, color: "#0f172a" }}>
                    {isKeywords ? "Amagambo" : "Ikizami"} {String(num).padStart(2, "0")}
                  </p>
                  <p style={{ fontSize: "1.15rem", color: "#94a3b8", marginTop: 2 }}>
                    {isKeywords ? "5 ibibazo" : "20 ibibazo"}
                  </p>
                </div>

                {isUnlocked && (
                  <Link
                    href={`/test?type=${testType}&num=${num}`}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
                      padding: "8px 12px", borderRadius: 7, textDecoration: "none",
                      fontSize: "1.25rem", fontWeight: 700, marginTop: "auto",
                      background: result ? "#f8fafc" : accentColor,
                      color: result ? "#334155" : "#fff",
                      border: result ? "1px solid #e2e8f0" : "none",
                    }}
                    className="level-btn"
                  >
                    {result ? "Subiramo" : "Tangira"}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
                    </svg>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <footer style={{ textAlign: "center", padding: "20px", borderTop: "1px solid #f1f5f9" }}>
        <p style={{ fontSize: "1.2rem", color: "#cbd5e1" }}>&copy; 2025 RoadReady &mdash; A Binary Solutions Company</p>
      </footer>

      <style>{`
        .back-icon-btn:hover { background: #f8fafc !important; border-color: #c7d2fe !important; }
        .level-btn:hover { opacity: 0.88; }
      `}</style>
    </div>
  );
}
