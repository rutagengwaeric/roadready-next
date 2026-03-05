import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getUser, hasActivePayment } from "@/lib/auth";
import prisma from "@/lib/prisma";

const getPlan = (amount: number) => {
  if (amount >= 5000) return { name: "Diamond", color: "#6366f1", img: "/assets/images/icons/diamond.png" };
  if (amount >= 3000) return { name: "Gold", color: "#d97706", img: "/assets/images/icons/gold 1.png" };
  if (amount >= 2000) return { name: "Silver", color: "#64748b", img: "/assets/images/icons/silver 1.png" };
  return { name: "Bronze", color: "#b45309", img: "/assets/images/icons/bronze 1.png" };
};

export default async function AppDashboard() {
  const user = await getUser();
  if (!user) redirect("/login");
  if (!(await hasActivePayment(user.id))) redirect("/payment");

  const payment = await prisma.payment.findFirst({
    where: { userId: user.id, paymentExpirationDate: { gte: new Date() } },
    orderBy: { paymentExpirationDate: "desc" },
  });

  const [testResults, keywordResults] = await Promise.all([
    prisma.testResult.findMany({ where: { userId: user.id }, select: { marks: true } }),
    prisma.keywordResult.findMany({ where: { userId: user.id }, select: { marks: true } }),
  ]);

  const doneTests = testResults.length;
  const doneKeywords = keywordResults.length;

  const testScores = testResults.flatMap(r => r.marks.split(",").map(Number).filter(n => !isNaN(n)));
  const avgTestScore = testScores.length > 0 ? testScores.reduce((a, b) => a + b, 0) / testScores.length : 0;
  const scorePct = Math.round((avgTestScore / 20) * 100);
  const completionPct = Math.round((doneTests / 20) * 100);
  const chancePct = testScores.length > 0 ? Math.min(100, Math.round(scorePct * 0.6 + completionPct * 0.4)) : 0;

  const testProgressPct = Math.round((doneTests / 20) * 100);
  const keywordProgressPct = Math.round((doneKeywords / 4) * 100);

  const expiresIn = payment
    ? Math.ceil((new Date(payment.paymentExpirationDate).getTime() - Date.now()) / 86_400_000)
    : 0;
  const expiryStr = payment
    ? new Date(payment.paymentExpirationDate).toLocaleDateString("fr-RW", { day: "2-digit", month: "long", year: "numeric" })
    : "";
  const plan = payment ? getPlan(Number(payment.amountPaid)) : null;

  const motivMsg = chancePct >= 80
    ? "Birashimishije! Warakuriye cyane."
    : chancePct >= 50
    ? "Warakuze neza! Subiramo ibizami bibi."
    : chancePct > 0
    ? "Uracyafite igihe. Komeza ibizami."
    : "Tangira ibizami kugira ngo urebe aho uri.";

  const circumference = 2 * Math.PI * 40;
  const chanceColor = chancePct >= 70 ? "#10b981" : chancePct >= 40 ? "#4f46e5" : "#f43f5e";

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8fafc", fontFamily: "inherit", display: "flex", flexDirection: "column" }}>

      {/* ── HEADER ── */}
      <header style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", position: "sticky", top: 0, zIndex: 40 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>

          <Image src="/assets/images/icons/full logo.svg" alt="RoadReady" width={110} height={36} style={{ objectFit: "contain", flexShrink: 0 }} />

          {/* Nav */}
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Link href="/levels" className="h-nav-link" style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 12px", borderRadius: 8, fontSize: "1.3rem", fontWeight: 500, color: "#475569", textDecoration: "none" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
              </svg>
              <span className="h-nav-txt">Ibizami</span>
            </Link>

            <Link href="/profile" className="h-nav-link" style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 12px", borderRadius: 8, fontSize: "1.3rem", fontWeight: 500, color: "#475569", textDecoration: "none" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
              <span className="h-nav-txt">Konti</span>
            </Link>

            <div style={{ width: 1, height: 20, background: "#e2e8f0", margin: "0 4px" }} />

            {/* User pill */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 10px 4px 5px", borderRadius: 30, border: "1px solid #e2e8f0", background: "#f8fafc" }} className="h-user-pill">
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#4f46e5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontSize: "1.2rem", fontWeight: 700, color: "#fff" }}>{user.username.charAt(0).toUpperCase()}</span>
              </div>
              <span style={{ fontSize: "1.2rem", fontWeight: 600, color: "#0f172a" }}>{user.username}</span>
              {payment && plan && (
                <span style={{ fontSize: "1.1rem", fontWeight: 600, color: plan.color, background: `${plan.color}14`, padding: "2px 7px", borderRadius: 20 }}>{plan.name}</span>
              )}
            </div>

            <form action="/api/auth/logout" method="POST" style={{ marginLeft: 4 }}>
              <button className="h-logout" style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 12px", borderRadius: 8, border: "1px solid #fecdd3", background: "#fff5f5", color: "#e11d48", fontSize: "1.3rem", fontWeight: 600, cursor: "pointer" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                <span className="h-logout-txt">Gusohoka</span>
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* ── BODY ── */}
      <div className="app-grid" style={{ flex: 1, maxWidth: 1280, margin: "0 auto", width: "100%", padding: "24px 24px 40px", alignItems: "start" }}>

        {/* ══ LEFT SIDEBAR ══ */}
        <aside className="app-sidebar" style={{ display: "flex", flexDirection: "column", gap: 12 }}>

          {/* Profile card */}
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#4f46e5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontSize: "2rem", fontWeight: 700, color: "#fff" }}>{user.username.charAt(0).toUpperCase()}</span>
              </div>
              <div style={{ minWidth: 0 }}>
                <p style={{ fontSize: "1.5rem", fontWeight: 700, color: "#0f172a", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.username}</p>
                <p style={{ fontSize: "1.2rem", color: "#94a3b8", marginTop: 1 }}>{user.phone}</p>
              </div>
            </div>

            {payment && plan ? (
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Image src={plan.img} alt={plan.name} width={16} height={16} style={{ objectFit: "contain" }} />
                    <span style={{ fontSize: "1.3rem", fontWeight: 600, color: plan.color }}>Plan {plan.name}</span>
                  </div>
                  <span style={{ fontSize: "1.15rem", fontWeight: 600, color: expiresIn <= 3 ? "#ef4444" : "#94a3b8" }}>
                    {expiresIn}j isigaye
                  </span>
                </div>

                <div style={{ background: "#f8fafc", border: "1px solid #f1f5f9", borderRadius: 8, padding: "12px 14px", marginBottom: 12 }}>
                  <p style={{ fontSize: "1.05rem", color: "#94a3b8", marginBottom: 3 }}>Ikiguzi</p>
                  <p style={{ fontSize: "1.7rem", fontWeight: 700, color: "#0f172a", lineHeight: 1 }}>{Number(payment.amountPaid).toLocaleString()} RWF</p>
                  <p style={{ fontSize: "1.1rem", color: "#94a3b8", marginTop: 4 }}>Irangira {expiryStr}</p>
                </div>

                {expiresIn <= 7 && (
                  <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 8, padding: "8px 10px", marginBottom: 10 }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    <span style={{ fontSize: "1.15rem", color: "#ea580c", fontWeight: 500 }}>Subscription irimo kurangira</span>
                  </div>
                )}

                <Link href="/payment" style={{ display: "block", textAlign: "center", padding: "9px 14px", borderRadius: 8, border: "1px solid #c7d2fe", color: "#4f46e5", fontSize: "1.3rem", fontWeight: 600, textDecoration: "none", background: "#eef2ff" }}>
                  Ongeraho subscription
                </Link>
              </div>
            ) : (
              <Link href="/payment" style={{ display: "block", textAlign: "center", padding: "9px 14px", borderRadius: 8, background: "#4f46e5", color: "#fff", fontSize: "1.3rem", fontWeight: 600, textDecoration: "none" }}>
                Gura subscription
              </Link>
            )}
          </div>

          {/* Support */}
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "18px 20px" }}>
            <p style={{ fontSize: "1.1rem", fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 12 }}>Ubufasha</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {[
                { label: "Facebook", color: "#1877f2", icon: "/assets/images/icons/facebook.svg", href: "https://facebook.com" },
                { label: "Instagram", color: "#e1306c", icon: "/assets/images/icons/instagram.svg", href: "https://instagram.com" },
                { label: "WhatsApp", color: "#22c55e", icon: "/assets/images/whatsapp.png", href: "https://wa.me/250785171717" },
                { label: "X (Twitter)", color: "#0f172a", icon: "/assets/images/icons/x.png", href: "https://x.com" },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="support-link" style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 10px", borderRadius: 8, textDecoration: "none" }}>
                  <div style={{ width: 28, height: 28, borderRadius: 7, background: `${s.color}12`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Image src={s.icon} alt={s.label} width={14} height={14} style={{ objectFit: "contain" }} />
                  </div>
                  <span style={{ fontSize: "1.3rem", color: "#334155", fontWeight: 500 }}>{s.label}</span>
                  <svg style={{ marginLeft: "auto" }} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
                </a>
              ))}
            </div>
          </div>

          {/* Logout */}
          <form action="/api/auth/logout" method="POST">
            <button className="sidebar-logout" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", padding: "10px", borderRadius: 10, border: "1px solid #fecdd3", background: "#fff", color: "#e11d48", fontSize: "1.3rem", fontWeight: 600, cursor: "pointer" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Gusohoka
            </button>
          </form>

          <p style={{ fontSize: "1.1rem", color: "#cbd5e1", textAlign: "center", lineHeight: 1.6 }}>
            &copy; 2025 RoadReady &mdash; Binary Solutions
          </p>
        </aside>

        {/* ══ MAIN ══ */}
        <main style={{ display: "flex", flexDirection: "column", gap: 14, alignSelf: "start" }}>

          {/* Score overview */}
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "24px", overflow: "hidden", position: "relative" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>

              {/* Donut ring */}
              <div style={{ position: "relative", width: 96, height: 96, flexShrink: 0 }}>
                <svg width="96" height="96" viewBox="0 0 96 96" style={{ transform: "rotate(-90deg)" }}>
                  <circle cx="48" cy="48" r="40" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                  <circle cx="48" cy="48" r="40" fill="none"
                    stroke={chanceColor}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference * (1 - chancePct / 100)}
                  />
                </svg>
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: "2rem", fontWeight: 800, color: "#0f172a", lineHeight: 1 }}>{chancePct}%</span>
                </div>
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: "1.1rem", color: "#94a3b8", fontWeight: 500, marginBottom: 5 }}>Amahirwe yo gutsinda</p>
                <p style={{ fontSize: "1.8rem", fontWeight: 700, color: "#0f172a", lineHeight: 1.3, marginBottom: 12 }}>{motivMsg}</p>
                <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4f46e5", flexShrink: 0, display: "inline-block" }} />
                    <span style={{ fontSize: "1.2rem", color: "#64748b" }}>{doneTests}/20 ibizami</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", flexShrink: 0, display: "inline-block" }} />
                    <span style={{ fontSize: "1.2rem", color: "#64748b" }}>{doneKeywords}/4 amagambo</span>
                  </div>
                </div>
              </div>

              {/* Police officer illustration */}
              <div className="score-officer" style={{ flexShrink: 0, alignSelf: "flex-end" }}>
                <Image
                  src="/assets/images/police man.png"
                  alt="Police officer"
                  width={100}
                  height={120}
                  style={{ objectFit: "contain", display: "block" }}
                />
              </div>
            </div>
          </div>

          {/* Expiry warning */}
          {expiresIn > 0 && expiresIn <= 3 && (
            <Link href="/payment" style={{ display: "flex", alignItems: "center", gap: 10, background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 10, padding: "12px 16px", textDecoration: "none" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <span style={{ fontSize: "1.3rem", fontWeight: 600, color: "#c2410c" }}>Subscription yawe irangira mu minsi {expiresIn}. Kanda hano kuyongera.</span>
              <svg style={{ marginLeft: "auto", flexShrink: 0 }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
            </Link>
          )}

          {/* Progress cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }} className="test-cards-grid">

            {/* Imyitozo */}
            <Link href="/levels?test=tests" className="prog-card" style={{ display: "block", background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "20px", textDecoration: "none" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 9, background: "#eef2ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Image src="/assets/images/icons/Document.svg" alt="" width={18} height={18} />
                  </div>
                  <div>
                    <p style={{ fontSize: "1.4rem", fontWeight: 700, color: "#0f172a", lineHeight: 1 }}>Imyitozo</p>
                    <p style={{ fontSize: "1.1rem", color: "#94a3b8", marginTop: 2 }}>Ibizami by&apos;amategeko</p>
                  </div>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
                <span style={{ fontSize: "2.8rem", fontWeight: 800, color: "#4f46e5", lineHeight: 1 }}>{testProgressPct}<span style={{ fontSize: "1.4rem" }}>%</span></span>
                <span style={{ fontSize: "1.2rem", color: "#94a3b8" }}>{doneTests} / 20</span>
              </div>
              <div style={{ height: 5, background: "#f1f5f9", borderRadius: 99, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${testProgressPct}%`, background: "#4f46e5", borderRadius: 99 }} />
              </div>
              <p style={{ fontSize: "1.2rem", color: "#94a3b8", lineHeight: 1.5, marginTop: 12 }}>
                Uko uzamura amanota yawe niko wiyongerera amahirwe yo gutsinda ikizamini nyacyo.
              </p>
            </Link>

            {/* Amagambo */}
            <Link href="/levels?test=keywords" className="prog-card" style={{ display: "block", background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "20px", textDecoration: "none" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 9, background: "#ecfdf5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Image src="/assets/images/icons/Notification.svg" alt="" width={18} height={18} />
                  </div>
                  <div>
                    <p style={{ fontSize: "1.4rem", fontWeight: 700, color: "#0f172a", lineHeight: 1 }}>Amagambo</p>
                    <p style={{ fontSize: "1.1rem", color: "#94a3b8", marginTop: 2 }}>Vocabulary y&apos;ibanze</p>
                  </div>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
                <span style={{ fontSize: "2.8rem", fontWeight: 800, color: "#10b981", lineHeight: 1 }}>{keywordProgressPct}<span style={{ fontSize: "1.4rem" }}>%</span></span>
                <span style={{ fontSize: "1.2rem", color: "#94a3b8" }}>{doneKeywords} / 4</span>
              </div>
              <div style={{ height: 5, background: "#f1f5f9", borderRadius: 99, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${keywordProgressPct}%`, background: "#10b981", borderRadius: 99 }} />
              </div>
              <p style={{ fontSize: "1.2rem", color: "#94a3b8", lineHeight: 1.5, marginTop: 12 }}>
                Imenyereze amagambo y&apos;ibanze n&apos;amazina akunze gukoreshwa mu kizamini.
              </p>
            </Link>
          </div>

          {/* CTA */}
          <Link href="/levels?test=tests" className="cta-btn" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "#4f46e5", color: "#fff", borderRadius: 10, padding: "15px 20px", textDecoration: "none", fontSize: "1.5rem", fontWeight: 700 }}>
            Tangira ikizami
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </main>

        {/* ══ RIGHT PANEL ══ */}
        <aside className="app-right" style={{ display: "flex", flexDirection: "column", gap: 12 }}>

          {/* Progress summary */}
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "20px" }}>
            <p style={{ fontSize: "1.1rem", fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 16 }}>Urwego rwawe</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
                  <span style={{ fontSize: "1.3rem", fontWeight: 600, color: "#334155" }}>Ibizami</span>
                  <span style={{ fontSize: "1.3rem", fontWeight: 700, color: "#4f46e5" }}>{doneTests}/20</span>
                </div>
                <div style={{ height: 5, background: "#f1f5f9", borderRadius: 99, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${testProgressPct}%`, background: "#4f46e5", borderRadius: 99 }} />
                </div>
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
                  <span style={{ fontSize: "1.3rem", fontWeight: 600, color: "#334155" }}>Amagambo</span>
                  <span style={{ fontSize: "1.3rem", fontWeight: 700, color: "#10b981" }}>{doneKeywords}/4</span>
                </div>
                <div style={{ height: 5, background: "#f1f5f9", borderRadius: 99, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${keywordProgressPct}%`, background: "#10b981", borderRadius: 99 }} />
                </div>
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
                  <span style={{ fontSize: "1.3rem", fontWeight: 600, color: "#334155" }}>Amahirwe</span>
                  <span style={{ fontSize: "1.3rem", fontWeight: 700, color: chanceColor }}>{chancePct}%</span>
                </div>
                <div style={{ height: 5, background: "#f1f5f9", borderRadius: 99, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${chancePct}%`, background: chanceColor, borderRadius: 99 }} />
                </div>
              </div>
            </div>
          </div>

          {/* Quick nav */}
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, overflow: "hidden" }}>
            <p style={{ fontSize: "1.1rem", fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.07em", padding: "16px 18px 12px" }}>Ibizami by&apos;ingeri</p>
            {[
              { label: "Imyitozo (Tests)", sub: `${doneTests}/20 byarangiye`, href: "/levels?test=tests", color: "#4f46e5", icon: "/assets/images/icons/Document.svg" },
              { label: "Amagambo", sub: `${doneKeywords}/4 byarangiye`, href: "/levels?test=keywords", color: "#10b981", icon: "/assets/images/icons/Notification.svg" },
            ].map((item, i) => (
              <Link key={item.href} href={item.href} className="quick-nav-item" style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 18px", textDecoration: "none", borderTop: i > 0 ? "1px solid #f1f5f9" : "none" }}>
                <div style={{ width: 34, height: 34, borderRadius: 8, background: `${item.color}12`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Image src={item.icon} alt="" width={17} height={17} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: "1.3rem", fontWeight: 600, color: "#0f172a" }}>{item.label}</p>
                  <p style={{ fontSize: "1.1rem", color: "#94a3b8" }}>{item.sub}</p>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
              </Link>
            ))}
          </div>

          {/* Book resource */}
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "18px 20px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 9, background: "#f8fafc", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                </svg>
              </div>
              <div>
                <p style={{ fontSize: "1.35rem", fontWeight: 700, color: "#0f172a" }}>Igitabo cy&apos;amategeko</p>
                <p style={{ fontSize: "1.15rem", color: "#94a3b8", marginTop: 2 }}>y&apos;umuhanda</p>
              </div>
            </div>
            <p style={{ fontSize: "1.2rem", color: "#64748b", lineHeight: 1.55, marginBottom: 14 }}>
              Soma igitabo cy&apos;amategeko y&apos;umuhanda kugirango wimenye neza amategeko.
            </p>
            <a href="#" className="book-link" style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: "1.3rem", fontWeight: 600, color: "#4f46e5", textDecoration: "none" }}>
              Gufungura
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
            </a>
          </div>
        </aside>
      </div>

      <style>{`
        .app-grid {
          display: grid;
          grid-template-columns: 256px 1fr 256px;
          grid-template-areas: "sidebar main right";
          gap: 20px;
        }
        .app-sidebar { grid-area: sidebar; }
        .app-right   { grid-area: right; }
        main         { grid-area: main; }

        /* Hover states */
        .prog-card        { transition: border-color 0.15s, box-shadow 0.15s; }
        .prog-card:hover  { border-color: #c7d2fe !important; box-shadow: 0 4px 16px rgba(79,70,229,0.08) !important; }
        .cta-btn:hover    { background: #4338ca !important; }
        .h-nav-link:hover { background: #f1f5f9 !important; color: #0f172a !important; }
        .h-logout:hover   { background: #fff1f2 !important; border-color: #fda4af !important; }
        .sidebar-logout:hover { background: #fff1f2 !important; }
        .support-link:hover   { background: #f8fafc !important; }
        .quick-nav-item:hover { background: #f8fafc !important; }
        .book-link:hover      { color: #4338ca !important; }

        @media (max-width: 1200px) {
          .app-grid {
            grid-template-columns: 230px 1fr;
            grid-template-areas: "sidebar main" "sidebar right";
          }
          .h-user-pill { display: none !important; }
        }
        @media (max-width: 768px) {
          .app-grid {
            grid-template-columns: 1fr !important;
            grid-template-areas: "main" "sidebar" "right" !important;
          }
          .test-cards-grid { grid-template-columns: 1fr !important; }
          .h-nav-txt    { display: none !important; }
          .h-logout-txt { display: none !important; }
          .score-officer { display: none !important; }
        }
      `}</style>
    </div>
  );
}
