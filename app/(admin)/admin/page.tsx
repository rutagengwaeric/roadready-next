import { redirect } from "next/navigation";
import Link from "next/link";
import { getAdminSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import AdminSidebar from "@/components/admin/AdminSidebar";

async function getStats() {
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const [
    totalUsers,
    totalPayments,
    activeSubscriptions,
    revenue,
    totalTestResults,
    totalKeywordResults,
    allTestMarks,
    allKeywordMarks,
    recentUsers,
    recentPayments,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.payment.count(),
    prisma.payment.count({ where: { paymentExpirationDate: { gte: now } } }),
    prisma.payment.aggregate({ _sum: { amountPaid: true } }),
    prisma.testResult.count(),
    prisma.keywordResult.count(),
    prisma.testResult.findMany({ select: { marks: true } }),
    prisma.keywordResult.findMany({ select: { marks: true } }),
    prisma.user.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
    prisma.payment.count({ where: { paymentDate: { gte: sevenDaysAgo } } }),
  ]);

  // Calculate average test score
  const testScores = allTestMarks.flatMap(r => r.marks.split(",").map(Number).filter(n => !isNaN(n)));
  const keywordScores = allKeywordMarks.flatMap(r => r.marks.split(",").map(Number).filter(n => !isNaN(n)));
  const allScores = [...testScores, ...keywordScores];
  const avgScore = allScores.length > 0 ? Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length) : 0;

  // Pass rate: tests pass at 12/20 (60%), keywords pass at 3/5 (60%)
  const passedTests = testScores.filter(s => s >= 12).length;
  const passedKeywords = keywordScores.filter(s => s >= 3).length;
  const totalAttempts = testScores.length + keywordScores.length;
  const passRate = totalAttempts > 0 ? Math.round(((passedTests + passedKeywords) / totalAttempts) * 100) : 0;

  // Users who completed tests — distinct userIds
  const usersWithTests = await prisma.testResult.findMany({ select: { userId: true }, distinct: ["userId"] });
  const usersWithKeywords = await prisma.keywordResult.findMany({ select: { userId: true }, distinct: ["userId"] });
  const activeLearnersSet = new Set([...usersWithTests.map(u => u.userId), ...usersWithKeywords.map(u => u.userId)]);

  // Recent test activity
  const recentTestActivity = await prisma.testResult.findMany({
    orderBy: { id: "desc" },
    take: 8,
    include: { user: { select: { username: true, email: true } } },
  });

  const recentKeywordActivity = await prisma.keywordResult.findMany({
    orderBy: { id: "desc" },
    take: 4,
    include: { user: { select: { username: true, email: true } } },
  });

  // Test completion distribution (how many users completed 1, 2, 3… tests)
  const testCountByUser = await prisma.testResult.groupBy({
    by: ["userId"],
    _count: { testNumber: true },
  });

  const completionBuckets = { "1–5": 0, "6–10": 0, "11–15": 0, "16–20": 0, "20+": 0 };
  testCountByUser.forEach(u => {
    const c = u._count.testNumber;
    if (c <= 5) completionBuckets["1–5"]++;
    else if (c <= 10) completionBuckets["6–10"]++;
    else if (c <= 15) completionBuckets["11–15"]++;
    else if (c <= 20) completionBuckets["16–20"]++;
    else completionBuckets["20+"]++;
  });

  return {
    totalUsers,
    totalPayments,
    activeSubscriptions,
    totalRevenue: Number(revenue._sum.amountPaid ?? 0),
    totalTestResults,
    totalKeywordResults,
    avgScore,
    passRate,
    activeLearners: activeLearnersSet.size,
    recentUsers,
    recentPayments,
    recentTestActivity,
    recentKeywordActivity,
    completionBuckets,
  };
}

export default async function AdminDashboard() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const stats = await getStats();

  const cards = [
    {
      label: "Total Users", value: stats.totalUsers, sub: `+${stats.recentUsers} this week`,
      color: "#818cf8", bg: "rgba(93,110,255,0.12)", border: "rgba(93,110,255,0.2)",
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
    },
    {
      label: "Active Subscriptions", value: stats.activeSubscriptions, sub: `of ${stats.totalPayments} total payments`,
      color: "#c084fc", bg: "rgba(192,132,252,0.1)", border: "rgba(192,132,252,0.2)",
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
    },
    {
      label: "Revenue (RWF)", value: stats.totalRevenue.toLocaleString(), sub: `+${stats.recentPayments} payments this week`,
      color: "#fbbf24", bg: "rgba(251,191,36,0.1)", border: "rgba(251,191,36,0.2)",
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
    },
    {
      label: "Active Learners", value: stats.activeLearners, sub: `of ${stats.totalUsers} users started tests`,
      color: "#34d399", bg: "rgba(52,211,153,0.1)", border: "rgba(52,211,153,0.2)",
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
    },
  ];

  const testCards = [
    {
      label: "Tests Completed", value: stats.totalTestResults,
      color: "#f472b6", bg: "rgba(244,114,182,0.1)", border: "rgba(244,114,182,0.2)",
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f472b6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>
    },
    {
      label: "Keywords Completed", value: stats.totalKeywordResults,
      color: "#38bdf8", bg: "rgba(56,189,248,0.1)", border: "rgba(56,189,248,0.2)",
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
    },
    {
      label: "Average Score", value: stats.avgScore,
      color: "#a78bfa", bg: "rgba(167,139,250,0.1)", border: "rgba(167,139,250,0.2)",
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
    },
    {
      label: "Pass Rate", value: `${stats.passRate}%`,
      color: stats.passRate >= 70 ? "#34d399" : stats.passRate >= 50 ? "#fbbf24" : "#f87171",
      bg: stats.passRate >= 70 ? "rgba(52,211,153,0.1)" : stats.passRate >= 50 ? "rgba(251,191,36,0.1)" : "rgba(248,113,113,0.1)",
      border: stats.passRate >= 70 ? "rgba(52,211,153,0.2)" : stats.passRate >= 50 ? "rgba(251,191,36,0.2)" : "rgba(248,113,113,0.2)",
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={stats.passRate >= 70 ? "#34d399" : stats.passRate >= 50 ? "#fbbf24" : "#f87171"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
    },
  ];

  // Merge recent activity into one sorted list
  const recentActivity = [
    ...stats.recentTestActivity.map(r => ({
      type: "test" as const,
      user: r.user.username,
      email: r.user.email,
      testNumber: r.testNumber,
      score: r.marks.split(",").map(Number).filter(n => !isNaN(n)),
      id: r.id,
    })),
    ...stats.recentKeywordActivity.map(r => ({
      type: "keyword" as const,
      user: r.user.username,
      email: r.user.email,
      testNumber: r.testNumber,
      score: r.marks.split(",").map(Number).filter(n => !isNaN(n)),
      id: r.id,
    })),
  ].sort((a, b) => b.id - a.id).slice(0, 10);

  const bucketMax = Math.max(...Object.values(stats.completionBuckets), 1);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#13162b", display: "flex", fontFamily: "inherit" }}>
      <AdminSidebar />

      <main style={{ flex: 1, marginLeft: 240, padding: "32px 36px", overflowY: "auto", minHeight: "100vh" }}>
        {/* Page header */}
        <div style={{ marginBottom: 32, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 style={{ fontSize: "2.6rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>Dashboard</h1>
            <p style={{ fontSize: "1.3rem", color: "rgba(255,255,255,0.4)", marginTop: 4 }}>RoadReady management overview</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "8px 14px" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
            <span style={{ fontSize: "1.2rem", color: "rgba(255,255,255,0.45)" }}>
              {new Date().toLocaleDateString("en-US", { weekday: "long", day: "2-digit", month: "long", year: "numeric" })}
            </span>
          </div>
        </div>

        {/* Overview Stats */}
        <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>
          Overview
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 16, marginBottom: 32 }}>
          {cards.map(card => (
            <div key={card.label} style={{
              background: "rgba(255,255,255,0.03)",
              border: `1px solid ${card.border}`,
              borderRadius: 16, padding: "20px 22px",
              transition: "0.2s",
            }}>
              <div style={{
                width: 42, height: 42, borderRadius: 10,
                background: card.bg, border: `1px solid ${card.border}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 14,
              }}>
                {card.icon}
              </div>
              <p style={{ fontSize: "2.8rem", fontWeight: 800, color: card.color, lineHeight: 1 }}>{card.value}</p>
              <p style={{ fontSize: "1.3rem", color: "rgba(255,255,255,0.4)", marginTop: 6 }}>{card.label}</p>
              <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.25)", marginTop: 4 }}>{card.sub}</p>
            </div>
          ))}
        </div>

        {/* Test Analytics */}
        <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>
          Test Analytics
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, marginBottom: 32 }}>
          {testCards.map(card => (
            <div key={card.label} style={{
              background: "rgba(255,255,255,0.03)",
              border: `1px solid ${card.border}`,
              borderRadius: 14, padding: "18px 20px",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 9,
                  background: card.bg, border: `1px solid ${card.border}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {card.icon}
                </div>
                <span style={{ fontSize: "1.2rem", color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>{card.label}</span>
              </div>
              <p style={{ fontSize: "2.4rem", fontWeight: 800, color: card.color, lineHeight: 1 }}>{card.value}</p>
            </div>
          ))}
        </div>

        {/* Two‐column: Recent Activity + Completion Distribution */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 32 }}>
          {/* Recent Test Activity */}
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "20px 0", overflow: "hidden" }}>
            <p style={{ fontSize: "1.2rem", fontWeight: 700, color: "rgba(255,255,255,0.4)", padding: "0 22px", marginBottom: 14 }}>
              Recent Test Activity
            </p>
            {recentActivity.length === 0 ? (
              <p style={{ padding: "30px 22px", textAlign: "center", color: "rgba(255,255,255,0.25)", fontSize: "1.3rem" }}>
                No test activity yet.
              </p>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                      {["User", "Type", "Test #", "Score", "Result"].map(h => (
                        <th key={h} style={{ padding: "8px 22px", textAlign: "left", fontSize: "1rem", fontWeight: 600, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: 1 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {recentActivity.map((item, i) => {
                      const lastScore = item.score[item.score.length - 1] ?? 0;
                      const passThreshold = item.type === "test" ? 12 : 3;
                      const passed = lastScore >= passThreshold;
                      return (
                        <tr key={`${item.type}-${item.id}`} style={{ borderBottom: i < recentActivity.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                          <td style={{ padding: "10px 22px" }}>
                            <p style={{ fontSize: "1.3rem", fontWeight: 600, color: "#fff" }}>{item.user}</p>
                            <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.3)", marginTop: 1 }}>{item.email}</p>
                          </td>
                          <td style={{ padding: "10px 22px" }}>
                            <span style={{
                              display: "inline-block", padding: "2px 8px", borderRadius: 6, fontSize: "1.1rem", fontWeight: 600,
                              background: item.type === "test" ? "rgba(244,114,182,0.12)" : "rgba(56,189,248,0.12)",
                              color: item.type === "test" ? "#f472b6" : "#38bdf8",
                            }}>
                              {item.type === "test" ? "Test" : "Keyword"}
                            </span>
                          </td>
                          <td style={{ padding: "10px 22px", fontSize: "1.3rem", color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>
                            #{item.testNumber < 10 ? `0${item.testNumber}` : item.testNumber}
                          </td>
                          <td style={{ padding: "10px 22px", fontSize: "1.3rem", fontWeight: 700, color: passed ? "#34d399" : "#f87171" }}>
                            {lastScore}/{item.type === "test" ? 20 : 5}
                          </td>
                          <td style={{ padding: "10px 22px" }}>
                            <span style={{
                              display: "inline-flex", alignItems: "center", gap: 5,
                              padding: "2px 10px", borderRadius: 20, fontSize: "1.1rem", fontWeight: 600,
                              background: passed ? "rgba(52,211,153,0.12)" : "rgba(248,113,113,0.12)",
                              color: passed ? "#34d399" : "#f87171",
                            }}>
                              ● {passed ? "Passed" : "Failed"}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Completion Distribution */}
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 22 }}>
            <p style={{ fontSize: "1.2rem", fontWeight: 700, color: "rgba(255,255,255,0.4)", marginBottom: 20 }}>
              Tests Completed per User
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {Object.entries(stats.completionBuckets).map(([range, count]) => (
                <div key={range}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ fontSize: "1.2rem", color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>{range} tests</span>
                    <span style={{ fontSize: "1.2rem", color: "#818cf8", fontWeight: 700 }}>{count} users</span>
                  </div>
                  <div style={{ height: 8, backgroundColor: "rgba(255,255,255,0.04)", borderRadius: 4, overflow: "hidden" }}>
                    <div style={{
                      height: "100%",
                      width: `${(count / bucketMax) * 100}%`,
                      background: "linear-gradient(90deg, #5d6eff, #818cf8)",
                      borderRadius: 4,
                      transition: "width 0.5s ease",
                      minWidth: count > 0 ? 4 : 0,
                    }} />
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 24, padding: "16px 18px", background: "rgba(93,110,255,0.06)", border: "1px solid rgba(93,110,255,0.15)", borderRadius: 12 }}>
              <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.35)", marginBottom: 4 }}>Engagement Rate</p>
              <p style={{ fontSize: "2rem", fontWeight: 800, color: "#818cf8" }}>
                {stats.totalUsers > 0 ? Math.round((stats.activeLearners / stats.totalUsers) * 100) : 0}%
              </p>
              <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.25)", marginTop: 2 }}>
                {stats.activeLearners} of {stats.totalUsers} users have taken at least one test
              </p>
            </div>
          </div>
        </div>

        {/* Quick links */}
        <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>
          Quick Actions
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
          {[
            {
              href: "/admin/users", label: "Manage Users", desc: "View and manage all users", color: "#818cf8", border: "rgba(93,110,255,0.25)", bg: "rgba(93,110,255,0.08)",
              icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
            },
            {
              href: "/admin/payments", label: "All Payments", desc: "View complete payment history", color: "#34d399", border: "rgba(52,211,153,0.25)", bg: "rgba(52,211,153,0.08)",
              icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>
            },
          ].map(item => (
            <Link key={item.href} href={item.href} style={{
              display: "block", background: item.bg,
              border: `1px solid ${item.border}`,
              borderRadius: 16, padding: 24, textDecoration: "none", transition: "0.2s",
            }}
              className="adm-quick-link"
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {item.icon}
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7" /><path d="M7 7h10v10" /></svg>
              </div>
              <p style={{ fontSize: "1.7rem", fontWeight: 700, color: "#fff" }}>{item.label}</p>
              <p style={{ fontSize: "1.3rem", color: "rgba(255,255,255,0.4)", marginTop: 4 }}>{item.desc}</p>
            </Link>
          ))}
        </div>
      </main>

      <style>{`
        .adm-quick-link:hover { filter: brightness(1.1); transform: translateY(-2px); }
      `}</style>
    </div>
  );
}
