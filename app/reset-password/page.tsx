"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function ResetPasswordPage() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setError("");

        if (password !== confirmPassword) {
            setError("Amagambo y'ibanga ntiyemeye kwisanganya. Ongera mbere.");
            setLoading(false);
            return;
        }

        if (!token) {
            setError("Kode iri mukaburagendo. Subira ahabanza urebe imeyiri yawe.");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Habaye ikibazo, ongera ugerageze.");
            }

            setMessage("Ijambo ry'ibanga ryahinduwe neza! Ugiye kwerekezwa ahabanza...");
            setTimeout(() => {
                router.push("/login");
            }, 2000);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-[#f9f5ff] min-h-screen text-[#202842] flex flex-col items-center justify-center p-6" style={{ fontFamily: "inherit" }}>
            <div className="w-full max-w-[420px]">
                <Link href="/" className="inline-block mb-10 text-center w-full">
                    <Image src="/assets/images/icons/full logo.svg" alt="RoadReady" width={140} height={48} className="mx-auto" />
                </Link>

                <div className="bg-white rounded-3xl p-8 md:p-10 border border-[#f0ecff]" style={{ boxShadow: "0 10px 40px rgba(0,0,0,0.06)" }}>
                    <h1 className="text-[2.6rem] font-bold text-center mb-3">Shyiraho iryashya</h1>
                    <p className="text-center text-[#202842]/60 text-[1.4rem] mb-8">
                        Shyiramo ijambo ry'ibanga rishya wakwibuka neza.
                    </p>

                    {error && (
                        <div className="bg-[#fef2f2] border border-[#fca5a5] text-[#b91c1c] px-4 py-3 rounded-xl mb-6 text-[1.3rem]">
                            {error}
                        </div>
                    )}

                    {message && (
                        <div className="bg-[#ecfdf5] border border-[#6ee7b7] text-[#047857] px-4 py-3 rounded-xl mb-6 text-[1.3rem]">
                            {message}
                        </div>
                    )}

                    {!token && !message && !error && (
                        <div className="bg-[#fffbeb] border border-[#fcd34d] text-[#b45309] px-4 py-3 rounded-xl mb-6 text-[1.3rem]">
                            Nta kode iboneka! Niba wibeshye ugafunga iyi page, ongera ujye muri email wemeze ubutumwa.
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="grid gap-5">
                        <div>
                            <label className="block text-[1.3rem] font-semibold mb-2">Ijambo ry'ibanga rishya</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="********"
                                    className="w-full bg-[#f8f7ff] border border-[#ece8e8] rounded-xl px-4 py-3 pr-12 text-[1.5rem] outline-none transition-colors focus:border-[#5d6eff] focus:bg-white"
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

                        <div>
                            <label className="block text-[1.3rem] font-semibold mb-2">Ongera ijambo ry'ibanga</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="********"
                                    className="w-full bg-[#f8f7ff] border border-[#ece8e8] rounded-xl px-4 py-3 pr-12 text-[1.5rem] outline-none transition-colors focus:border-[#5d6eff] focus:bg-white"
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

                        <button
                            type="submit"
                            disabled={loading || !password || !confirmPassword || !token}
                            className="btn btn-primary w-full mt-2"
                            style={{ height: 52, fontSize: "1.5rem", borderRadius: 12, display: "flex", justifyContent: "center" }}
                        >
                            {loading ? (
                                <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                            ) : (
                                "Hindura ijambo ry'ibanga"
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-[1.4rem]">
                        <Link href="/login" className="text-[#5d6eff] font-semibold hover:underline">
                            Sohoka usubire ahabanza
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
