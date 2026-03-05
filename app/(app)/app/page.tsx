import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getUser, hasActivePayment } from "@/lib/auth";
import prisma from "@/lib/prisma";

export default async function AppDashboard() {
  const user = await getUser();
  if (!user) redirect("/login");

  const paid = await hasActivePayment(user.id);
  if (!paid) redirect("/payment");

  const payment = await prisma.payment.findFirst({
    where: { userId: user.id, paymentExpirationDate: { gte: new Date() } },
    orderBy: { paymentExpirationDate: "desc" },
  });

  const testResults = await prisma.testResult.findMany({ where: { userId: user.id } });
  const keywordResults = await prisma.keywordResult.findMany({ where: { userId: user.id } });

  const doneTests = testResults.length;
  const doneKeywords = keywordResults.length;

  const expiresIn = payment
    ? Math.ceil((new Date(payment.paymentExpirationDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : 0;

  const expiryStr = payment
    ? new Date(payment.paymentExpirationDate).toLocaleDateString("fr-RW", { day: "2-digit", month: "long", year: "numeric" })
    : "";

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f9f5ff", display: "flex", flexDirection: "column" }}>
      {/* TOP BAR */}
      <div style={{ backgroundColor: "#fff", borderBottom: "1px solid #eee", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 16px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Image src="/assets/images/icons/full logo.svg" alt="RoadReady" width={110} height={40} style={{ objectFit: "contain" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: "1.3rem", color: "rgba(32,40,66,0.65)" }}>
              Muraho, <strong style={{ color: "#202842" }}>{user.username}</strong>
            </span>
            <form action="/api/auth/logout" method="POST">
              <button style={{ fontSize: "1.2rem", color: "rgba(32,40,66,0.5)", transition: "0.2s" }} onMouseOver={e => (e.currentTarget.style.color = "#e53e3e")} onMouseOut={e => (e.currentTarget.style.color = "rgba(32,40,66,0.5)")}>
                Sohoka
              </button>
            </form>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 640, margin: "0 auto", padding: "24px 16px", flex: 1, width: "100%" }}>
        {/* Plan card */}
        {payment && (
          <div style={{ background: "#fff", border: "1px solid #e8e4ff", borderRadius: 12, padding: 16, marginBottom: 20, boxShadow: "0 4px 14px rgba(0,0,0,0.06)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
              <span style={{ background: "#d2d7ff", color: "#5d6eff", padding: "4px 10px", borderRadius: 5, fontWeight: 600, fontSize: "1.5rem", border: "1px solid #4f75ff" }}>
                Subscription
              </span>
              {expiresIn <= 3 && (
                <Link href="/payment" style={{ background: "#fff7ed", color: "#c05621", border: "1px solid #fbd38d", borderRadius: 6, padding: "4px 10px", fontSize: "1.2rem", fontWeight: 600 }}>
                  Ongera Subscription
                </Link>
              )}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <span style={{ fontSize: "1.3rem", color: "rgba(32,40,66,0.6)" }}>Iminsi isigaye</span>
              <span style={{ fontSize: "1.3rem", color: "rgba(32,40,66,0.6)" }}>Irangira kuwa</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <strong style={{ fontSize: "2rem", color: "#5d6eff" }}>{expiresIn > 0 ? `${expiresIn} Iminsi` : "Irangiye uyu munsi"}</strong>
              <span style={{ fontSize: "1.4rem", color: "#5d6eff" }}>{expiryStr}</span>
            </div>

            {/* Progress */}
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: "1.2rem", fontWeight: 500 }}>Ibizami</span>
              <span style={{ fontSize: "1.2rem", color: "#5d6eff" }}>{doneTests} / 20</span>
            </div>
            <div className="progress-bar" style={{ marginBottom: 12 }}>
              <div className="line" style={{ width: `${(doneTests / 20) * 100}%` }} />
              <div className="circle" style={{ left: `calc(${(doneTests / 20) * 100}% - 9px)`, right: "unset" }} />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: "1.2rem", fontWeight: 500 }}>Amagambo</span>
              <span style={{ fontSize: "1.2rem", color: "#5d6eff" }}>{doneKeywords} / 4</span>
            </div>
            <div className="progress-bar">
              <div className="line" style={{ width: `${(doneKeywords / 4) * 100}%` }} />
              <div className="circle" style={{ left: `calc(${(doneKeywords / 4) * 100}% - 9px)`, right: "unset" }} />
            </div>
          </div>
        )}

        {/* Test type cards */}
        <h2 style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: 16, color: "#202842" }}>Hitamo Ikizami</h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 16 }}>
          {/* Ibizami card */}
          <Link href="/levels?test=tests" style={{ display: "block", background: "#fff", border: "1px solid #e8e4ff", borderRadius: 12, padding: 20, boxShadow: "0 4px 14px rgba(0,0,0,0.04)", transition: "0.2s", textDecoration: "none", color: "inherit" }}
            onMouseOver={e => { (e.currentTarget as HTMLElement).style.borderColor = "#5d6eff"; (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 20px rgba(93,110,255,0.12)"; }}
            onMouseOut={e => { (e.currentTarget as HTMLElement).style.borderColor = "#e8e4ff"; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 14px rgba(0,0,0,0.04)"; }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: "#eeefff", display: "grid", placeItems: "center" }}>
                <Image src="/assets/images/icons/Document.svg" alt="" width={24} height={24} />
              </div>
              <h3 style={{ fontSize: "1.8rem", fontWeight: 700, color: "#202842" }}>Ibizami</h3>
            </div>
            <p style={{ fontSize: "1.3rem", color: "rgba(32,40,66,0.6)", marginBottom: 14 }}>Amabwiriza y&apos;umuhanda — ibizami 20</p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <span style={{ fontSize: "1.2rem", color: "#5d6eff", fontWeight: 600 }}>{doneTests}/20 bizami birangiye</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5d6eff" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
            </div>
            <div className="progress-bar">
              <div className="line" style={{ width: `${(doneTests / 20) * 100}%` }} />
            </div>
          </Link>

          {/* Amagambo card */}
          <Link href="/levels?test=keywords" style={{ display: "block", background: "#fff", border: "1px solid #e8e4ff", borderRadius: 12, padding: 20, boxShadow: "0 4px 14px rgba(0,0,0,0.04)", transition: "0.2s", textDecoration: "none", color: "inherit" }}
            onMouseOver={e => { (e.currentTarget as HTMLElement).style.borderColor = "#5d6eff"; (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 20px rgba(93,110,255,0.12)"; }}
            onMouseOut={e => { (e.currentTarget as HTMLElement).style.borderColor = "#e8e4ff"; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 14px rgba(0,0,0,0.04)"; }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: "#e6f9f8", display: "grid", placeItems: "center" }}>
                <Image src="/assets/images/icons/Notification.svg" alt="" width={24} height={24} />
              </div>
              <h3 style={{ fontSize: "1.8rem", fontWeight: 700, color: "#202842" }}>Amagambo</h3>
            </div>
            <p style={{ fontSize: "1.3rem", color: "rgba(32,40,66,0.6)", marginBottom: 14 }}>Vocabulaire — ibizami 4</p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <span style={{ fontSize: "1.2rem", color: "#0ad4c8", fontWeight: 600 }}>{doneKeywords}/4 bizami birangiye</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0ad4c8" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
            </div>
            <div className="progress-bar" style={{ backgroundColor: "#a0e8e4" }}>
              <div className="line" style={{ width: `${(doneKeywords / 4) * 100}%`, backgroundColor: "#0ad4c8" }} />
            </div>
          </Link>
        </div>

        {/* Renew warning */}
        {expiresIn > 0 && expiresIn <= 3 && (
          <Link href="/payment" style={{ display: "block", marginTop: 20, background: "#fff7ed", border: "1px solid #fbd38d", borderRadius: 10, padding: 16, textDecoration: "none" }}>
            <p style={{ fontWeight: 700, color: "#c05621", fontSize: "1.5rem" }}>Subscription yawe irimo kurangira!</p>
            <p style={{ color: "#dd6b20", fontSize: "1.3rem", marginTop: 4 }}>Kanda hano kugirango uyongere →</p>
          </Link>
        )}
      </div>

      <footer className="app-footer">
        <p>&copy; Copyright 2025 RoadReady - A Binary Solutions Company.</p>
        <p>Designed By ClaroCreatives</p>
      </footer>
    </div>
  );
}
