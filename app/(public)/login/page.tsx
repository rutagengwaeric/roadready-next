"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
    <div className="min-h-screen bg-[#f2f3f7] flex flex-col">
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-[680px]">

          {/* Logo */}
          <Link href="/" className="flex justify-center mb-6">
            <Image src="/assets/images/icons/full logo.svg" alt="RoadReady" width={130} height={46} className="object-contain" />
          </Link>

          {/* Card */}
          <div className="bg-white rounded-[24px] overflow-hidden flex border border-[#e2e2e2]"
               style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>

            {/* Left — banner image, hidden on small screens */}
            <div className="hidden sm:block w-[44%] shrink-0">
              <Image src="/assets/images/form-banner.jpg" alt="" width={320} height={480}
                className="w-full h-full object-cover" />
            </div>

            {/* Right — form */}
            <div className="flex-1 px-7 py-8">
              <h1 className="text-[2rem] font-bold text-center text-[#0b0b0b] mb-6">
                Injira muri Konte yawe
              </h1>

              {error && (
                <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-[1.3rem] px-3 py-2.5 rounded-lg">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-[1.3rem] font-medium mb-1.5 text-[#202842]">
                    Nomero ya telefoni
                  </label>
                  <div className="flex">
                    <span className="flex items-center px-3 bg-[#f0effe] text-[#5d6eff] text-[1.4rem] font-semibold border border-[#c3c3c3] border-r-0 rounded-l-lg shrink-0">
                      +250
                    </span>
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
                  <label className="block text-[1.3rem] font-medium mb-1.5 text-[#202842]">
                    Ijambo ry&apos;ibanga
                  </label>
                  <input
                    type="password"
                    placeholder="Andika ijambo ry'ibanga"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="input-field"
                    required
                  />
                  <div className="text-right mt-1">
                    <Link href="/forgot-password" className="text-[1.2rem] text-[#5d6eff] font-medium">
                      Wibagiwe ijambo ry&apos;ibanga?
                    </Link>
                  </div>
                </div>

                <button type="submit" disabled={loading} className="btn btn-primary w-full mt-1" style={{ height: 46, fontSize: "1.5rem" }}>
                  {loading
                    ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full block" style={{ animation: "spin 0.7s linear infinite" }} />
                    : "Injira"
                  }
                </button>
              </form>

              <p className="mt-5 text-center text-[1.3rem] text-[#202842]/60">
                Ntakonti ufite?{" "}
                <Link href="/register" className="text-[#5d6eff] font-semibold">Yifungure</Link>
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
