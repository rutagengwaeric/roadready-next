"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const plans = [
  { amount: 900, label: "900 RWF", period: "Umunsi", img: "/assets/images/bronze 1.png" },
  { amount: 2000, label: "2,000 RWF", period: "Icyumweru", img: "/assets/images/icons/silver 1.png" },
  { amount: 3000, label: "3,000 RWF", period: "Ibyumweru 2", img: "/assets/images/gold 1.png", popular: true },
  { amount: 5000, label: "5,000 RWF", period: "Ukwezi", img: "/assets/images/icons/diamond.png" },
];

type Status = "idle" | "pending" | "success" | "failed" | "timeout";

export default function PaymentPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState<number | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!amount) return setError("Hitamo igiciro.");
    setError("");
    setStatus("pending");

    try {
      const res = await fetch("/api/payment/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, phone: `250${phone}` }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("failed");
        setError(data.error || "Payment initiation failed");
        return;
      }
      pollStatus(data.ref, `250${phone}`, amount);
    } catch {
      setStatus("failed");
      setError("Hari ikibazo. Gerageza nanone.");
    }
  }

  async function pollStatus(ref: string, fullPhone: string, amt: number, attempts = 0) {
    if (attempts >= 90) { setStatus("timeout"); return; }
    try {
      const res = await fetch(`/api/payment/status?ref=${encodeURIComponent(ref)}&phone=${encodeURIComponent(fullPhone)}`);
      const data = await res.json();
      const txStatus = data?.transactions?.[0]?.data?.status;

      if (txStatus === "successful") {
        await fetch("/api/payment/confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: amt, paymentRef: ref }),
        });
        setStatus("success");
        setTimeout(() => router.push("/app"), 2000);
      } else if (txStatus === "failed") {
        setStatus("failed");
      } else {
        setTimeout(() => pollStatus(ref, fullPhone, amt, attempts + 1), 1000);
      }
    } catch {
      setTimeout(() => pollStatus(ref, fullPhone, amt, attempts + 1), 2000);
    }
  }

  if (status === "pending") {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#f9f5ff", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
        <div style={{ background: "#fff", borderRadius: 18, border: "1px solid #B9B9B9", boxShadow: "0 39px 37px rgba(0,0,0,0.09)", padding: "30px 24px", textAlign: "center", maxWidth: 350, width: "100%" }}>
          <div style={{ width: 64, height: 64, margin: "0 auto 20px", borderRadius: "50%", background: "#eeefff", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ width: 32, height: 32, border: "4px solid rgba(93,110,255,0.3)", borderTopColor: "#5d6eff", borderRadius: "50%", display: "block", animation: "spin 0.7s linear infinite" }} />
          </div>
          <h2 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: 12 }}>Tegereza Gato</h2>
          <p style={{ color: "rgba(32,40,66,0.65)", fontSize: "1.4rem", lineHeight: 1.5 }}>
            Reba Message ya mobile money ije kuri Telephone yawe, wemeze kwishyura.
          </p>
          <p style={{ color: "#5d6eff", fontSize: "1.4rem", fontWeight: 600, marginTop: 16 }}>
            Kanda <strong>*182*7*1#</strong> niba nta message wabonye
          </p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#f9f5ff", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
        <div style={{ background: "#fff", borderRadius: 18, border: "1px solid #B9B9B9", boxShadow: "0 39px 37px rgba(0,0,0,0.09)", padding: "30px 24px", textAlign: "center", maxWidth: 350, width: "100%" }}>
          <div style={{ width: 64, height: 64, margin: "0 auto 20px", borderRadius: "50%", background: "#e6f9f3", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32 }}>✓</div>
          <h2 style={{ fontSize: "2rem", fontWeight: 700 }}>Payment Confirmed!</h2>
          <p style={{ color: "rgba(32,40,66,0.65)", fontSize: "1.4rem", marginTop: 8 }}>Ugiye gusubizwa ku dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f9f5ff", display: "flex", flexDirection: "column" }}>
      {/* Top bar */}
      <div style={{ backgroundColor: "#fff", borderBottom: "1px solid #eee", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 16px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/app">
            <Image src="/assets/images/icons/full logo.svg" alt="RoadReady" width={110} height={40} style={{ objectFit: "contain" }} />
          </Link>
          <Link href="/app" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "1.3rem", color: "rgba(32,40,66,0.6)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
            Subira
          </Link>
        </div>
      </div>

      <div style={{ maxWidth: 500, margin: "0 auto", padding: "32px 16px", flex: 1, width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <h1 style={{ fontSize: "2.4rem", fontWeight: 700, color: "#202842" }}>Kwishyura</h1>
          <p style={{ color: "rgba(32,40,66,0.6)", fontSize: "1.4rem", marginTop: 6 }}>Hitamo igiciro kikunogeye</p>
        </div>

        <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 0 2px rgba(0,0,0,0.15)", padding: "24px 20px" }}>
          {(status === "failed" || status === "timeout") && (
            <div style={{ marginBottom: 20, background: "rgb(238,158,155)", borderRadius: 5, padding: "10px 8px", fontSize: "1.3rem" }}>
              {status === "timeout" ? "Verification timed out. Warishyuye? Watumanahire kuri info@roadready.rw." : error || "Insufficient balance cyangwa payment yakuswe."}
              <button onClick={() => setStatus("idle")} style={{ marginLeft: 8, textDecoration: "underline", color: "#5d6eff", background: "none", border: "none", cursor: "pointer", fontSize: "1.3rem" }}>
                Gerageza nanone
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            {/* Plan selector */}
            <div>
              <label style={{ display: "block", fontSize: "1.4rem", fontWeight: 600, marginBottom: 12 }}>Hitamo igiciro</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {plans.map(plan => (
                  <button
                    key={plan.amount}
                    type="button"
                    onClick={() => setAmount(plan.amount)}
                    style={{
                      position: "relative",
                      padding: "16px 12px",
                      borderRadius: 12,
                      border: amount === plan.amount ? "2px solid #5d6eff" : "1px solid #ece8e8",
                      background: amount === plan.amount ? "#f0effe" : "#fff",
                      textAlign: "left",
                      cursor: "pointer",
                      transition: "0.2s",
                    }}
                  >
                    {plan.popular && (
                      <span style={{ position: "absolute", top: -10, right: 8, background: "#5d6eff", color: "#fff", fontSize: "1.1rem", padding: "2px 8px", borderRadius: 20 }}>
                        Ibyiza
                      </span>
                    )}
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <Image src={plan.img} alt={plan.period} width={28} height={28} style={{ objectFit: "contain" }} />
                      <strong style={{ fontSize: "1.6rem", color: "#202842" }}>{plan.label}</strong>
                    </div>
                    <p style={{ fontSize: "1.3rem", color: "rgba(32,40,66,0.6)" }}>{plan.period}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Phone */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: "1.4rem", fontWeight: 500 }}>Numero ya Telephone</label>
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

            {error && status === "idle" && (
              <p style={{ fontSize: "1.3rem", color: "#e53e3e" }}>{error}</p>
            )}

            <button type="submit" className="btn btn-primary" style={{ height: 48, fontSize: "1.5rem" }}>
              Kwishyura
            </button>
          </form>
        </div>
      </div>

      <footer className="app-footer">
        <p>&copy; Copyright 2025 RoadReady - A Binary Solutions Company.</p>
        <p>Designed By Binary Solutions</p>
      </footer>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
