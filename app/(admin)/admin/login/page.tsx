"use client";
import { useState } from "react";
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
        setError("Email cyangwa password sibyo.");
      } else {
        router.push("/admin");
      }
    } catch {
      setError("Hari ikibazo. Gerageza nanone.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-2xl font-bold text-white">Road<span className="text-[#5d63ff]">Ready</span> <span className="text-gray-400 font-normal">Admin</span></span>
        </div>
        <div className="bg-gray-800 rounded-2xl border border-gray-700 p-8">
          {error && <div className="mb-4 bg-red-900/30 border border-red-700 text-red-400 text-sm rounded-xl px-4 py-3">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#5d63ff] transition-colors" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#5d63ff] transition-colors" required />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-[#5d63ff] text-white rounded-xl py-3 font-semibold text-sm hover:bg-[#4a4fd6] transition-colors flex items-center justify-center gap-2">
              {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Injira"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
