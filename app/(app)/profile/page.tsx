"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profileMsg, setProfileMsg] = useState("");
  const [profileErr, setProfileErr] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPwd, setShowCurrentPwd] = useState(false);
  const [showNewPwd, setShowNewPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [pwdMsg, setPwdMsg] = useState("");
  const [pwdErr, setPwdErr] = useState("");
  const [savingPwd, setSavingPwd] = useState(false);

  useEffect(() => { fetchProfile(); }, []);

  async function fetchProfile() {
    try {
      const res = await fetch("/api/user/profile");
      if (!res.ok) { if (res.status === 401) router.push("/login"); return; }
      const data = await res.json();
      setUser(data);
      setUsername(data.username || "");
      setEmail(data.email || "");
      setPhone(data.phone || "");
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }

  async function handleProfileUpdate(e: React.SyntheticEvent) {
    e.preventDefault();
    setSavingProfile(true); setProfileMsg(""); setProfileErr("");
    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, phone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Byanze, ongera ugeregeze");
      setProfileMsg("Umwirondoro wawe wahinduwe neza!");
      fetchProfile();
    } catch (err: any) { setProfileErr(err.message); }
    finally { setSavingProfile(false); }
  }

  async function handlePasswordUpdate(e: React.SyntheticEvent) {
    e.preventDefault();
    setSavingPwd(true); setPwdMsg(""); setPwdErr("");
    if (newPassword !== confirmPassword) {
      setPwdErr("Ijambo ry'ibanga rishya ntirihura. Ongera urebe.");
      setSavingPwd(false); return;
    }
    try {
      const res = await fetch("/api/user/password", {
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Habaye ikibazo");
      setPwdMsg("Ijambo ry'ibanga ryahinduwe neza!");
      setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
    } catch (err: any) { setPwdErr(err.message); }
    finally { setSavingPwd(false); }
  }

  const EyeIcon = ({ open }: { open: boolean }) => open ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22"/>
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  );

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 36, height: 36, borderRadius: "50%", border: "3px solid #e2e8f0", borderTopColor: "#4f46e5", animation: "spin 0.7s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const initial = user?.username?.charAt(0).toUpperCase() ?? "?";

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "inherit", display: "flex", flexDirection: "column" }}>

      {/* ── HEADER ── */}
      <header style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", position: "sticky", top: 0, zIndex: 40 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          <Link href="/app" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", color: "#64748b", fontSize: "1.3rem", fontWeight: 500 }} className="back-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
            </svg>
            Subira inyuma
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#4f46e5", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontWeight: 700, fontSize: "1.3rem" }}>{initial}</span>
            </div>
            <span style={{ fontSize: "1.3rem", fontWeight: 600, color: "#0f172a" }} className="profile-name">{user?.username}</span>

            <div style={{ width: 1, height: 20, background: "#e2e8f0" }} />

            <form action="/api/auth/logout" method="POST">
              <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 12px", borderRadius: 8, border: "1px solid #fecdd3", background: "#fff5f5", color: "#e11d48", fontSize: "1.3rem", fontWeight: 600, cursor: "pointer" }} className="logout-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                <span className="logout-txt">Gusohoka</span>
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* ── BODY ── */}
      <div style={{ flex: 1, maxWidth: 1100, margin: "0 auto", width: "100%", padding: "28px 24px 48px", display: "grid", gap: 20, alignItems: "start" }} className="profile-grid">

        {/* ── LEFT: FORMS ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Profile info */}
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "24px 28px" }}>
            <div style={{ marginBottom: 20, paddingBottom: 16, borderBottom: "1px solid #f1f5f9" }}>
              <h2 style={{ fontSize: "1.7rem", fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>Umwirondoro wawe</h2>
              <p style={{ fontSize: "1.25rem", color: "#94a3b8" }}>Hindura amazina yawe cg imeyiri niba byarahindutse.</p>
            </div>

            {profileErr && (
              <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: "1.3rem", color: "#b91c1c" }}>
                {profileErr}
              </div>
            )}
            {profileMsg && (
              <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: "1.3rem", color: "#15803d" }}>
                {profileMsg}
              </div>
            )}

            <form onSubmit={handleProfileUpdate} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={labelStyle}>Amazina</label>
                <input
                  type="text" value={username} onChange={e => setUsername(e.target.value)} required
                  style={inputStyle}
                  onFocus={e => { e.target.style.borderColor = "#4f46e5"; e.target.style.boxShadow = "0 0 0 3px rgba(79,70,229,0.08)"; }}
                  onBlur={e => { e.target.style.borderColor = "#e2e8f0"; e.target.style.boxShadow = "none"; }}
                />
              </div>
              <div>
                <label style={labelStyle}>Imeyiri</label>
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)} required
                  style={inputStyle}
                  onFocus={e => { e.target.style.borderColor = "#4f46e5"; e.target.style.boxShadow = "0 0 0 3px rgba(79,70,229,0.08)"; }}
                  onBlur={e => { e.target.style.borderColor = "#e2e8f0"; e.target.style.boxShadow = "none"; }}
                />
              </div>
              <div>
                <label style={labelStyle}>Telefoni</label>
                <div style={{ display: "flex", borderRadius: 8, border: "1px solid #e2e8f0", overflow: "hidden" }}>
                  <span style={{ display: "flex", alignItems: "center", padding: "0 14px", background: "#f8fafc", borderRight: "1px solid #e2e8f0", fontSize: "1.3rem", fontWeight: 600, color: "#64748b", flexShrink: 0 }}>+250</span>
                  <input
                    type="text" value={phone.replace("250", "")} disabled
                    style={{ flex: 1, padding: "11px 14px", fontSize: "1.3rem", border: "none", outline: "none", background: "#f8fafc", color: "#94a3b8", cursor: "not-allowed" }}
                  />
                </div>
                <p style={{ fontSize: "1.1rem", color: "#cbd5e1", marginTop: 5 }}>Numero ya telefoni ntishobora guhindurwa.</p>
              </div>
              <div>
                <button type="submit" disabled={savingProfile} style={{ ...btnPrimary, opacity: savingProfile ? 0.7 : 1 }}>
                  {savingProfile ? "Tegereza..." : "Bika impinduka"}
                </button>
              </div>
            </form>
          </div>

          {/* Password */}
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "24px 28px" }}>
            <div style={{ marginBottom: 20, paddingBottom: 16, borderBottom: "1px solid #f1f5f9" }}>
              <h2 style={{ fontSize: "1.7rem", fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>Ijambo ry&apos;ibanga</h2>
              <p style={{ fontSize: "1.25rem", color: "#94a3b8" }}>Kugira umutekano wibuke guhindura ijambo ry&apos;ibanga buri gihe.</p>
            </div>

            {pwdErr && (
              <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: "1.3rem", color: "#b91c1c" }}>
                {pwdErr}
              </div>
            )}
            {pwdMsg && (
              <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: "1.3rem", color: "#15803d" }}>
                {pwdMsg}
              </div>
            )}

            <form onSubmit={handlePasswordUpdate} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {([
                { label: "Ijambo ry'ibanga ryicyo gihe", value: currentPassword, setter: setCurrentPassword, show: showCurrentPwd, toggle: () => setShowCurrentPwd(p => !p) },
                { label: "Ijambo ry'ibanga rishya", value: newPassword, setter: setNewPassword, show: showNewPwd, toggle: () => setShowNewPwd(p => !p) },
                { label: "Emeza iryashya", value: confirmPassword, setter: setConfirmPassword, show: showConfirmPwd, toggle: () => setShowConfirmPwd(p => !p) },
              ] as const).map(field => (
                <div key={field.label}>
                  <label style={labelStyle}>{field.label}</label>
                  <div style={{ position: "relative" }}>
                    <input
                      type={field.show ? "text" : "password"}
                      value={field.value}
                      onChange={e => (field.setter as (v: string) => void)(e.target.value)}
                      required
                      style={{ ...inputStyle, paddingRight: 44 }}
                      onFocus={e => { e.target.style.borderColor = "#4f46e5"; e.target.style.boxShadow = "0 0 0 3px rgba(79,70,229,0.08)"; }}
                      onBlur={e => { e.target.style.borderColor = "#e2e8f0"; e.target.style.boxShadow = "none"; }}
                    />
                    <button
                      type="button" onClick={field.toggle}
                      style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94a3b8", padding: 6, display: "flex", alignItems: "center" }}
                    >
                      <EyeIcon open={field.show} />
                    </button>
                  </div>
                </div>
              ))}
              <div>
                <button type="submit" disabled={savingPwd || !currentPassword || !newPassword} style={{ ...btnSecondary, opacity: (savingPwd || !currentPassword || !newPassword) ? 0.6 : 1 }}>
                  {savingPwd ? "Tegereza..." : "Hindura ijambo ry'ibanga"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* ── RIGHT: PROFILE CARD + STATS ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

          {/* Identity card */}
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20, paddingBottom: 18, borderBottom: "1px solid #f1f5f9" }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#4f46e5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ color: "#fff", fontWeight: 700, fontSize: "2.2rem" }}>{initial}</span>
              </div>
              <div style={{ minWidth: 0 }}>
                <p style={{ fontSize: "1.7rem", fontWeight: 700, color: "#0f172a", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user?.username}</p>
                <p style={{ fontSize: "1.2rem", color: "#94a3b8", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user?.email}</p>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", background: "#f8fafc", borderRadius: 8 }}>
                <span style={{ fontSize: "1.2rem", color: "#64748b", fontWeight: 500 }}>Telefoni</span>
                <span style={{ fontSize: "1.3rem", color: "#0f172a", fontWeight: 600 }}>{user?.phone}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", background: "#f8fafc", borderRadius: 8 }}>
                <span style={{ fontSize: "1.2rem", color: "#64748b", fontWeight: 500 }}>Subscription</span>
                {user?.hasActiveSubscription ? (
                  <span style={{ fontSize: "1.2rem", fontWeight: 700, color: "#059669", background: "#ecfdf5", border: "1px solid #a7f3d0", padding: "2px 10px", borderRadius: 20 }}>Ifite agaciro</span>
                ) : (
                  <span style={{ fontSize: "1.2rem", fontWeight: 700, color: "#dc2626", background: "#fef2f2", border: "1px solid #fecaca", padding: "2px 10px", borderRadius: 20 }}>Nta subscription</span>
                )}
              </div>
              {user?.hasActiveSubscription && user?.subscriptionEnd && (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", background: "#f8fafc", borderRadius: 8 }}>
                  <span style={{ fontSize: "1.2rem", color: "#64748b", fontWeight: 500 }}>Irangira</span>
                  <span style={{ fontSize: "1.2rem", color: "#0f172a", fontWeight: 600 }}>{new Date(user.subscriptionEnd).toLocaleDateString("fr-RW")}</span>
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "20px 24px" }}>
            <p style={{ fontSize: "1.1rem", fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 14 }}>Imibare y&apos;ibizami</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div style={{ background: "#f8fafc", border: "1px solid #f1f5f9", borderRadius: 10, padding: "16px", textAlign: "center" }}>
                <p style={{ fontSize: "3rem", fontWeight: 800, color: "#4f46e5", lineHeight: 1 }}>{user?.totalTests ?? 0}</p>
                <p style={{ fontSize: "1.15rem", color: "#94a3b8", marginTop: 6, fontWeight: 500 }}>Ibizami</p>
              </div>
              <div style={{ background: "#f8fafc", border: "1px solid #f1f5f9", borderRadius: 10, padding: "16px", textAlign: "center" }}>
                <p style={{ fontSize: "3rem", fontWeight: 800, color: "#10b981", lineHeight: 1 }}>{user?.totalKeywords ?? 0}</p>
                <p style={{ fontSize: "1.15rem", color: "#94a3b8", marginTop: 6, fontWeight: 500 }}>Amagambo</p>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, overflow: "hidden" }}>
            {[
              { label: "Subira kuri Dashboard", href: "/app", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg> },
              { label: "Gura subscription", href: "/payment", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg> },
              { label: "Tangira ibizami", href: "/levels", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> },
            ].map((item, i) => (
              <Link key={item.href} href={item.href} className="quick-link" style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 18px", textDecoration: "none", borderTop: i > 0 ? "1px solid #f1f5f9" : "none" }}>
                <span style={{ color: "#94a3b8" }}>{item.icon}</span>
                <span style={{ fontSize: "1.3rem", fontWeight: 500, color: "#334155", flex: 1 }}>{item.label}</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .profile-grid {
          grid-template-columns: 1fr 320px;
          gap: 20px;
        }
        .back-btn:hover { color: #4f46e5 !important; }
        .logout-btn:hover { background: #fff1f2 !important; }
        .quick-link:hover { background: #f8fafc !important; }
        .quick-link:hover span:last-child { color: #94a3b8 !important; }
        @media (max-width: 768px) {
          .profile-grid { grid-template-columns: 1fr !important; }
          .profile-name { display: none !important; }
          .logout-txt { display: none !important; }
        }
      `}</style>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block", fontSize: "1.25rem", fontWeight: 600, color: "#334155", marginBottom: 7,
};

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "11px 14px", fontSize: "1.3rem", color: "#0f172a",
  border: "1px solid #e2e8f0", borderRadius: 8, outline: "none",
  background: "#fff", transition: "border-color 0.15s, box-shadow 0.15s",
  boxSizing: "border-box",
};

const btnPrimary: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", gap: 6,
  padding: "10px 20px", borderRadius: 8, border: "none",
  background: "#4f46e5", color: "#fff", fontSize: "1.35rem", fontWeight: 600, cursor: "pointer",
};

const btnSecondary: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", gap: 6,
  padding: "10px 20px", borderRadius: 8, border: "1px solid #e2e8f0",
  background: "#f8fafc", color: "#0f172a", fontSize: "1.35rem", fontWeight: 600, cursor: "pointer",
};
