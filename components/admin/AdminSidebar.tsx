"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navItems = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    href: "/admin/users",
    label: "Users",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    href: "/admin/payments",
    label: "Payments",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
  },
  {
    href: "/admin/tests",
    label: "Tests",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
];


import { useState, useEffect } from "react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar on route change on mobile
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <>
      {/* Mobile Header / Hamburger */}
      <div className="mobile-header" style={{
        display: "none", alignItems: "center", justifyContent: "space-between",
        padding: "16px 20px", background: "#0f1120", borderBottom: "1px solid rgba(255,255,255,0.06)",
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 60,
      }}>
        <Image src="/assets/images/icons/full logo.svg" alt="RoadReady" width={100} height={36} style={{ filter: "brightness(0) invert(1)", objectFit: "contain" }} />
        <button onClick={() => setIsOpen(!isOpen)} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", padding: 4 }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {isOpen ? (
              <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
            ) : (
              <><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></>
            )}
          </svg>
        </button>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 45 }}
          className="sidebar-overlay"
        />
      )}

      <aside className={`admin-sidebar ${isOpen ? "open" : ""}`} style={{
        backgroundColor: "#0f1120",
        borderRight: "1px solid rgba(255,255,255,0.06)",
        display: "flex", flexDirection: "column",
        position: "fixed", height: "100vh", top: 0, left: 0,
        zIndex: 50, transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}>
        {/* Logo */}
        <div style={{ padding: "24px 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <Image
            src="/assets/images/icons/full logo.svg"
            alt="RoadReady"
            width={120} height={42}
            style={{ objectFit: "contain", filter: "brightness(0) invert(1)" }}
          />
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            marginTop: 10, background: "rgba(93,110,255,0.15)",
            border: "1px solid rgba(93,110,255,0.3)",
            borderRadius: 6, padding: "3px 10px",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#5d6eff", display: "inline-block" }} />
            <span style={{ fontSize: "1.1rem", color: "#8b9eff", fontWeight: 600, letterSpacing: "0.05em" }}>ADMIN PANEL</span>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: 2 }}>
          <p style={{ fontSize: "1rem", fontWeight: 700, color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", textTransform: "uppercase", padding: "0 8px", marginBottom: 8 }}>
            Menu
          </p>
          {navItems.map(item => {
            const active = isActive(item.href);
            return (
              <Link key={item.href} href={item.href} style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "11px 14px", borderRadius: 10,
                color: active ? "#fff" : "rgba(255,255,255,0.5)",
                fontSize: "1.4rem", fontWeight: active ? 600 : 400,
                textDecoration: "none", transition: "all 0.15s",
                background: active ? "rgba(93,110,255,0.18)" : "transparent",
                border: active ? "1px solid rgba(93,110,255,0.25)" : "1px solid transparent",
              }}>
                <span style={{ color: active ? "#8b9eff" : "rgba(255,255,255,0.35)", flexShrink: 0 }}>
                  {item.icon}
                </span>
                {item.label}
                {active && (
                  <span style={{ marginLeft: "auto", width: 6, height: 6, borderRadius: "50%", background: "#5d6eff", flexShrink: 0 }} />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div style={{ padding: "12px 12px 20px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <form action="/api/admin/logout" method="POST">
            <button style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "11px 14px", borderRadius: 10,
              color: "rgba(255,255,255,0.35)", fontSize: "1.4rem",
              width: "100%", cursor: "pointer", transition: "all 0.15s",
              border: "1px solid transparent",
            }}
              onMouseOver={e => {
                (e.currentTarget as HTMLButtonElement).style.color = "#fc8181";
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(252,129,129,0.08)";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(252,129,129,0.2)";
              }}
              onMouseOut={e => {
                (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.35)";
                (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "transparent";
              }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Logout
            </button>
          </form>
        </div>
      </aside>

      <style>{`
        .admin-sidebar { width: 240px; transform: translateX(0); }
        
        @media (max-width: 1024px) {
          .mobile-header { display: flex !important; }
          .admin-sidebar { transform: translateX(-100%); }
          .admin-sidebar.open { transform: translateX(0); }
        }
      `}</style>
    </>
  );
}
