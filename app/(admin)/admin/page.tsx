import { redirect } from "next/navigation";
import Link from "next/link";
import { getAdminSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import AdminSidebar from "@/components/admin/AdminSidebar";

async function getStats() {
  const now = new Date();
  const [totalUsers, totalPayments, activeSubscriptions, revenue] = await Promise.all([
    prisma.user.count(),
    prisma.payment.count(),
    prisma.payment.count({ where: { paymentExpirationDate: { gte: now } } }),
    prisma.payment.aggregate({ _sum: { amountPaid: true } }),
  ]);
  return {
    totalUsers,
    totalPayments,
    activeSubscriptions,
    totalRevenue: Number(revenue._sum.amountPaid ?? 0),
  };
}

export default async function AdminDashboard() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const stats = await getStats();

  const cards = [
    {
      label: "Total Users", value: stats.totalUsers, color: "#818cf8", bg: "rgba(93,110,255,0.12)", border: "rgba(93,110,255,0.2)",
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
    },
    {
      label: "Total Payments", value: stats.totalPayments, color: "#34d399", bg: "rgba(52,211,153,0.1)", border: "rgba(52,211,153,0.2)",
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>
    },
    {
      label: "Active Subscriptions", value: stats.activeSubscriptions, color: "#c084fc", bg: "rgba(192,132,252,0.1)", border: "rgba(192,132,252,0.2)",
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
    },
    {
      label: "Revenue (RWF)", value: stats.totalRevenue.toLocaleString(), color: "#fbbf24", bg: "rgba(251,191,36,0.1)", border: "rgba(251,191,36,0.2)",
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
    },
  ];

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

        {/* Stats grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 32 }}>
          {cards.map(card => (
            <div key={card.label} style={{
              background: "rgba(255,255,255,0.03)",
              border: `1px solid ${card.border}`,
              borderRadius: 16, padding: "20px 22px",
              transition: "0.2s",
            }}>
              <div style={{
                width: 46, height: 46, borderRadius: 12,
                background: card.bg, border: `1px solid ${card.border}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 16,
              }}>
                {card.icon}
              </div>
              <p style={{ fontSize: "3rem", fontWeight: 800, color: card.color, lineHeight: 1 }}>{card.value}</p>
              <p style={{ fontSize: "1.3rem", color: "rgba(255,255,255,0.4)", marginTop: 6 }}>{card.label}</p>
            </div>
          ))}
        </div>

        {/* Quick links */}
        <p style={{ fontSize: "1.2rem", fontWeight: 700, color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>
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
