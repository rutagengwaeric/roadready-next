"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Profile Form
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profileMsg, setProfileMsg] = useState("");
  const [profileErr, setProfileErr] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);

  // Password Form
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPwd, setShowCurrentPwd] = useState(false);
  const [showNewPwd, setShowNewPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [pwdMsg, setPwdMsg] = useState("");
  const [pwdErr, setPwdErr] = useState("");
  const [savingPwd, setSavingPwd] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      const res = await fetch("/api/user/profile");
      if (!res.ok) {
        if (res.status === 401) router.push("/login");
        return;
      }
      const data = await res.json();
      setUser(data);
      setUsername(data.username || "");
      setEmail(data.email || "");
      setPhone(data.phone || "");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleProfileUpdate(e: React.FormEvent) {
    e.preventDefault();
    setSavingProfile(true);
    setProfileMsg("");
    setProfileErr("");
    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, phone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Byanze, ongera ugeregeze");
      setProfileMsg("Umwirondoro wawe wahinduwe neza!");
      fetchProfile(); // refresh
    } catch (err: any) {
      setProfileErr(err.message);
    } finally {
      setSavingProfile(false);
    }
  }

  async function handlePasswordUpdate(e: React.FormEvent) {
    e.preventDefault();
    setSavingPwd(true);
    setPwdMsg("");
    setPwdErr("");

    if (newPassword !== confirmPassword) {
      setPwdErr("Ijambo ry'ibanga rishya ntirihura. Ongera urebe.");
      setSavingPwd(false);
      return;
    }

    try {
      const res = await fetch("/api/user/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Habaye ikibazo mu guhindura ijambo ry'ibanga");

      setPwdMsg("Ijambo ry'ibanga ryahinduwe neza!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setPwdErr(err.message);
    } finally {
      setSavingPwd(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f9f9fb] flex flex-col pt-20 px-6 items-center">
        <div className="w-10 h-10 border-4 border-[#5d6eff]/30 border-t-[#5d6eff] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9f9fb] flex flex-col font-[inherit] text-[#202842]">
      {/* ── HEADER ── */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-[#ece8e8] flex items-center px-4 md:px-8 z-40 justify-between">
        <Link href="/app" className="shrink-0 group flex items-center gap-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#202842]/50 group-hover:text-[#5d6eff] transition-colors"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
          <span className="font-semibold text-[1.4rem] text-[#202842]/70 group-hover:text-[#5d6eff] transition-colors hidden sm:block">Subira inyuma</span>
        </Link>
        <div className="flex items-center gap-4">
          <button onClick={handleLogout} className="flex items-center gap-2 text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors font-semibold text-[1.3rem]">
            Sohoka <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
          </button>
        </div>
      </header>

      <main className="flex-1 w-full max-w-[900px] mx-auto px-6 py-28 gap-8 grid md:grid-cols-[1fr_340px]">
        {/* Left Column - Forms */}
        <div className="flex flex-col gap-8">

          {/* General Info */}
          <section className="bg-white rounded-2xl p-6 md:p-8 border border-[#ece8e8]" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
            <h2 className="text-[2rem] font-bold mb-2">Umwirondoro wawe</h2>
            <p className="text-[1.4rem] text-[#202842]/60 mb-6 border-b border-[#ece8e8] pb-6">
              Hindura amazina yawe cg imeyiri niba byarahindutse.
            </p>

            {profileErr && (
              <div className="bg-[#fef2f2] text-[#b91c1c] px-4 py-3 rounded-xl mb-6 text-[1.3rem]">
                {profileErr}
              </div>
            )}

            {profileMsg && (
              <div className="bg-[#ecfdf5] text-[#047857] px-4 py-3 rounded-xl mb-6 text-[1.3rem]">
                {profileMsg}
              </div>
            )}

            <form onSubmit={handleProfileUpdate} className="flex flex-col gap-5">
              <div>
                <label className="block text-[1.3rem] font-semibold mb-2">Amazina</label>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} required className="w-full bg-[#f8f7ff] border border-[#ece8e8] rounded-xl px-4 py-3 text-[1.4rem] outline-none focus:border-[#5d6eff] focus:bg-white transition-colors" />
              </div>
              <div>
                <label className="block text-[1.3rem] font-semibold mb-2">Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full bg-[#f8f7ff] border border-[#ece8e8] rounded-xl px-4 py-3 text-[1.4rem] outline-none focus:border-[#5d6eff] focus:bg-white transition-colors" />
              </div>
              <div>
                <label className="block text-[1.3rem] font-semibold mb-2">Telefoni</label>
                <div className="flex rounded-xl overflow-hidden border border-[#ece8e8] focus-within:border-[#5d6eff]">
                  <span className="flex items-center px-4 bg-[#f0f2ff] text-[#5d6eff] font-bold border-r border-[#ece8e8]">+250</span>
                  <input type="text" value={phone.replace('250', '')} onChange={e => setPhone(`250${e.target.value}`)} required disabled className="flex-1 bg-gray-50 px-4 py-3 text-[1.4rem] outline-none text-[#202842]/50" />
                </div>
                <p className="text-[1.1rem] mt-1 text-[#202842]/40">Numero ya telefoni ntishobora guhindurwa.</p>
              </div>
              <button type="submit" disabled={savingProfile} className="btn btn-primary self-start mt-2 px-8" style={{ height: 46, fontSize: "1.4rem" }}>
                {savingProfile ? "Tegereza..." : "Bika impinduka"}
              </button>
            </form>
          </section>

          {/* Password Reset */}
          <section className="bg-white rounded-2xl p-6 md:p-8 border border-[#ece8e8]" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
            <h2 className="text-[2rem] font-bold mb-2">Ijambo ry'ibanga</h2>
            <p className="text-[1.4rem] text-[#202842]/60 mb-6 border-b border-[#ece8e8] pb-6">
              Kugira umutekano w'imibare wibuke guhindura ijambo ry'ibanga buri gihe.
            </p>

            {pwdErr && (
              <div className="bg-[#fef2f2] text-[#b91c1c] px-4 py-3 rounded-xl mb-6 text-[1.3rem]">
                {pwdErr}
              </div>
            )}

            {pwdMsg && (
              <div className="bg-[#ecfdf5] text-[#047857] px-4 py-3 rounded-xl mb-6 text-[1.3rem]">
                {pwdMsg}
              </div>
            )}

            <form onSubmit={handlePasswordUpdate} className="flex flex-col gap-5">
              <div>
                <label className="block text-[1.3rem] font-semibold mb-2">Ijambo ry'ibanga ryicyo gihe</label>
                <div className="relative">
                  <input type={showCurrentPwd ? "text" : "password"} value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required className="w-full bg-[#f8f7ff] border border-[#ece8e8] rounded-xl px-4 py-3 pr-12 text-[1.4rem] outline-none focus:border-[#5d6eff] focus:bg-white transition-colors" />
                  <button type="button" onClick={() => setShowCurrentPwd(!showCurrentPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#202842]/40 hover:text-[#5d6eff] hover:bg-[#5d6eff]/10 p-1.5 rounded-lg transition-all">
                    {showCurrentPwd ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22" /></svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-[1.3rem] font-semibold mb-2">Ijambo ry'ibanga rishya</label>
                <div className="relative">
                  <input type={showNewPwd ? "text" : "password"} value={newPassword} onChange={e => setNewPassword(e.target.value)} required className="w-full bg-[#f8f7ff] border border-[#ece8e8] rounded-xl px-4 py-3 pr-12 text-[1.4rem] outline-none focus:border-[#5d6eff] focus:bg-white transition-colors" />
                  <button type="button" onClick={() => setShowNewPwd(!showNewPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#202842]/40 hover:text-[#5d6eff] hover:bg-[#5d6eff]/10 p-1.5 rounded-lg transition-all">
                    {showNewPwd ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22" /></svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-[1.3rem] font-semibold mb-2">Emeza iryashya</label>
                <div className="relative">
                  <input type={showConfirmPwd ? "text" : "password"} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="w-full bg-[#f8f7ff] border border-[#ece8e8] rounded-xl px-4 py-3 pr-12 text-[1.4rem] outline-none focus:border-[#5d6eff] focus:bg-white transition-colors" />
                  <button type="button" onClick={() => setShowConfirmPwd(!showConfirmPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#202842]/40 hover:text-[#5d6eff] hover:bg-[#5d6eff]/10 p-1.5 rounded-lg transition-all">
                    {showConfirmPwd ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22" /></svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                    )}
                  </button>
                </div>
              </div>
              <button type="submit" disabled={savingPwd || !currentPassword || !newPassword} className="btn bg-[#202842] text-white hover:bg-black self-start mt-2 px-8" style={{ height: 46, fontSize: "1.4rem" }}>
                {savingPwd ? "Tegereza..." : "Hindura ijambo ry'ibanga"}
              </button>
            </form>
          </section>

        </div>

        {/* Right Column - Sub & Stats */}
        <div className="flex flex-col gap-6">
          <section className="bg-gradient-to-br from-[#1a1f3c] to-[#0f1225] text-white rounded-2xl p-6 md:p-8" style={{ boxShadow: "0 10px 40px rgba(93,110,255,0.15)" }}>
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#5d6eff] to-[#818cf8] flex items-center justify-center text-[2.6rem] font-bold mb-4">
              {user?.username?.charAt(0).toUpperCase()}
            </div>
            <h3 className="text-[2.2rem] font-bold">{user?.username}</h3>
            <p className="text-white/60 text-[1.4rem] mb-6">{user?.email}</p>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <p className="text-white/40 uppercase tracking-widest text-[1.1rem] font-bold mb-1">Status y'Ifatabuguzi</p>
              {user?.hasActiveSubscription ? (
                <>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2.5 h-2.5 bg-[#34d399] rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)] animate-pulse"></span>
                    <span className="text-[1.5rem] font-bold text-[#34d399]">Ifite Agaciro</span>
                  </div>
                  <p className="text-[1.3rem] text-white/70">Ikizakora kugeza: {new Date(user?.subscriptionEnd).toLocaleDateString()}</p>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#f87171] rounded-full"></span>
                  <span className="text-[1.5rem] font-bold text-[#f87171]">Ntabwo ifite agaciro</span>
                </div>
              )}
            </div>
          </section>

          <section className="bg-white rounded-2xl p-6 md:p-8 border border-[#ece8e8]" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
            <h3 className="text-[1.8rem] font-bold mb-4">Imibare Y'ibizami</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#f8f7ff] rounded-xl p-4 text-center border border-[#ece8e8]">
                <p className="text-[1.2rem] text-[#202842]/50 font-semibold uppercase mb-1">Ibizami</p>
                <p className="text-[2.6rem] font-black text-[#5d6eff]">{user?.totalTests || 0}</p>
              </div>
              <div className="bg-[#f8f7ff] rounded-xl p-4 text-center border border-[#ece8e8]">
                <p className="text-[1.2rem] text-[#202842]/50 font-semibold uppercase mb-1">Keywords</p>
                <p className="text-[2.6rem] font-black text-[#5d6eff]">{user?.totalKeywords || 0}</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
