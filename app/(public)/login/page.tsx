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
    <div className="min-h-screen bg-[#f9f5ff] flex flex-col">
      {/* Back link */}
      <Link href="/" className="absolute top-[3%] left-[4%] bg-white shadow-[0_0_2px_rgba(0,0,0,0.25)] grid place-items-center px-2 py-1 rounded-lg">
        <Image src="/assets/images/icons/full logo.svg" alt="RoadReady" width={90} height={32} className="object-contain" />
      </Link>

      <div className="flex-1 flex items-center justify-center px-4 pt-20 pb-10">
        <div className="w-full max-w-[370px]">
          {/* Logo */}
          <div className="text-center mb-6">
            <Image src="/assets/images/icons/full logo.svg" alt="RoadReady" width={140} height={50} className="object-contain mx-auto mb-3 block" />
            <h1 className="text-[2.2rem] font-medium text-[#202842]">Injira muri Konte yawe</h1>
          </div>

          <div className="bg-white rounded-xl shadow-[0_0_2px_rgba(0,0,0,0.25)] px-5 pt-5 pb-7">
            {error && (
              <div className="mb-5 bg-[rgb(238,158,155)] rounded px-2 py-2.5 text-[1.3rem]">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-[15px]">
              <div className="flex flex-col gap-1">
                <label className="text-[1.3rem] font-medium tracking-[0.5px]">Nomero ya telefoni</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-lg border border-[#c3c3c3] border-r-0 bg-[#f0effe] text-[#5d6eff] text-[1.4rem] font-medium shrink-0">
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

              <div className="flex flex-col gap-1">
                <label className="text-[1.3rem] font-medium tracking-[0.5px]">Ijambo ry&apos;ibanga</label>
                <input
                  type="password"
                  placeholder="Andika Ijambo ry'ibanga"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="input-field"
                  required
                />
                <div className="text-right mt-0.5">
                  <Link href="/forgot-password" className="text-[1.2rem] text-[#5d6eff] font-semibold">
                    Wibagiwe ijambo ry&apos;ibanga?
                  </Link>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary mt-2"
                style={{ height: 45, fontSize: "1.5rem" }}
              >
                {loading ? (
                  <span style={{ width: 20, height: 20, border: "3px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", display: "block", animation: "spin 0.7s linear infinite" }} />
                ) : "Injira"}
              </button>
            </form>

            <p className="mt-5 text-center text-[1.3rem] text-[#202842]/65">
              Ntakonti ufite?{" "}
              <Link href="/register" className="text-[#5d6eff] font-semibold">Yifungure</Link>
            </p>
          </div>
        </div>
      </div>

      <footer className="app-footer">
        <p>&copy; Copyright 2025 RoadReady - A Binary Solutions Company.</p>
        <p>Designed By ClaroCreatives</p>
      </footer>
    </div>
  );
}
