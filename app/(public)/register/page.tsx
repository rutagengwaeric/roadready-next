"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", email: "", phone: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function update(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirm) return setError("Amagambo y'ibanga ntahwana.");
    if (form.password.length < 6) return setError("Ijambo ry'ibanga rigomba kuba nibura inyuguti 6.");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: form.username, email: form.email, phone: `250${form.phone}`, password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) {
        const msgs: Record<string, string> = {
          email_taken: "Aderesi ya imeri irafashwe.",
          phone_taken: "Nomero ya telefoni irafashwe.",
        };
        setError(msgs[data.error] || "Hari ikibazo. Gerageza nanone.");
      } else {
        router.push("/login?msg=signup_success");
      }
    } catch {
      setError("Hari ikibazo. Gerageza nanone.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f9f5ff", display: "flex", flexDirection: "column" }}>
      <Link href="/" style={{ position: "absolute", top: "2%", left: "4%", background: "#fff", boxShadow: "0 0 2px rgba(0,0,0,0.25)", display: "grid", placeItems: "center", padding: "4px 8px", borderRadius: 8 }}>
        <Image src="/assets/images/icons/full logo.svg" alt="RoadReady" width={90} height={32} style={{ objectFit: "contain" }} />
      </Link>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 16px 40px" }}>
        <div style={{ width: "100%", maxWidth: 480 }}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <Image src="/assets/images/icons/full logo.svg" alt="RoadReady" width={140} height={50} style={{ objectFit: "contain", margin: "0 auto 12px", display: "block" }} />
            <h1 style={{ fontSize: "2.2rem", fontWeight: 500, color: "#202842" }}>Fungura Konti Nshya</h1>
          </div>

          <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 0 2px rgba(0,0,0,0.25)", padding: "20px 20px 28px" }}>
            {error && (
              <div style={{ marginBottom: 20, background: "rgb(238,158,155)", borderRadius: 5, padding: "10px 8px", fontSize: "1.3rem" }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {/* Name + Email row */}
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <div style={{ flex: "1 1 160px", display: "flex", flexDirection: "column", gap: 4 }}>
                  <label style={{ fontSize: "1.3rem", fontWeight: 500, letterSpacing: "0.5px" }}>Amazina</label>
                  <input type="text" placeholder="Amazina yawe" value={form.username} onChange={e => update("username", e.target.value)} className="input-field" required />
                </div>
                <div style={{ flex: "1 1 160px", display: "flex", flexDirection: "column", gap: 4 }}>
                  <label style={{ fontSize: "1.3rem", fontWeight: 500, letterSpacing: "0.5px" }}>Imeri</label>
                  <input type="email" placeholder="imeri@ishusho.com" value={form.email} onChange={e => update("email", e.target.value)} className="input-field" required />
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label style={{ fontSize: "1.3rem", fontWeight: 500, letterSpacing: "0.5px" }}>Nomero ya telefoni</label>
                <div style={{ display: "flex" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", padding: "0 12px", borderRadius: "8px 0 0 8px", border: "1px solid #c3c3c3", borderRight: 0, background: "#f0effe", color: "#5d6eff", fontSize: "1.4rem", fontWeight: 500, flexShrink: 0 }}>
                    +250
                  </span>
                  <input type="number" placeholder="7xx xxx xxx" value={form.phone} onChange={e => update("phone", e.target.value)} className="input-field" style={{ borderRadius: "0 8px 8px 0" }} required />
                </div>
              </div>

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <div style={{ flex: "1 1 160px", display: "flex", flexDirection: "column", gap: 4 }}>
                  <label style={{ fontSize: "1.3rem", fontWeight: 500, letterSpacing: "0.5px" }}>Ijambo ry&apos;ibanga</label>
                  <input type="password" placeholder="Nibura inyuguti 6" value={form.password} onChange={e => update("password", e.target.value)} className="input-field" required />
                </div>
                <div style={{ flex: "1 1 160px", display: "flex", flexDirection: "column", gap: 4 }}>
                  <label style={{ fontSize: "1.3rem", fontWeight: 500, letterSpacing: "0.5px" }}>Ponovera</label>
                  <input type="password" placeholder="Ongera wandike" value={form.confirm} onChange={e => update("confirm", e.target.value)} className="input-field" required />
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn btn-primary" style={{ height: 45, fontSize: "1.5rem", marginTop: 6 }}>
                {loading ? (
                  <span style={{ width: 20, height: 20, border: "3px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", display: "block", animation: "spin 0.7s linear infinite" }} />
                ) : "Iyandikishe"}
              </button>
            </form>

            <p style={{ marginTop: 20, textAlign: "center", fontSize: "1.3rem", color: "rgba(32,40,66,0.65)" }}>
              Ufite konti?{" "}
              <Link href="/login" style={{ color: "#5d6eff", fontWeight: 600 }}>Injira</Link>
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
