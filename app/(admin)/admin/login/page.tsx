"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        setError("Invalid email or password.");
      } else {
        router.push("/admin");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#1a1d2e", display: "flex", alignItems: "center", justifyContent: "center", padding: 16, fontFamily: "inherit" }}>
      <div style={{ width: "100%", maxWidth: 380 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <Image
            src="/assets/images/icons/full logo.svg"
            alt="RoadReady"
            width={150}
            height={54}
            style={{ objectFit: "contain", margin: "0 auto 12px", display: "block", filter: "brightness(0) invert(1)" }}
          />
          <p style={{ fontSize: "1.4rem", color: "rgba(255,255,255,0.4)" }}>Admin Panel</p>
        </div>

        <div style={{ backgroundColor: "#12152a", border: "1px solid #2a2d4a", borderRadius: 16, padding: "28px 24px" }}>
          {error && (
            <div style={{ marginBottom: 18, background: "rgba(252,129,129,0.15)", border: "1px solid rgba(252,129,129,0.3)", borderRadius: 8, padding: "10px 14px", fontSize: "1.3rem", color: "#fc8181" }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: "1.3rem", fontWeight: 500, color: "rgba(255,255,255,0.7)" }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ width: "100%", backgroundColor: "#1a1d2e", border: "1px solid #2a2d4a", borderRadius: 8, padding: "12px 16px", color: "#fff", fontSize: "1.4rem", outline: "none", fontFamily: "inherit", transition: "0.2s" }}
                onFocus={e => (e.target.style.borderColor = "#5d6eff")}
                onBlur={e => (e.target.style.borderColor = "#2a2d4a")}
                required
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: "1.3rem", fontWeight: 500, color: "rgba(255,255,255,0.7)" }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{ width: "100%", backgroundColor: "#1a1d2e", border: "1px solid #2a2d4a", borderRadius: 8, padding: "12px 16px", color: "#fff", fontSize: "1.4rem", outline: "none", fontFamily: "inherit", transition: "0.2s" }}
                onFocus={e => (e.target.style.borderColor = "#5d6eff")}
                onBlur={e => (e.target.style.borderColor = "#2a2d4a")}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ height: 48, fontSize: "1.5rem", marginTop: 8 }}
            >
              {loading ? (
                <span style={{ width: 20, height: 20, border: "3px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", display: "block", animation: "spin 0.7s linear infinite" }} />
              ) : "Sign In"}
            </button>
          </form>
        </div>
      </div>

    </div>
  );
}
