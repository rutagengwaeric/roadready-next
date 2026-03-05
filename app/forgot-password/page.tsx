"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setError("");
    setStatus("loading");
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("sent");
      } else {
        const data = await res.json();
        setError(data.error || "Hari ikibazo. Gerageza nanone.");
        setStatus("error");
      }
    } catch {
      setError("Hari ikibazo. Gerageza nanone.");
      setStatus("error");
    }
  }

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
              <rect x="3" y="11" width="18" height="11" rx="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <h2 style={{ fontSize: "2.8rem", fontWeight: 900, lineHeight: 1.2, marginBottom: 12 }}>
            Wibagiwe<br />Ijambo ry&apos;Ibanga?
          </h2>
          <p style={{ fontSize: "1.35rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, maxWidth: "34ch", margin: "0 auto" }}>
            Ntibaye ikibazo. Twohereza link yo guhindura ijambo ry&apos;ibanga kuri imeri yawe.
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
          <div style={{ width: "100%", maxWidth: 400 }}>

            {status === "sent" ? (
              <div style={{ textAlign: "center" }}>
                <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#ecfdf5", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 2L11 13"/><path d="M22 2L15 22 11 13 2 9l20-7z"/>
                  </svg>
                </div>
                <h1 style={{ fontSize: "2.6rem", fontWeight: 800, color: "#0f172a", marginBottom: 10 }}>Reba Imeri Yawe</h1>
                <p style={{ fontSize: "1.4rem", color: "#64748b", lineHeight: 1.7, marginBottom: 28 }}>
                  Twoherereje link yo guhindura ijambo ry&apos;ibanga kuri <strong style={{ color: "#0f172a" }}>{email}</strong>. Reba email yawe (nanone mu spam).
                </p>
                <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 10, padding: "14px 18px", fontSize: "1.3rem", color: "#475569", marginBottom: 28, textAlign: "left" }}>
                  <strong style={{ color: "#334155" }}>Ntabwo ubonye?</strong><br />
                  Reba spam folder. Link igumana isaha 1.
                </div>
                <Link href="/login" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#4f46e5", color: "#fff", borderRadius: 10, padding: "14px 28px", fontSize: "1.4rem", fontWeight: 700, textDecoration: "none" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
                  </svg>
                  Subira kwinjira
                </Link>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: 28 }}>
                  <h1 style={{ fontSize: "2.6rem", fontWeight: 800, color: "#0f172a", marginBottom: 6, lineHeight: 1.1 }}>Subira Konti Yawe</h1>
                  <p style={{ fontSize: "1.4rem", color: "#64748b" }}>Andika imeri yawe tukohereze link yo guhindura ijambo ry&apos;ibanga</p>
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
                      Imeri (Email)
                    </label>
                    <div style={{ position: "relative" }}>
                      <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", display: "flex", alignItems: "center", pointerEvents: "none" }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                        </svg>
                      </span>
                      <input
                        type="email"
                        placeholder="imeri@example.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="auth-input"
                        style={{ paddingLeft: 42 }}
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="auth-submit-btn"
                    style={{ height: 52, borderRadius: 10, border: "none", background: "#4f46e5", color: "#fff", fontSize: "1.5rem", fontWeight: 700, cursor: status === "loading" ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, opacity: status === "loading" ? 0.7 : 1, transition: "opacity 0.15s, background 0.15s", width: "100%" }}
                  >
                    {status === "loading" ? (
                      <span style={{ width: 20, height: 20, border: "2.5px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />
                    ) : (
                      <>
                        Ohereza Link
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 2L11 13"/><path d="M22 2L15 22 11 13 2 9l20-7z"/>
                        </svg>
                      </>
                    )}
                  </button>
                </form>

                <p style={{ marginTop: 24, textAlign: "center", fontSize: "1.3rem", color: "#64748b" }}>
                  Wibukanye?{" "}
                  <Link href="/login" style={{ color: "#4f46e5", fontWeight: 700, textDecoration: "none" }} className="auth-link">Subira kwinjira</Link>
                </p>
              </>
            )}
          </div>
        </div>

        <footer style={{ textAlign: "center", padding: "16px 24px", borderTop: "1px solid #f1f5f9" }}>
          <p style={{ fontSize: "1.2rem", color: "#cbd5e1" }}>&copy; {new Date().getFullYear()} RoadReady &mdash; A Binary Solutions Company</p>
        </footer>
      </div>

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
        .auth-submit-btn:hover:not(:disabled) { background: #4338ca !important; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
