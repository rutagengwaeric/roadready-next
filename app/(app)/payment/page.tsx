"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const plans = [
  { amount: 900, label: "900 RWF", period: "Umunsi", duration: "24h" },
  { amount: 2000, label: "2,000 RWF", period: "Icyumweru", duration: "7 days" },
  { amount: 3000, label: "3,000 RWF", period: "Ibyumweru 2", duration: "14 days", popular: true },
  { amount: 5000, label: "5,000 RWF", period: "Ukwezi", duration: "30 days" },
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

      const { ref } = data;
      pollStatus(ref, `250${phone}`, amount);
    } catch {
      setStatus("failed");
      setError("Hari ikibazo. Gerageza nanone.");
    }
  }

  async function pollStatus(ref: string, fullPhone: string, amt: number, attempts = 0) {
    if (attempts >= 90) {
      setStatus("timeout");
      return;
    }

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
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center max-w-sm w-full">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#5d63ff]/10 flex items-center justify-center">
            <span className="w-8 h-8 border-4 border-[#5d63ff]/30 border-t-[#5d63ff] rounded-full animate-spin block" />
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Tegereza Gato</h2>
          <p className="text-gray-500 text-sm">Reba Message ya mobile money ije kuri Telephone yawe, wemeze kwishyura.</p>
          <p className="text-[#5d63ff] text-sm font-medium mt-4">Kanda <strong>*182*7*1#</strong> niba nta message wabonye</p>
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center max-w-sm w-full">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center text-3xl">✓</div>
          <h2 className="text-lg font-bold text-gray-900">Payment Confirmed!</h2>
          <p className="text-gray-500 text-sm mt-2">Ugiye gusubizwa ku dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-2xl font-bold text-[#5d63ff]">Road<span className="text-gray-800">Ready</span></span>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">Kwishyura</h1>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {(status === "failed" || status === "timeout") && (
            <div className="mb-5 bg-red-50 border border-red-100 rounded-xl p-4 text-sm text-red-600">
              {status === "timeout" ? "Verification timed out. Warishyuye? Watumanahire kuri info@roadready.rw." : error || "Insufficient balance cyangwa payment yakuswe."}
              <button onClick={() => setStatus("idle")} className="ml-2 underline">Gerageza nanone</button>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Hitamo igiciro</label>
              <div className="grid grid-cols-2 gap-3">
                {plans.map(plan => (
                  <button
                    key={plan.amount}
                    type="button"
                    onClick={() => setAmount(plan.amount)}
                    className={`relative p-4 rounded-xl border-2 text-left transition-all ${amount === plan.amount ? "border-[#5d63ff] bg-[#5d63ff]/5" : "border-gray-200 hover:border-gray-300"}`}
                  >
                    {plan.popular && <span className="absolute -top-2 right-2 bg-[#5d63ff] text-white text-xs px-2 py-0.5 rounded-full">Ibyiza</span>}
                    <p className="font-bold text-gray-900 text-sm">{plan.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{plan.period}</p>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Numero ya Telephone</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-gray-200 bg-gray-50 text-gray-500 text-sm">+250</span>
                <input
                  type="number"
                  placeholder="7xx xxx xxx"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="input-field rounded-l-none"
                  required
                />
              </div>
            </div>
            {error && status === "idle" && <p className="text-sm text-red-500">{error}</p>}
            <button type="submit" className="btn-primary w-full py-3.5">Kwishyura</button>
          </form>
        </div>
      </div>
    </div>
  );
}
