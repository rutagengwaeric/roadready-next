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
    <div className="min-h-screen bg-[#f2f3f7] flex flex-col">
      <main className="flex-1 flex items-center justify-center p-4 py-8">
        <div className="w-full max-w-[760px]">

          {/* Logo */}
          <Link href="/" className="flex justify-center mb-6">
            <Image src="/assets/images/icons/full logo.svg" alt="RoadReady" width={130} height={46} className="object-contain" />
          </Link>

          {/* Card */}
          <div className="bg-white rounded-[24px] overflow-hidden flex border border-[#e2e2e2]"
               style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>

            {/* Left — banner, desktop only */}
            <div className="hidden sm:block w-[38%] shrink-0">
              <Image src="/assets/images/form-banner.jpg" alt="" width={300} height={520}
                className="w-full h-full object-cover" />
            </div>

            {/* Right — form */}
            <div className="flex-1 px-7 py-8">
              <h1 className="text-[2rem] font-bold text-center text-[#0b0b0b] mb-6">
                Fungura Konti Nshya
              </h1>

              {error && (
                <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-[1.3rem] px-3 py-2.5 rounded-lg">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Name + Email */}
                <div className="flex gap-3 flex-wrap">
                  <div className="flex-1 min-w-[130px]">
                    <label className="block text-[1.3rem] font-medium mb-1.5 text-[#202842]">Amazina</label>
                    <input type="text" placeholder="Amazina yawe" value={form.username}
                      onChange={e => update("username", e.target.value)} className="input-field" required />
                  </div>
                  <div className="flex-1 min-w-[130px]">
                    <label className="block text-[1.3rem] font-medium mb-1.5 text-[#202842]">Imeri</label>
                    <input type="email" placeholder="imeri@example.com" value={form.email}
                      onChange={e => update("email", e.target.value)} className="input-field" required />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-[1.3rem] font-medium mb-1.5 text-[#202842]">Nomero ya telefoni</label>
                  <div className="flex">
                    <span className="flex items-center px-3 bg-[#f0effe] text-[#5d6eff] text-[1.4rem] font-semibold border border-[#c3c3c3] border-r-0 rounded-l-lg shrink-0">
                      +250
                    </span>
                    <input type="number" placeholder="7xx xxx xxx" value={form.phone}
                      onChange={e => update("phone", e.target.value)} className="input-field rounded-l-none" required />
                  </div>
                </div>

                {/* Passwords */}
                <div className="flex gap-3 flex-wrap">
                  <div className="flex-1 min-w-[130px]">
                    <label className="block text-[1.3rem] font-medium mb-1.5 text-[#202842]">Ijambo ry&apos;ibanga</label>
                    <input type="password" placeholder="Nibura inyuguti 6" value={form.password}
                      onChange={e => update("password", e.target.value)} className="input-field" required />
                  </div>
                  <div className="flex-1 min-w-[130px]">
                    <label className="block text-[1.3rem] font-medium mb-1.5 text-[#202842]">Ponovera</label>
                    <input type="password" placeholder="Ongera wandike" value={form.confirm}
                      onChange={e => update("confirm", e.target.value)} className="input-field" required />
                  </div>
                </div>

                <button type="submit" disabled={loading} className="btn btn-primary w-full mt-1" style={{ height: 46, fontSize: "1.5rem" }}>
                  {loading
                    ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full block" style={{ animation: "spin 0.7s linear infinite" }} />
                    : "Iyandikishe"
                  }
                </button>
              </form>

              <p className="mt-5 text-center text-[1.3rem] text-[#202842]/60">
                Ufite konti?{" "}
                <Link href="/login" className="text-[#5d6eff] font-semibold">Injira</Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>&copy; Copyright 2025 RoadReady — A Binary Solutions Company.</p>
        <p>Designed By ClaroCreatives</p>
      </footer>
    </div>
  );
}
