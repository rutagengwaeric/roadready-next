"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
        body: JSON.stringify({ phone, password }),
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
    <div className="min-h-screen flex">

      {/* ── LEFT PANEL — brand side (hidden on mobile) ── */}
      <div className="hidden md:flex w-[46%] shrink-0 flex-col items-center justify-between p-10 relative overflow-hidden"
        style={{ background: "linear-gradient(145deg, #5d6eff 0%, #4349c8 100%)" }}>

        {/* Background decoration */}
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
            Tsindira Provisoire<br />Ukoze Rimwe Gusa
          </h2>
          <p className="text-white/70 text-[1.4rem] leading-[1.6] max-w-[36ch] mx-auto">
            Imenyereze ibizami byose ukoresheje telefoni yawe — aho waba uri hose, igihe cyose.
          </p>
        </div>

        {/* Bottom stats */}
        <div className="flex items-center gap-8 z-10">
          {[["260+", "Batsinze"], ["450+", "Imyitozo"], ["4.9★", "Rating"]].map(([v, l]) => (
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
          <div className="w-full max-w-[400px]">

            <div className="mb-8">
              <h1 className="text-[2.6rem] font-black text-[#202842] mb-1">Ikaza</h1>
              <p className="text-[1.4rem] text-[#202842]/55">Injira muri konti yawe ya RoadReady</p>
            </div>

            {error && (
              <div className="mb-5 flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                <svg className="shrink-0 mt-[2px]" width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2a8 8 0 100 16A8 8 0 0010 2zm0 4v4m0 4h.01" stroke="#e53e3e" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                <p className="text-[1.3rem] text-red-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className="block text-[1.3rem] font-semibold text-[#202842] mb-2">Nomero ya telefoni</label>
                <input
                  type="tel"
                  placeholder="078XXXXXXXX "
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full px-4 py-3 text-[1.4rem] border border-[#c3c3c3] rounded-xl outline-none bg-white font-[inherit] transition-all focus:border-[#5d6eff] focus:bg-white focus:ring-2 focus:ring-[#5d6eff]/15"
                  required
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-[1.3rem] font-semibold text-[#202842]">Ijambo ry&apos;ibanga</label>
                  <Link href="/forgot-password" className="text-[1.2rem] text-[#5d6eff] font-medium hover:underline">
                    Wibagiwe?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 text-[1.4rem] border border-[#c3c3c3] rounded-xl outline-none font-[inherit] bg-[#f9f9f9] focus:bg-white focus:border-[#5d6eff] focus:ring-2 focus:ring-[#5d6eff]/15 transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#202842]/40 hover:text-[#5d6eff] hover:bg-[#5d6eff]/10 p-1.5 rounded-lg transition-all"
                  >
                    {showPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22" /></svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                    )}
                  </button>
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn btn-primary w-full mt-2" style={{ height: 50, fontSize: "1.6rem", fontWeight: 700 }}>
                {loading
                  ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full block" style={{ animation: "spin 0.7s linear infinite" }} />
                  : "Injira"
                }
              </button>
            </form>

            <p className="mt-6 text-center text-[1.3rem] text-[#202842]/55">
              Ntakonti ufite?{" "}
              <Link href="/register" className="text-[#5d6eff] font-bold hover:underline">Fungura konti</Link>
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
