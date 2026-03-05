"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: `250${phone}`, password }),
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
    <div style={{ minHeight: "100vh", backgroundColor: "#f9f5ff", display: "flex", flexDirection: "column" }}>
      {/* Back link */}
      <Link href="/" style={{ position: "absolute", top: "3%", left: "4%", background: "#fff", boxShadow: "0 0 2px rgba(0,0,0,0.25)", display: "grid", placeItems: "center", padding: "4px 8px", borderRadius: 8 }}>
        <Image src="/assets/images/icons/full logo.svg" alt="RoadReady" width={90} height={32} style={{ objectFit: "contain" }} />
      </Link>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 16px 40px" }}>
        <div style={{ width: "100%", maxWidth: 370 }}>
          {/* Logo */}
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <Image src="/assets/images/icons/full logo.svg" alt="RoadReady" width={140} height={50} style={{ objectFit: "contain", margin: "0 auto 12px", display: "block" }} />
            <h1 style={{ fontSize: "2.2rem", fontWeight: 500, color: "#202842" }}>Injira muri Konte yawe</h1>
          </div>

          <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 0 2px rgba(0,0,0,0.25)", padding: "20px 20px 28px" }}>
            {error && (
              <div style={{ marginBottom: 20, background: "rgb(238,158,155)", borderRadius: 5, padding: "10px 8px", fontSize: "1.3rem" }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 15 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label style={{ fontSize: "1.3rem", fontWeight: 500, letterSpacing: "0.5px" }}>Nomero ya telefoni</label>
                <div style={{ display: "flex" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", padding: "0 12px", borderRadius: "8px 0 0 8px", border: "1px solid #c3c3c3", borderRight: 0, background: "#f0effe", color: "#5d6eff", fontSize: "1.4rem", fontWeight: 500, flexShrink: 0 }}>
                    +250
                  </span>
                  <input
                    type="number"
                    placeholder="7xx xxx xxx"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="input-field"
                    style={{ borderRadius: "0 8px 8px 0" }}
                    required
                  />
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label style={{ fontSize: "1.3rem", fontWeight: 500, letterSpacing: "0.5px" }}>Ijambo ry&apos;ibanga</label>
                <input
                  type="password"
                  placeholder="Andika Ijambo ry'ibanga"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="input-field"
                  required
                />
                <div style={{ textAlign: "right", marginTop: 2 }}>
                  <Link href="/forgot-password" style={{ fontSize: "1.2rem", color: "#5d6eff", fontWeight: 600 }}>
                    Wibagiwe ijambo ry&apos;ibanga?
                  </Link>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{ height: 45, fontSize: "1.5rem", marginTop: 8 }}
              >
                {loading ? (
                  <span style={{ width: 20, height: 20, border: "3px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", display: "block", animation: "spin 0.7s linear infinite" }} />
                ) : "Injira"}
              </button>
            </form>

            <p style={{ marginTop: 20, textAlign: "center", fontSize: "1.3rem", color: "rgba(32,40,66,0.65)" }}>
              Ntakonti ufite?{" "}
              <Link href="/register" style={{ color: "#5d6eff", fontWeight: 600 }}>Yifungure</Link>
            </p>
          </div>
        </div>
      </div>

      <footer className="app-footer">
        <p>&copy; Copyright 2025 RoadReady - A Binary Solutions Company.</p>
        <p>Designed By ClaroCreatives</p>
      </footer>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
