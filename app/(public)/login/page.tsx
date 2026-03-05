"use client";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchParams.get("msg") === "signup_success") {
      setSuccess("Konti yawe ifunguwe! Injira ubu.");
    }
  }, [searchParams]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        const msgs: Record<string, string> = {
          user_not_found: "Nomero ya telefoni ntiboneka.",
          wrong_password: "Ijambo ry'ibanga sibyo.",
          missing_fields: "Uzuza ibibari byose.",
        };
        setError(msgs[data.error] || "Hari ikibazo. Gerageza nanone.");
      } else {
        router.push("/app");
      }
    } catch {
      setError("Hari ikibazo. Gerageza nanone.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-[400px]">
      <div className="mb-8">
        <h1 style={{ fontSize: "2.6rem", fontWeight: 800, color: "#0f172a", marginBottom: 6, lineHeight: 1.1 }}>Ikaze</h1>
        <p style={{ fontSize: "1.4rem", color: "#64748b" }}>Injira muri konti yawe ya RoadReady</p>
      </div>

      {success && (
        <div style={{ marginBottom: 20, display: "flex", alignItems: "center", gap: 10, background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: 10, padding: "12px 16px" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          <p style={{ fontSize: "1.3rem", color: "#065f46" }}>{success}</p>
        </div>
      )}

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
            Nomero ya telefoni
          </label>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", display: "flex", alignItems: "center", pointerEvents: "none" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.39 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6.09 6.09l1.87-1.87a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </span>
            <input
              type="tel"
              placeholder="078XXXXXXXX"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="auth-input"
              style={{ paddingLeft: 42 }}
              required
            />
          </div>
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 7 }}>
            <label style={{ fontSize: "1.25rem", fontWeight: 600, color: "#334155" }}>Ijambo ry&apos;ibanga</label>
            <Link href="/forgot-password" style={{ fontSize: "1.2rem", color: "#4f46e5", fontWeight: 500, textDecoration: "none" }} className="auth-link">
              Wibagiwe?
            </Link>
          </div>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", display: "flex", alignItems: "center", pointerEvents: "none" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="auth-input"
              style={{ paddingLeft: 42, paddingRight: 46 }}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="eye-btn"
              style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 4, color: "#94a3b8", display: "flex", alignItems: "center", borderRadius: 6 }}
            >
              {showPassword ? (
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22" /></svg>
              ) : (
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="auth-submit-btn"
          style={{ marginTop: 4, height: 52, borderRadius: 10, border: "none", background: "#4f46e5", color: "#fff", fontSize: "1.5rem", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, opacity: loading ? 0.7 : 1, transition: "opacity 0.15s, background 0.15s", width: "100%" }}
        >
          {loading ? (
            <span style={{ width: 20, height: 20, border: "2.5px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />
          ) : (
            <>
              Injira
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
              </svg>
            </>
          )}
        </button>
      </form>

      <p style={{ marginTop: 24, textAlign: "center", fontSize: "1.3rem", color: "#64748b" }}>
        Ntakonti ufite?{" "}
        <Link href="/register" style={{ color: "#4f46e5", fontWeight: 700, textDecoration: "none" }} className="auth-link">Fungura konti</Link>
      </p>

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

export default function LoginPage() {
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
          <Image src="/assets/images/hero-banner 1.png" alt="App Preview" width={300} height={240} style={{ objectFit: "contain", marginBottom: 32, filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.3))" }} />
          <h2 style={{ fontSize: "2.8rem", fontWeight: 900, lineHeight: 1.2, marginBottom: 12 }}>
            Tsindira Provisoire<br />Ukoze Rimwe Gusa
          </h2>
          <p style={{ fontSize: "1.35rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, maxWidth: "34ch", margin: "0 auto" }}>
            Imenyereze ibizami byose ukoresheje telefoni yawe — aho waba uri hose, igihe cyose.
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
            <LoginForm />
          </Suspense>
        </div>

        <footer style={{ textAlign: "center", padding: "16px 24px", borderTop: "1px solid #f1f5f9" }}>
          <p style={{ fontSize: "1.2rem", color: "#cbd5e1" }}>&copy; {new Date().getFullYear()} RoadReady &mdash; A Binary Solutions Company</p>
        </footer>
      </div>
    </div>
  );
}
