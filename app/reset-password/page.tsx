"use client";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) setError("Token irashiwe. Saba link nshya.");
  }, [token]);

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setError("");
    if (password !== confirm) return setError("Amagambo y'ibanga ntahwana.");
    if (password.length < 6) return setError("Ijambo ry'ibanga rigomba kuba nibura inyuguti 6.");
    setStatus("loading");
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Hari ikibazo. Gerageza nanone.");
        setStatus("error");
      } else {
        setStatus("success");
        setTimeout(() => router.push("/login"), 3000);
      }
    } catch {
      setError("Hari ikibazo. Gerageza nanone.");
      setStatus("error");
    }
  }

  const strength = password.length >= 10 ? 3 : password.length >= 8 ? 2 : password.length >= 6 ? 1 : 0;
  const strengthColors = ["#e2e8f0", "#ef4444", "#f59e0b", "#10b981"];
  const strengthLabels = ["", "Ngufi cyane", "Nziza", "Kwa ngombwa"];

  return (
    <div style={{ width: "100%", maxWidth: 400 }}>

      {status === "success" ? (
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#ecfdf5", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <h1 style={{ fontSize: "2.6rem", fontWeight: 800, color: "#0f172a", marginBottom: 10 }}>Byagenze Neza!</h1>
          <p style={{ fontSize: "1.4rem", color: "#64748b", lineHeight: 1.7, marginBottom: 28 }}>
            Ijambo ry&apos;ibanga ryawe ryahinduwe neza. Uzajya ku rupapuro rwo kwinjira mu masegonda make...
          </p>
          <Link href="/login" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#4f46e5", color: "#fff", borderRadius: 10, padding: "14px 28px", fontSize: "1.4rem", fontWeight: 700, textDecoration: "none" }}>
            Injira Ubu
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      ) : (
        <>
          <div style={{ marginBottom: 28 }}>
            <h1 style={{ fontSize: "2.6rem", fontWeight: 800, color: "#0f172a", marginBottom: 6, lineHeight: 1.1 }}>Hindura Ijambo</h1>
            <p style={{ fontSize: "1.4rem", color: "#64748b" }}>Shyiramo ijambo ry&apos;ibanga rishya kuri konti yawe</p>
          </div>

          {error && (
            <div style={{ marginBottom: 20, display: "flex", alignItems: "center", gap: 10, background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: "12px 16px" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <p style={{ fontSize: "1.3rem", color: "#b91c1c" }}>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>

            <div>
              <label style={{ display: "block", fontSize: "1.25rem", fontWeight: 600, color: "#334155", marginBottom: 7 }}>
                Ijambo ry&apos;ibanga rishya
              </label>
              <div style={{ position: "relative" }}>
                <span style={iconWrap}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Nibura inyuguti 6"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="auth-input"
                  style={{ paddingLeft: 42, paddingRight: 46 }}
                  required
                />
                <EyeBtn show={showPassword} toggle={() => setShowPassword(!showPassword)} />
              </div>
              {password.length > 0 && (
                <div style={{ marginTop: 8, display: "flex", gap: 6, alignItems: "center" }}>
                  {[1, 2, 3].map(i => (
                    <div key={i} style={{ flex: 1, height: 4, borderRadius: 4, background: i <= strength ? strengthColors[strength] : "#e2e8f0", transition: "background 0.2s" }} />
                  ))}
                  <span style={{ fontSize: "1.1rem", color: "#94a3b8", whiteSpace: "nowrap" }}>{strengthLabels[strength]}</span>
                </div>
              )}
            </div>

            <div>
              <label style={{ display: "block", fontSize: "1.25rem", fontWeight: 600, color: "#334155", marginBottom: 7 }}>
                Ponovera ijambo ry&apos;ibanga
              </label>
              <div style={{ position: "relative" }}>
                <span style={iconWrap}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </span>
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Ongera wandike"
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  className="auth-input"
                  style={{ paddingLeft: 42, paddingRight: 46 }}
                  required
                />
                <EyeBtn show={showConfirm} toggle={() => setShowConfirm(!showConfirm)} />
              </div>
            </div>

            <button
              type="submit"
              disabled={status === "loading" || !token}
              className="auth-submit-btn"
              style={{ marginTop: 4, height: 52, borderRadius: 10, border: "none", background: "#4f46e5", color: "#fff", fontSize: "1.5rem", fontWeight: 700, cursor: (status === "loading" || !token) ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, opacity: (status === "loading" || !token) ? 0.7 : 1, transition: "opacity 0.15s, background 0.15s", width: "100%" }}
            >
              {status === "loading" ? (
                <span style={{ width: 20, height: 20, border: "2.5px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />
              ) : (
                <>
                  Hindura Ijambo ry&apos;Ibanga
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
                  </svg>
                </>
              )}
            </button>
          </form>

          <p style={{ marginTop: 24, textAlign: "center", fontSize: "1.3rem", color: "#64748b" }}>
            <Link href="/forgot-password" style={{ color: "#4f46e5", fontWeight: 600, textDecoration: "none" }} className="auth-link">Saba link nshya</Link>
            {" "}&mdash;{" "}
            <Link href="/login" style={{ color: "#64748b", textDecoration: "none" }} className="auth-link">Subira kwinjira</Link>
          </p>
        </>
      )}

      <style>{`
        .auth-input {
          width: 100%;
          padding: 13px 14px;
          font-size: 1.35rem;
          color: #0f172a;
          border: 1.5px solid #e2e8f0;
          border-radius: 10px;
          outline: none;
          background: #f8fafc;
          font-family: inherit;
          box-sizing: border-box;
          transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;
        }
        .auth-input:focus {
          border-color: #4f46e5;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
        }
        .auth-input::placeholder { color: #cbd5e1; }
        .auth-link:hover { text-decoration: underline !important; }
        .eye-btn:hover { color: #4f46e5 !important; }
        .auth-submit-btn:hover:not(:disabled) { background: #4338ca !important; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

const iconWrap: React.CSSProperties = {
  position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)",
  display: "flex", alignItems: "center", pointerEvents: "none",
};

function EyeBtn({ show, toggle }: { show: boolean; toggle: () => void }) {
  return (
    <button
      type="button"
      onClick={toggle}
      className="eye-btn"
      style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 4, color: "#94a3b8", display: "flex", alignItems: "center", borderRadius: 6 }}
    >
      {show ? (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22" /></svg>
      ) : (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
      )}
    </button>
  );
}

export default function ResetPasswordPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex" }}>

      {/* Left brand panel */}
      <div className="hidden md:flex" style={{ width: "46%", flexShrink: 0, flexDirection: "column", alignItems: "center", justifyContent: "space-between", padding: 40, position: "relative", overflow: "hidden", background: "linear-gradient(145deg, #4f46e5 0%, #3730a3 100%)" }}>
        <div style={{ position: "absolute", top: -80, left: -80, width: 400, height: 400, borderRadius: "50%", background: "rgba(255,255,255,0.07)" }} />
        <div style={{ position: "absolute", bottom: -120, right: -80, width: 500, height: 500, borderRadius: "50%", background: "rgba(255,255,255,0.07)" }} />

        <Link href="/" style={{ alignSelf: "flex-start", position: "relative", zIndex: 10 }}>
          <Image src="/assets/images/icons/full logo.svg" alt="RoadReady" width={130} height={46} style={{ objectFit: "contain", filter: "brightness(0) invert(1)" }} />
        </Link>

        <div style={{ textAlign: "center", color: "#fff", position: "relative", zIndex: 10, padding: "0 16px" }}>
          <div style={{ width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 32px" }}>
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <h2 style={{ fontSize: "2.8rem", fontWeight: 900, lineHeight: 1.2, marginBottom: 12 }}>
            Hindura Ijambo<br />ry&apos;Ibanga Ryawe
          </h2>
          <p style={{ fontSize: "1.35rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, maxWidth: "34ch", margin: "0 auto" }}>
            Shyiramo ijambo ry&apos;ibanga rishya kandi rikomeye kugira ngo konti yawe ikomeze kuba icungwa neza.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 40, position: "relative", zIndex: 10 }}>
          {[["260+", "Batsinze"], ["450+", "Imyitozo"], ["4.9★", "Rating"]].map(([v, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <p style={{ fontSize: "2rem", fontWeight: 900, color: "#fff", lineHeight: 1 }}>{v}</p>
              <p style={{ fontSize: "1.2rem", color: "rgba(255,255,255,0.6)", marginTop: 4 }}>{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right form panel */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#fff" }}>

        {/* Mobile logo bar */}
        <div className="md:hidden" style={{ display: "flex", alignItems: "center", padding: "16px 24px", borderBottom: "1px solid #f1f5f9" }}>
          <Link href="/">
            <Image src="/assets/images/icons/full logo.svg" alt="RoadReady" width={110} height={38} style={{ objectFit: "contain" }} />
          </Link>
        </div>

        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
          <Suspense>
            <ResetPasswordForm />
          </Suspense>
        </div>

        <footer style={{ textAlign: "center", padding: "16px 24px", borderTop: "1px solid #f1f5f9" }}>
          <p style={{ fontSize: "1.2rem", color: "#cbd5e1" }}>&copy; {new Date().getFullYear()} RoadReady &mdash; A Binary Solutions Company</p>
        </footer>
      </div>
    </div>
  );
}
