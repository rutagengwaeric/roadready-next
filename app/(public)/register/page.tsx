"use client";
import { useState } from "react";
import Link from "next/link";
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
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          phone: `250${form.phone}`,
          password: form.password,
        }),
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold text-[#5d63ff]">Road<span className="text-gray-800">Ready</span></Link>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">Fungura Konti Nshya</h1>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { label: "Amazina", field: "username", type: "text", placeholder: "Amazina yawe" },
              { label: "Imeri", field: "email", type: "email", placeholder: "imeri@ishusho.com" },
            ].map(({ label, field, type, placeholder }) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
                <input
                  type={type}
                  placeholder={placeholder}
                  value={form[field as keyof typeof form]}
                  onChange={e => update(field, e.target.value)}
                  className="input-field"
                  required
                />
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Nomero ya telefoni</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-gray-200 bg-gray-50 text-gray-500 text-sm">+250</span>
                <input type="number" placeholder="7xx xxx xxx" value={form.phone} onChange={e => update("phone", e.target.value)} className="input-field rounded-l-none" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Ijambo ry'ibanga</label>
              <input type="password" placeholder="Nibura inyuguti 6" value={form.password} onChange={e => update("password", e.target.value)} className="input-field" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Ponovera ijambo ry'ibanga</label>
              <input type="password" placeholder="Ongera wandike" value={form.confirm} onChange={e => update("confirm", e.target.value)} className="input-field" required />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 mt-2">
              {loading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Iyandikishe"}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-500">
            Ufite konti?{" "}
            <Link href="/login" className="text-[#5d63ff] font-semibold hover:underline">Injira</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
