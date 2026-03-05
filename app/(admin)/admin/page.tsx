import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAdminSession } from "@/lib/auth";

async function getStats() {
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3001";
  try {
    const res = await fetch(`${baseUrl}/api/admin/stats`, { cache: "no-store" });
    return res.json();
  } catch {
    return { totalUsers: 0, totalPayments: 0, activeSubscriptions: 0, totalRevenue: 0 };
  }
}

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/users", label: "Abakoresha", icon: "👥" },
  { href: "/admin/payments", label: "Payments", icon: "💳" },
];

export default async function AdminDashboard() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const stats = await getStats();

  const cards = [
    { label: "Abakoresha bose", value: stats.totalUsers, color: "#5d6eff", bg: "#eeefff" },
    { label: "Payments zose", value: stats.totalPayments, color: "#0ad4c8", bg: "#e6f9f8" },
    { label: "Subscriptions zifite", value: stats.activeSubscriptions, color: "#9b59b6", bg: "#f3e8ff" },
    { label: "Revenue (RWF)", value: Number(stats.totalRevenue).toLocaleString(), color: "#e67e22", bg: "#fff3e0" },
  ];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#1a1d2e", display: "flex", fontFamily: "inherit" }}>
      <style>{`
        .adm-nav-link:hover { background: #2a2d4a !important; color: #fff !important; }
        .adm-logout:hover { color: #fc8181 !important; }
        .adm-quick-link:hover { border-color: #5d6eff !important; }
      `}</style>
      {/* Sidebar */}
      <aside style={{ width: 240, backgroundColor: "#12152a", borderRight: "1px solid #2a2d4a", display: "flex", flexDirection: "column", padding: 24, position: "fixed", height: "100vh", top: 0 }}>
        <div style={{ marginBottom: 32 }}>
          <Image src="/assets/images/icons/full logo.svg" alt="RoadReady" width={120} height={42} style={{ objectFit: "contain", filter: "brightness(0) invert(1)" }} />
          <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.4)", marginTop: 6 }}>Admin Panel</p>
        </div>
        <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
          {navItems.map(item => (
            <Link key={item.href} href={item.href} className="adm-nav-link"
              style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 10, color: "rgba(255,255,255,0.7)", fontSize: "1.4rem", transition: "0.2s", textDecoration: "none" }}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <form action="/api/admin/logout" method="POST">
          <button className="adm-logout"
            style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", borderRadius: 10, color: "rgba(255,255,255,0.4)", fontSize: "1.4rem", width: "100%", cursor: "pointer", transition: "0.2s" }}
          >
            🚪 Sohoka
          </button>
        </form>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, marginLeft: 240, padding: 32, overflowY: "auto" }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: "2.4rem", fontWeight: 700, color: "#fff" }}>Dashboard</h1>
          <p style={{ fontSize: "1.3rem", color: "rgba(255,255,255,0.45)", marginTop: 4 }}>Ikinyamakuru cy&apos;imicungire ya RoadReady</p>
        </div>

        {/* Stats grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 28 }}>
          {cards.map(card => (
            <div key={card.label} style={{ backgroundColor: "#12152a", border: "1px solid #2a2d4a", borderRadius: 16, padding: 20 }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: card.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                <span style={{ fontSize: 22 }}>{card.label.includes("Revenue") ? "💰" : card.label.includes("Sub") ? "✅" : card.label.includes("Payment") ? "💳" : "👥"}</span>
              </div>
              <p style={{ fontSize: "2.8rem", fontWeight: 700, color: card.color }}>{card.value}</p>
              <p style={{ fontSize: "1.3rem", color: "rgba(255,255,255,0.45)", marginTop: 4 }}>{card.label}</p>
            </div>
          ))}
        </div>

        {/* Quick links */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
          {[
            { href: "/admin/users", label: "Gucunga Abakoresha", desc: "Reba kandi ucunge abakoresha bose", icon: "👥" },
            { href: "/admin/payments", label: "Payments Zose", desc: "Reba amateka ya payments yose", icon: "💳" },
          ].map(item => (
            <Link key={item.href} href={item.href} className="adm-quick-link"
              style={{ display: "block", backgroundColor: "#12152a", border: "1px solid #2a2d4a", borderRadius: 16, padding: 24, textDecoration: "none", transition: "0.2s" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <span style={{ fontSize: 28 }}>{item.icon}</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
              </div>
              <p style={{ fontSize: "1.6rem", fontWeight: 600, color: "#fff" }}>{item.label}</p>
              <p style={{ fontSize: "1.3rem", color: "rgba(255,255,255,0.4)", marginTop: 4 }}>{item.desc}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
