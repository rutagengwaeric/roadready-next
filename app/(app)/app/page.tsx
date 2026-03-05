import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getUser, hasActivePayment } from "@/lib/auth";
import prisma from "@/lib/prisma";

export default async function AppDashboard() {
  const user = await getUser();
  if (!user) redirect("/login");
  if (!(await hasActivePayment(user.id))) redirect("/payment");

  const payment = await prisma.payment.findFirst({
    where: { userId: user.id, paymentExpirationDate: { gte: new Date() } },
    orderBy: { paymentExpirationDate: "desc" },
  });

  const [testResults, keywordResults] = await Promise.all([
    prisma.testResult.findMany({ where: { userId: user.id } }),
    prisma.keywordResult.findMany({ where: { userId: user.id } }),
  ]);

  const doneTests = testResults.length;
  const doneKeywords = keywordResults.length;

  const expiresIn = payment
    ? Math.ceil((new Date(payment.paymentExpirationDate).getTime() - Date.now()) / 86_400_000)
    : 0;
  const expiryStr = payment
    ? new Date(payment.paymentExpirationDate).toLocaleDateString("fr-RW", { day: "2-digit", month: "long", year: "numeric" })
    : "";

  return (
    <div className="min-h-screen bg-[#f9f5ff] flex flex-col">

      {/* Top bar */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40" style={{ boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
        <div className="max-w-[640px] mx-auto px-4 h-[60px] flex items-center justify-between gap-3">
          <Image src="/assets/images/icons/full logo.svg" alt="RoadReady" width={110} height={38} className="object-contain shrink-0" />

          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-full bg-[#eef0ff] shrink-0 grid place-items-center">
              <span className="text-[1.3rem] font-bold text-[#5d6eff] leading-none select-none">
                {user.username.charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="text-[1.3rem] text-[#202842] font-semibold truncate hidden sm:block max-w-[140px]">
              {user.username}
            </span>
            <form action="/api/auth/logout" method="POST" className="shrink-0">
              <button
                className="flex items-center gap-1.5 text-[1.2rem] font-medium text-[#202842]/45 hover:text-red-500 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-red-50"
                title="Sohoka"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                <span className="hidden sm:inline">Sohoka</span>
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="max-w-[640px] mx-auto w-full px-4 py-6 flex-1 flex flex-col gap-5">

        {/* Subscription card */}
        {payment && (
          <div className="bg-white rounded-2xl border border-[#e8e4ff] p-5"
               style={{ boxShadow: "0 4px 20px rgba(93,110,255,0.08)" }}>
            <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
              <span className="bg-[#d2d7ff] text-[#5d6eff] text-[1.4rem] font-bold px-3 py-1 rounded-lg border border-[#b3c0ff]">
                Subscription
              </span>
              {expiresIn <= 3 && (
                <Link href="/payment"
                  className="text-[1.2rem] font-semibold px-3 py-1 rounded-lg border"
                  style={{ background: "#fff7ed", color: "#c05621", borderColor: "#fbd38d" }}>
                  Ongera Subscription →
                </Link>
              )}
            </div>

            <div className="flex justify-between text-[1.3rem] text-[#202842]/55 mb-1">
              <span>Iminsi isigaye</span>
              <span>Irangira kuwa</span>
            </div>
            <div className="flex justify-between items-center mb-5">
              <strong className="text-[2rem] text-[#5d6eff] font-bold">
                {expiresIn > 0 ? `${expiresIn} Iminsi` : "Irangiye uyu munsi"}
              </strong>
              <span className="text-[1.4rem] text-[#5d6eff]">{expiryStr}</span>
            </div>

            {/* Ibizami progress */}
            <div className="flex justify-between text-[1.2rem] font-medium mb-1.5">
              <span>Ibizami</span>
              <span className="text-[#5d6eff]">{doneTests} / 20</span>
            </div>
            <div className="progress-bar mb-4">
              <div className="line" style={{ width: `${(doneTests / 20) * 100}%` }} />
              <div className="circle" style={{ left: `calc(${(doneTests / 20) * 100}% - 9px)`, right: "unset" }} />
            </div>

            {/* Amagambo progress */}
            <div className="flex justify-between text-[1.2rem] font-medium mb-1.5">
              <span>Amagambo</span>
              <span className="text-[#5d6eff]">{doneKeywords} / 4</span>
            </div>
            <div className="progress-bar">
              <div className="line" style={{ width: `${(doneKeywords / 4) * 100}%` }} />
              <div className="circle" style={{ left: `calc(${(doneKeywords / 4) * 100}% - 9px)`, right: "unset" }} />
            </div>
          </div>
        )}

        {/* Choose a test */}
        <div>
          <h2 className="text-[1.8rem] font-bold text-[#202842] mb-3">Hitamo Ikizami</h2>
          <div className="grid sm:grid-cols-2 gap-4">

            <Link href="/levels?test=tests" className="test-card">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 rounded-[10px] bg-[#eeefff] grid place-items-center shrink-0">
                  <Image src="/assets/images/icons/Document.svg" alt="" width={24} height={24} />
                </div>
                <h3 className="text-[1.7rem] font-bold">Ibizami</h3>
              </div>
              <p className="text-[1.3rem] text-[#202842]/55 mb-3">Amabwiriza y&apos;umuhanda — ibizami 20</p>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[1.2rem] text-[#5d6eff] font-semibold">{doneTests}/20 bizami birangiye</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5d6eff" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
              <div className="progress-bar">
                <div className="line" style={{ width: `${(doneTests / 20) * 100}%` }} />
              </div>
            </Link>

            <Link href="/levels?test=keywords" className="test-card">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 rounded-[10px] bg-[#e6f9f8] grid place-items-center shrink-0">
                  <Image src="/assets/images/icons/Notification.svg" alt="" width={24} height={24} />
                </div>
                <h3 className="text-[1.7rem] font-bold">Amagambo</h3>
              </div>
              <p className="text-[1.3rem] text-[#202842]/55 mb-3">Vocabulaire — ibizami 4</p>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[1.2rem] text-[#0ad4c8] font-semibold">{doneKeywords}/4 bizami birangiye</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0ad4c8" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
              <div className="progress-bar" style={{ backgroundColor: "#a0e8e4" }}>
                <div className="line" style={{ width: `${(doneKeywords / 4) * 100}%`, backgroundColor: "#0ad4c8" }} />
              </div>
            </Link>
          </div>
        </div>

        {/* Expiry warning */}
        {expiresIn > 0 && expiresIn <= 3 && (
          <Link href="/payment"
            className="block bg-[#fff7ed] border border-[#fbd38d] rounded-xl p-4">
            <p className="font-bold text-[#c05621] text-[1.5rem]">Subscription yawe irimo kurangira!</p>
            <p className="text-[#dd6b20] text-[1.3rem] mt-1">Kanda hano kugirango uyongere →</p>
          </Link>
        )}
      </div>

      <footer className="app-footer">
        <p>&copy; Copyright 2025 RoadReady — A Binary Solutions Company.</p>
        <p>Designed By Binary Solutions</p>
      </footer>
    </div>
  );
}
