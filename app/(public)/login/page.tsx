"use client";
import { useState } from "react";
import Link from "next/link";
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold text-[#5d63ff]">Road<span className="text-gray-800">Ready</span></Link>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">Injira muri Konte yawe</h1>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Nomero ya telefoni</label>
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Ijambo ry'ibanga</label>
              <input
                type="password"
                placeholder="Andika Ijambo ry'ibanga"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="input-field"
                required
              />
              <div className="mt-1.5 text-right">
                <Link href="/forgot-password" className="text-xs text-[#5d63ff] hover:underline">Wibagiwe ijambo ry'ibanga?</Link>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3.5 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : "Injira"}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-500">
            Ntakonti ufite?{" "}
            <Link href="/register" className="text-[#5d63ff] font-semibold hover:underline">Yifungure</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
