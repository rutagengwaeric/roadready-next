"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

async function logout() {
  await fetch("/api/auth/logout", { method: "POST" });
  window.location.href = "/login";
}

const plans = [
  {
    amount: 900,
    label: "900 RWF",
    period: "Umunsi 1",
    name: "Bronze",
    color: "#b45309",
    img: "/assets/images/icons/bronze 1.png",
    perks: ["Ibizami 20", "Amagambo 4", "Igisubizo icyiha"],
  },
  {
    amount: 2000,
    label: "2,000 RWF",
    period: "Icyumweru",
    name: "Silver",
    color: "#64748b",
    img: "/assets/images/icons/silver 1.png",
    perks: ["Ibizami 20", "Amagambo 4", "Igisubizo icyiha"],
  },
  {
    amount: 3000,
    label: "3,000 RWF",
    period: "Ibyumweru 2",
    name: "Gold",
    color: "#d97706",
    img: "/assets/images/icons/gold 1.png",
    popular: true,
    perks: ["Ibizami 20", "Amagambo 4", "Igisubizo icyiha"],
  },
  {
    amount: 5000,
    label: "5,000 RWF",
    period: "Ukwezi 1",
    name: "Diamond",
    color: "#4f46e5",
    img: "/assets/images/icons/diamond.png",
    perks: ["Ibizami 20", "Amagambo 4", "Igisubizo icyiha"],
  },
];

type Status = "idle" | "pending" | "success" | "failed" | "timeout";

export default function PaymentPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState<number | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const selectedPlan = plans.find(p => p.amount === amount);

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    if (!amount) return setError("Hitamo igiciro mbere.");
    setError("");
    setStatus("pending");
    try {
      const res = await fetch("/api/payment/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, phone: `250${phone}` }),
      });
      const data = await res.json();
      if (!res.ok) { setStatus("failed"); setError(data.error || "Payment initiation failed"); return; }
      pollStatus(data.ref, `250${phone}`, amount);
    } catch {
      setStatus("failed"); setError("Hari ikibazo. Gerageza nanone.");
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
        setTimeout(() => router.push("/app"), 2500);
      } else if (txStatus === "failed") {
        setStatus("failed");
      } else {
        setTimeout(() => pollStatus(ref, fullPhone, amt, attempts + 1), 1000);
      }
    } catch {
      setTimeout(() => pollStatus(ref, fullPhone, amt, attempts + 1), 2000);
    }
  }

  /* ── PENDING ── */
  if (status === "pending") {
    return (
      <div style={overlayCenter}>
        <div style={floatingCard}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#eef2ff", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", border: "3px solid #c7d2fe", borderTopColor: "#4f46e5", animation: "spin 0.7s linear infinite" }} />
          </div>
          <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "#0f172a", marginBottom: 10 }}>Tegereza gato…</h2>
          <p style={{ fontSize: "1.4rem", color: "#64748b", lineHeight: 1.6, marginBottom: 16 }}>
            Reba message ya Mobile Money ije kuri telefoni yawe, wemeze kwishyura.
          </p>
          <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 10, padding: "12px 16px", fontSize: "1.3rem", color: "#475569" }}>
            Nta message wabonye? Kanda <strong style={{ color: "#4f46e5" }}>*182*7*1#</strong>
          </div>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  /* ── SUCCESS ── */
  if (status === "success") {
    return (
      <div style={overlayCenter}>
        <div style={floatingCard}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#ecfdf5", border: "1px solid #a7f3d0", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>Kwishyura byagenze neza!</h2>
          <p style={{ fontSize: "1.4rem", color: "#64748b" }}>Ugiye gusubizwa kuri dashboard…</p>
        </div>
      </div>
    );
  }

  /* ── MAIN FORM ── */
  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "inherit", display: "flex", flexDirection: "column" }}>

      {/* Header */}
      <header style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", position: "sticky", top: 0, zIndex: 40 }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/app" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <Image src="/assets/images/icons/full logo.svg" alt="RoadReady" width={100} height={34} style={{ objectFit: "contain" }} />
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Link href="/app" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "1.3rem", fontWeight: 500, color: "#64748b", textDecoration: "none" }} className="back-link">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
              </svg>
              Subira inyuma
            </Link>
            <button
              onClick={logout}
              style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "1.3rem", fontWeight: 500, color: "#ef4444", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: "6px 14px", cursor: "pointer" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Sohoka
            </button>
          </div>
        </div>
      </header>

      {/* Body */}
      <div style={{ flex: 1, maxWidth: 1000, margin: "0 auto", width: "100%", padding: "32px 24px 56px", display: "grid", gap: 24, alignItems: "start" }} className="pay-grid">

        {/* Left — form */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Error banner */}
          {(status === "failed" || status === "timeout") && (
            <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: "14px 16px", display: "flex", alignItems: "flex-start", gap: 10 }}>
              <svg style={{ flexShrink: 0, marginTop: 1 }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: "1.3rem", color: "#b91c1c", fontWeight: 600, marginBottom: 2 }}>
                  {status === "timeout" ? "Igihe cyarashize" : "Payment yarananiranye"}
                </p>
                <p style={{ fontSize: "1.2rem", color: "#dc2626" }}>
                  {status === "timeout" ? "Warishyuye? Twandikire kuri info@roadready.rw" : error || "Insufficient balance cyangwa payment yakuswe."}
                </p>
              </div>
              <button onClick={() => setStatus("idle")} style={{ fontSize: "1.2rem", color: "#4f46e5", background: "none", border: "none", cursor: "pointer", fontWeight: 600, flexShrink: 0 }}>
                Ongera ugerageze
              </button>
            </div>
          )}

          {/* Plan selection */}
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "24px" }}>
            <p style={{ fontSize: "1.1rem", fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 16 }}>Hitamo igiciro</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {plans.map(plan => {
                const selected = amount === plan.amount;
                return (
                  <button
                    key={plan.amount}
                    type="button"
                    onClick={() => setAmount(plan.amount)}
                    style={{
                      position: "relative", padding: "16px 14px", borderRadius: 10, textAlign: "left", cursor: "pointer",
                      border: selected ? `2px solid ${plan.color}` : "1px solid #e2e8f0",
                      background: selected ? `${plan.color}08` : "#fff",
                      transition: "border-color 0.15s, background 0.15s",
                    }}
                    className="plan-btn"
                  >
                    {plan.popular && (
                      <span style={{ position: "absolute", top: -11, right: 10, background: "#4f46e5", color: "#fff", fontSize: "1.05rem", fontWeight: 700, padding: "2px 9px", borderRadius: 20 }}>
                        Akunzwe cyane
                      </span>
                    )}
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <Image src={plan.img} alt={plan.name} width={24} height={24} style={{ objectFit: "contain" }} />
                      <span style={{ fontSize: "1.6rem", fontWeight: 800, color: selected ? plan.color : "#0f172a" }}>{plan.label}</span>
                    </div>
                    <p style={{ fontSize: "1.2rem", color: "#94a3b8", marginBottom: 0 }}>{plan.period}</p>
                    {selected && (
                      <div style={{ position: "absolute", top: 10, right: 10, width: 18, height: 18, borderRadius: "50%", background: plan.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Phone + submit */}
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "24px" }}>
            <p style={{ fontSize: "1.1rem", fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 16 }}>Numero ya Mobile Money</p>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "flex", borderRadius: 8, border: "1px solid #e2e8f0", overflow: "hidden" }}>
                <span style={{ display: "flex", alignItems: "center", padding: "0 14px", background: "#f8fafc", borderRight: "1px solid #e2e8f0", fontSize: "1.3rem", fontWeight: 700, color: "#4f46e5", flexShrink: 0 }}>
                  +250
                </span>
                <input
                  type="tel"
                  placeholder="7xx xxx xxx"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  required
                  style={{ flex: 1, padding: "12px 14px", fontSize: "1.4rem", border: "none", outline: "none", color: "#0f172a", background: "#fff" }}
                />
              </div>

              {error && status === "idle" && (
                <p style={{ fontSize: "1.25rem", color: "#dc2626" }}>{error}</p>
              )}

              <button
                type="submit"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  padding: "13px 20px", borderRadius: 8, border: "none", cursor: "pointer",
                  background: "#4f46e5", color: "#fff", fontSize: "1.5rem", fontWeight: 700,
                  opacity: !amount || !phone ? 0.6 : 1,
                }}
                disabled={!amount || !phone}
                className="pay-btn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
                </svg>
                Kwishyura {selectedPlan ? selectedPlan.label : ""}
              </button>
            </form>
          </div>
        </div>

        {/* Right — summary */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

          {/* Selected plan summary */}
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "22px" }}>
            <p style={{ fontSize: "1.1rem", fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 16 }}>Incamake</p>
            {selectedPlan ? (
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, paddingBottom: 16, borderBottom: "1px solid #f1f5f9" }}>
                  <Image src={selectedPlan.img} alt={selectedPlan.name} width={32} height={32} style={{ objectFit: "contain" }} />
                  <div>
                    <p style={{ fontSize: "1.6rem", fontWeight: 700, color: "#0f172a" }}>Plan {selectedPlan.name}</p>
                    <p style={{ fontSize: "1.2rem", color: "#94a3b8" }}>{selectedPlan.period}</p>
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontSize: "1.3rem", color: "#64748b" }}>Igiciro</span>
                  <span style={{ fontSize: "2.2rem", fontWeight: 800, color: selectedPlan.color }}>{selectedPlan.label}</span>
                </div>
                <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                  {selectedPlan.perks.map(perk => (
                    <div key={perk} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      <span style={{ fontSize: "1.3rem", color: "#475569" }}>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
                  </svg>
                </div>
                <p style={{ fontSize: "1.3rem", color: "#94a3b8" }}>Hitamo igiciro hejuru kugirango urebe incamake.</p>
              </div>
            )}
          </div>

          {/* How to pay */}
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "22px" }}>
            <p style={{ fontSize: "1.1rem", fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 14 }}>Uburyo bwo kwishyura</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { n: "1", text: "Hitamo igiciro cyawe hejuru" },
                { n: "2", text: "Injiza numero ya Mobile Money" },
                { n: "3", text: "Kanda \"Kwishyura\" hanyuma wemeze kuri telefoni yawe" },
              ].map(step => (
                <div key={step.n} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <span style={{ width: 22, height: 22, borderRadius: "50%", background: "#eef2ff", color: "#4f46e5", fontSize: "1.1rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {step.n}
                  </span>
                  <span style={{ fontSize: "1.3rem", color: "#475569", lineHeight: 1.5, paddingTop: 1 }}>{step.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Security note */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "12px 14px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10 }}>
            <svg style={{ flexShrink: 0, marginTop: 1 }} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            <p style={{ fontSize: "1.2rem", color: "#16a34a", lineHeight: 1.5 }}>
              Kwishyura birakomeye. Amakuru yawe ararindwa neza.
            </p>
          </div>
        </div>
      </div>

      <footer style={{ textAlign: "center", padding: "20px", borderTop: "1px solid #f1f5f9" }}>
        <p style={{ fontSize: "1.2rem", color: "#cbd5e1" }}>&copy; {new Date().getFullYear()} RoadReady &mdash; A Binary Solutions Company</p>
      </footer>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .pay-grid { grid-template-columns: 1fr 300px; }
        .plan-btn:hover { border-color: #c7d2fe !important; }
        .pay-btn:hover:not(:disabled) { background: #4338ca !important; }
        .back-link:hover { color: #4f46e5 !important; }
        @media (max-width: 700px) {
          .pay-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

const overlayCenter: React.CSSProperties = {
  minHeight: "100vh", background: "#f8fafc",
  display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
};

const floatingCard: React.CSSProperties = {
  background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16,
  padding: "36px 28px", textAlign: "center", maxWidth: 380, width: "100%",
};
