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
    <div className="min-h-screen bg-[#f9f5ff] flex flex-col">
      <Link href="/" className="absolute top-[2%] left-[4%] bg-white shadow-[0_0_2px_rgba(0,0,0,0.25)] grid place-items-center px-2 py-1 rounded-lg">
        <Image src="/assets/images/icons/full logo.svg" alt="RoadReady" width={90} height={32} className="object-contain" />
      </Link>

      <div className="flex-1 flex items-center justify-center px-4 pt-20 pb-10">
        <div className="w-full max-w-[480px]">
          <div className="text-center mb-6">
            <Image src="/assets/images/icons/full logo.svg" alt="RoadReady" width={140} height={50} className="object-contain mx-auto mb-3 block" />
            <h1 className="text-[2.2rem] font-medium text-[#202842]">Fungura Konti Nshya</h1>
          </div>

          <div className="bg-white rounded-xl shadow-[0_0_2px_rgba(0,0,0,0.25)] px-5 pt-5 pb-7">
            {error && (
              <div className="mb-5 bg-[rgb(238,158,155)] rounded px-2 py-2.5 text-[1.3rem]">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-[14px]">
              {/* Name + Email row */}
              <div className="flex gap-3 flex-wrap">
                <div className="flex-1 basis-[160px] flex flex-col gap-1">
                  <label className="text-[1.3rem] font-medium tracking-[0.5px]">Amazina</label>
                  <input type="text" placeholder="Amazina yawe" value={form.username} onChange={e => update("username", e.target.value)} className="input-field" required />
                </div>
                <div className="flex-1 basis-[160px] flex flex-col gap-1">
                  <label className="text-[1.3rem] font-medium tracking-[0.5px]">Imeri</label>
                  <input type="email" placeholder="imeri@ishusho.com" value={form.email} onChange={e => update("email", e.target.value)} className="input-field" required />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[1.3rem] font-medium tracking-[0.5px]">Nomero ya telefoni</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-lg border border-[#c3c3c3] border-r-0 bg-[#f0effe] text-[#5d6eff] text-[1.4rem] font-medium shrink-0">
                    +250
                  </span>
                  <input type="number" placeholder="7xx xxx xxx" value={form.phone} onChange={e => update("phone", e.target.value)} className="input-field rounded-l-none" required />
                </div>
              </div>

              <div className="flex gap-3 flex-wrap">
                <div className="flex-1 basis-[160px] flex flex-col gap-1">
                  <label className="text-[1.3rem] font-medium tracking-[0.5px]">Ijambo ry&apos;ibanga</label>
                  <input type="password" placeholder="Nibura inyuguti 6" value={form.password} onChange={e => update("password", e.target.value)} className="input-field" required />
                </div>
                <div className="flex-1 basis-[160px] flex flex-col gap-1">
                  <label className="text-[1.3rem] font-medium tracking-[0.5px]">Ponovera</label>
                  <input type="password" placeholder="Ongera wandike" value={form.confirm} onChange={e => update("confirm", e.target.value)} className="input-field" required />
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn btn-primary mt-1.5" style={{ height: 45, fontSize: "1.5rem" }}>
                {loading ? (
                  <span style={{ width: 20, height: 20, border: "3px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", display: "block", animation: "spin 0.7s linear infinite" }} />
                ) : "Iyandikishe"}
              </button>
            </form>

            <p className="mt-5 text-center text-[1.3rem] text-[#202842]/65">
              Ufite konti?{" "}
              <Link href="/login" className="text-[#5d6eff] font-semibold">Injira</Link>
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
