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
    <div className="min-h-screen flex">

      {/* ── LEFT PANEL — brand side (hidden on mobile) ── */}
      <div className="hidden md:flex w-[46%] shrink-0 flex-col items-center justify-between p-10 relative overflow-hidden"
           style={{ background: "linear-gradient(145deg, #5d6eff 0%, #4349c8 100%)" }}>

        {/* Background decorations */}
        <div className="absolute -top-20 -left-20 w-[400px] h-[400px] rounded-full opacity-10 bg-white" />
        <div className="absolute -bottom-32 -right-20 w-[500px] h-[500px] rounded-full opacity-10 bg-white" />

        {/* Logo */}
        <Link href="/" className="self-start z-10">
          <Image src="/assets/images/icons/full logo.svg" alt="RoadReady" width={130} height={46}
            className="object-contain" style={{ filter: "brightness(0) invert(1)" }} />
        </Link>

        {/* Centre content */}
        <div className="text-center text-white z-10 px-4">
          <Image src="/assets/images/hero-banner 1.png" alt="App Preview" width={340} height={280}
            className="w-full max-w-[300px] mx-auto mb-8 object-contain drop-shadow-2xl" />
          <h2 className="text-[2.8rem] font-black leading-tight mb-3">
            Tangira Ubutumire<br/>Bwawe Ubu Nonaha
          </h2>
          <p className="text-white/70 text-[1.4rem] leading-[1.6] max-w-[36ch] mx-auto">
            Fungura konti uhabwe amahirwe yo kwimenyereza ibizami by&apos;inzira — aho uwo aribwo wese.
          </p>
        </div>

        {/* Bottom stats */}
        <div className="flex items-center gap-8 z-10">
          {[["260+","Batsinze"],["450+","Imyitozo"],["4.9★","Rating"]].map(([v,l]) => (
            <div key={l} className="text-center">
              <p className="text-[2rem] font-black text-white">{v}</p>
              <p className="text-[1.2rem] text-white/60">{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT PANEL — form ── */}
      <div className="flex-1 flex flex-col bg-white">

        {/* Mobile-only top bar */}
        <div className="md:hidden flex items-center px-6 py-4 border-b border-gray-100">
          <Link href="/">
            <Image src="/assets/images/icons/full logo.svg" alt="RoadReady" width={110} height={38} className="object-contain" />
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 py-10">
          <div className="w-full max-w-[420px]">

            <div className="mb-7">
              <h1 className="text-[2.6rem] font-black text-[#202842] mb-1">Fungura Konti</h1>
              <p className="text-[1.4rem] text-[#202842]/55">Iyandikishe kuri RoadReady ubu nonaha</p>
            </div>

            {error && (
              <div className="mb-5 flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                <svg className="shrink-0 mt-[2px]" width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2a8 8 0 100 16A8 8 0 0010 2zm0 4v4m0 4h.01" stroke="#e53e3e" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
                <p className="text-[1.3rem] text-red-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

              {/* Name + Email */}
              <div className="flex gap-3 flex-wrap">
                <div className="flex-1 min-w-[140px]">
                  <label className="block text-[1.3rem] font-semibold text-[#202842] mb-2">Amazina</label>
                  <input
                    type="text"
                    placeholder="Amazina yawe"
                    value={form.username}
                    onChange={e => update("username", e.target.value)}
                    className="w-full px-4 py-3 text-[1.4rem] border border-[#c3c3c3] rounded-xl outline-none font-[inherit] bg-[#f9f9f9] focus:bg-white focus:border-[#5d6eff] focus:ring-2 focus:ring-[#5d6eff]/15 transition-all"
                    required
                  />
                </div>
                <div className="flex-1 min-w-[140px]">
                  <label className="block text-[1.3rem] font-semibold text-[#202842] mb-2">Imeri</label>
                  <input
                    type="email"
                    placeholder="imeri@example.com"
                    value={form.email}
                    onChange={e => update("email", e.target.value)}
                    className="w-full px-4 py-3 text-[1.4rem] border border-[#c3c3c3] rounded-xl outline-none font-[inherit] bg-[#f9f9f9] focus:bg-white focus:border-[#5d6eff] focus:ring-2 focus:ring-[#5d6eff]/15 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-[1.3rem] font-semibold text-[#202842] mb-2">Nomero ya telefoni</label>
                <div className="flex rounded-xl overflow-hidden border border-[#c3c3c3] focus-within:border-[#5d6eff] focus-within:ring-2 focus-within:ring-[#5d6eff]/15 transition-all">
                  <span className="flex items-center px-4 bg-[#f0f2ff] text-[#5d6eff] text-[1.4rem] font-bold border-r border-[#c3c3c3] shrink-0">
                    +250
                  </span>
                  <input
                    type="number"
                    placeholder="7xx xxx xxx"
                    value={form.phone}
                    onChange={e => update("phone", e.target.value)}
                    className="flex-1 px-4 py-3 text-[1.4rem] outline-none bg-white font-[inherit]"
                    required
                  />
                </div>
              </div>

              {/* Passwords */}
              <div className="flex gap-3 flex-wrap">
                <div className="flex-1 min-w-[140px]">
                  <label className="block text-[1.3rem] font-semibold text-[#202842] mb-2">Ijambo ry&apos;ibanga</label>
                  <input
                    type="password"
                    placeholder="Nibura inyuguti 6"
                    value={form.password}
                    onChange={e => update("password", e.target.value)}
                    className="w-full px-4 py-3 text-[1.4rem] border border-[#c3c3c3] rounded-xl outline-none font-[inherit] bg-[#f9f9f9] focus:bg-white focus:border-[#5d6eff] focus:ring-2 focus:ring-[#5d6eff]/15 transition-all"
                    required
                  />
                </div>
                <div className="flex-1 min-w-[140px]">
                  <label className="block text-[1.3rem] font-semibold text-[#202842] mb-2">Ponovera</label>
                  <input
                    type="password"
                    placeholder="Ongera wandike"
                    value={form.confirm}
                    onChange={e => update("confirm", e.target.value)}
                    className="w-full px-4 py-3 text-[1.4rem] border border-[#c3c3c3] rounded-xl outline-none font-[inherit] bg-[#f9f9f9] focus:bg-white focus:border-[#5d6eff] focus:ring-2 focus:ring-[#5d6eff]/15 transition-all"
                    required
                  />
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn btn-primary w-full mt-2" style={{ height: 50, fontSize: "1.6rem", fontWeight: 700 }}>
                {loading
                  ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full block" style={{ animation: "spin 0.7s linear infinite" }} />
                  : "Iyandikishe"
                }
              </button>
            </form>

            <p className="mt-6 text-center text-[1.3rem] text-[#202842]/55">
              Ufite konti?{" "}
              <Link href="/login" className="text-[#5d6eff] font-bold hover:underline">Injira</Link>
            </p>
          </div>
        </div>

        {/* <footer className="app-footer">
          <p>&copy; Copyright 2025 RoadReady — A Binary Solutions Company.</p>
          <p>Designed By Binary Solutions</p>
        </footer> */}
      </div>
    </div>
  );
}
