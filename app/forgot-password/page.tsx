"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setError("");

        try {
            const res = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Wibeshye imeyiri. Ongera ugerageze.");
            }

            setMessage("Yoherejwe! Reba muri email yawe kugira ngo uhindure ijambo ry'ibanga.");
            setEmail("");
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
                    <h1 className="text-[2.6rem] font-bold text-center mb-3">Wibagiwe ijambo ry'ibanga?</h1>
                    <p className="text-center text-[#202842]/60 text-[1.4rem] mb-8">
                        Andika email yawe hano tuguoherereze ubutumwa bwo guhindura ijambo ry'ibanga.
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

                    <form onSubmit={handleSubmit} className="grid gap-5">
                        <div>
                            <label className="block text-[1.3rem] font-semibold mb-2">Email</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Andika email yawe..."
                                className="w-full bg-[#f8f7ff] border border-[#ece8e8] rounded-xl px-4 py-3 text-[1.5rem] outline-none transition-colors focus:border-[#5d6eff] focus:bg-white"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !email}
                            className="btn btn-primary w-full mt-2"
                            style={{ height: 52, fontSize: "1.5rem", borderRadius: 12, display: "flex", justifyContent: "center" }}
                        >
                            {loading ? (
                                <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                            ) : (
                                "Ohereza"
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
