import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminTestsPage({ searchParams }: { searchParams: Promise<{ page?: string; search?: string }> }) {
    const session = await getAdminSession();
    if (!session) redirect("/admin/login");

    const params = await searchParams;
    const page = Number(params.page || 1);
    const search = params.search || "";
    const limit = 15;

    const where = search
        ? {
            OR: [
                { username: { contains: search, mode: "insensitive" as const } },
                { email: { contains: search, mode: "insensitive" as const } },
                { phone: { contains: search } },
            ],
        }
        : {};

    // Find users who have taken tests or keywords
    const [users, total] = await Promise.all([
        prisma.user.findMany({
            where: {
                ...where,
                OR: [
                    { testResults: { some: {} } },
                    { keywords: { some: {} } }
                ]
            },
            skip: (page - 1) * limit,
            take: limit,
            orderBy: { createdAt: "desc" },
            include: {
                testResults: { orderBy: { testNumber: "asc" } },
                keywords: { orderBy: { testNumber: "asc" } },
            },
        }),
        prisma.user.count({
            where: {
                ...where,
                OR: [
                    { testResults: { some: {} } },
                    { keywords: { some: {} } }
                ]
            }
        }),
    ]);

    const pages = Math.ceil(total / limit);

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#13162b", display: "flex", fontFamily: "inherit" }}>
            <AdminSidebar />

            <main className="admin-main" style={{ flex: 1, overflowY: "auto", minHeight: "100vh" }}>
                <div style={{ marginBottom: 24, display: "flex", flexDirection: "column", gap: 12 }}>
                    <div>
                        <h1 style={{ fontSize: "2.8rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>Test Results</h1>
                        <p style={{ fontSize: "1.3rem", color: "rgba(255,255,255,0.45)", marginTop: 6 }}>
                            {total} users have completed at least one test
                        </p>
                    </div>
                </div>

                {/* Search */}
                <form style={{ marginBottom: 24 }}>
                    <div className="search-container" style={{ display: "flex", gap: 10, maxWidth: 500 }}>
                        <div style={{ position: "relative", flex: 1 }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)" }}>
                                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            <input
                                name="search"
                                defaultValue={search}
                                placeholder="Search by name, email, or phone..."
                                style={{ width: "100%", backgroundColor: "#1a1d2e", border: "1px solid #2a2d4a", borderRadius: 12, padding: "12px 16px 12px 44px", color: "#fff", fontSize: "1.4rem", outline: "none", fontFamily: "inherit", transition: "0.2s" }}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ height: 48, paddingInline: 24, fontSize: "1.3rem", borderRadius: 12 }}>Search</button>
                    </div>
                </form>

                {/* User Test Cards */}
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    {users.map(user => {
                        const totalTests = user.testResults.length + user.keywords.length;

                        // Calculate overall pass rate for this user
                        const testScores = user.testResults.map(t => Number(t.marks.split(',').pop() || 0));
                        const keywordScores = user.keywords.map(k => Number(k.marks.split(',').pop() || 0));

                        const passedTests = testScores.filter(s => s >= 12).length;
                        const passedKeywords = keywordScores.filter(s => s >= 3).length;
                        const overallPassRate = totalTests > 0 ? Math.round(((passedTests + passedKeywords) / totalTests) * 100) : 0;

                        const rateColor = overallPassRate >= 70 ? "#34d399" : overallPassRate >= 50 ? "#fbbf24" : "#f87171";
                        const rateBg = overallPassRate >= 70 ? "rgba(52,211,153,0.12)" : overallPassRate >= 50 ? "rgba(251,191,36,0.12)" : "rgba(248,113,113,0.12)";

                        return (
                            <details key={user.id} style={{
                                backgroundColor: "#12152a", border: "1px solid #2a2d4a", borderRadius: 16, overflow: "hidden"
                            }} className="test-card">
                                <summary style={{ padding: "20px 24px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", listStyle: "none" }}>
                                    <div className="test-card-header" style={{ display: "flex", alignItems: "center", gap: 16 }}>
                                        <div style={{ width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(135deg, #5d6eff, #818cf8)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "1.8rem", fontWeight: 700 }}>
                                            {user.username.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <h2 style={{ fontSize: "1.6rem", fontWeight: 700, color: "#fff" }}>{user.username}</h2>
                                            <div className="test-card-contacts" style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 4 }}>
                                                <span style={{ fontSize: "1.3rem", color: "rgba(255,255,255,0.4)" }}>{user.email}</span>
                                                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(255,255,255,0.2)" }} />
                                                <span style={{ fontSize: "1.3rem", color: "rgba(255,255,255,0.4)" }}>{user.phone}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                                        <div style={{ textAlign: "right" }}>
                                            <p style={{ fontSize: "1.2rem", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Completed</p>
                                            <p style={{ fontSize: "1.6rem", fontWeight: 700, color: "#fff" }}>{totalTests} Tests</p>
                                        </div>
                                        <div style={{ textAlign: "right" }}>
                                            <p style={{ fontSize: "1.2rem", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Pass Rate</p>
                                            <span style={{ display: "inline-block", padding: "4px 10px", borderRadius: 8, background: rateBg, color: rateColor, fontSize: "1.4rem", fontWeight: 700 }}>
                                                {overallPassRate}%
                                            </span>
                                        </div>
                                        <svg className="chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "0.3s" }}>
                                            <polyline points="6 9 12 15 18 9" />
                                        </svg>
                                    </div>
                                </summary>

                                <div className="test-details" style={{ padding: "0 24px 24px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>

                                    {user.testResults.length > 0 && (
                                        <div style={{ marginTop: 24 }}>
                                            <h3 style={{ fontSize: "1.4rem", fontWeight: 700, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 16 }}>Regular Tests</h3>
                                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
                                                {user.testResults.map(t => {
                                                    const score = Number(t.marks.split(',').pop() || 0);
                                                    const passed = score >= 12;
                                                    return (
                                                        <div key={t.id} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "14px 16px" }}>
                                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                                                                <span style={{ fontSize: "1.4rem", fontWeight: 700, color: "#fff" }}>Test #{t.testNumber < 10 ? `0${t.testNumber}` : t.testNumber}</span>
                                                                <span style={{ width: 8, height: 8, borderRadius: "50%", background: passed ? "#34d399" : "#f87171" }} />
                                                            </div>
                                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                                                                <span style={{ fontSize: "1.2rem", color: "rgba(255,255,255,0.4)" }}>Score</span>
                                                                <span style={{ fontSize: "1.8rem", fontWeight: 700, color: passed ? "#34d399" : "#f87171" }}>{score}/20</span>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}

                                    {user.keywords.length > 0 && (
                                        <div style={{ marginTop: 24 }}>
                                            <h3 style={{ fontSize: "1.4rem", fontWeight: 700, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 16 }}>Keyword Tests</h3>
                                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
                                                {user.keywords.map(k => {
                                                    const score = Number(k.marks.split(',').pop() || 0);
                                                    const passed = score >= 3;
                                                    return (
                                                        <div key={k.id} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "14px 16px" }}>
                                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                                                                <span style={{ fontSize: "1.4rem", fontWeight: 700, color: "#fff" }}>Keyword #{k.testNumber < 10 ? `0${k.testNumber}` : k.testNumber}</span>
                                                                <span style={{ width: 8, height: 8, borderRadius: "50%", background: passed ? "#38bdf8" : "#f87171" }} />
                                                            </div>
                                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                                                                <span style={{ fontSize: "1.2rem", color: "rgba(255,255,255,0.4)" }}>Score</span>
                                                                <span style={{ fontSize: "1.8rem", fontWeight: 700, color: passed ? "#38bdf8" : "#f87171" }}>{score}/5</span>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </details>
                        );
                    })}

                    {users.length === 0 && (
                        <div style={{ padding: "60px 20px", textAlign: "center", backgroundColor: "#12152a", border: "1px solid #2a2d4a", borderRadius: 16 }}>
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 auto 16px" }}>
                                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "1.5rem", fontWeight: 500 }}>No users found with test results.</p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {pages > 1 && (
                    <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 32 }}>
                        {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
                            <Link key={p} href={`/admin/tests?page=${p}&search=${search}`}
                                style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 10, fontSize: "1.3rem", fontWeight: 600, textDecoration: "none", background: p === page ? "#5d6eff" : "#1a1d2e", color: p === page ? "#fff" : "rgba(255,255,255,0.5)", border: p === page ? "none" : "1px solid #2a2d4a", transition: "0.2s" }}
                            >
                                {p}
                            </Link>
                        ))}
                    </div>
                )}
            </main>

            <style>{`
        summary::-webkit-details-marker { display: none; }
        .test-card[open] summary { border-bottom: 1px solid rgba(255,255,255,0.06); }
        .test-card[open] summary .chevron { transform: rotate(180deg); }
        
        .admin-main { margin-left: 240px; padding: 32px 36px; }
        
        @media (max-width: 1024px) {
          .admin-main { margin-left: 0; padding: 100px 20px 32px; }
        }
        
        @media (max-width: 600px) {
          .search-container { flex-direction: column; max-width: 100% !important; }
          .test-card summary { flex-direction: column; align-items: flex-start !important; gap: 20px; }
          .test-card-header { align-items: flex-start !important; }
          .test-card-contacts { flex-direction: column; align-items: flex-start !important; gap: 4px !important; }
          .test-card-contacts span:nth-child(2) { display: none; }
        }
      `}</style>
        </div>
    );
}
