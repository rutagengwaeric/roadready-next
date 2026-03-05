import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getUser, hasActivePayment } from "@/lib/auth";
import prisma from "@/lib/prisma";

export default async function AppDashboard() {
  const user = await getUser();
  if (!user) redirect("/login");

  const paid = await hasActivePayment(user.id);
  if (!paid) redirect("/payment");

  const payment = await prisma.payment.findFirst({
    where: { userId: user.id, paymentExpirationDate: { gte: new Date() } },
    orderBy: { paymentExpirationDate: "desc" },
  });

  const testResults = await prisma.testResult.findMany({ where: { userId: user.id } });
  const keywordResults = await prisma.keywordResult.findMany({ where: { userId: user.id } });

  const doneTests = testResults.length;
  const doneKeywords = keywordResults.length;

  const expiresIn = payment
    ? Math.ceil((new Date(payment.paymentExpirationDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : 0;

  const expiryStr = payment
    ? new Date(payment.paymentExpirationDate).toLocaleDateString("fr-RW", { day: "2-digit", month: "long", year: "numeric" })
    : "";

  return (
    <div className="min-h-screen bg-[#f9f5ff] flex flex-col">
      {/* TOP BAR */}
      <div className="bg-white border-b border-[#eee] sticky top-0 z-[100]">
        <div className="max-w-[640px] mx-auto px-4 h-[60px] flex items-center justify-between">
          <Image src="/assets/images/icons/full logo.svg" alt="RoadReady" width={110} height={40} className="object-contain" />
          <div className="flex items-center gap-3">
            <span className="text-[1.3rem] text-[#202842]/65">
              Muraho, <strong className="text-[#202842]">{user.username}</strong>
            </span>
            <form action="/api/auth/logout" method="POST">
              <button className="text-[1.2rem] text-[#202842]/50 hover:text-red-500 transition-colors">
                Sohoka
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-[640px] mx-auto px-4 pt-6 pb-6 flex-1 w-full">
        {/* Plan card */}
        {payment && (
          <div className="bg-white border border-[#e8e4ff] rounded-xl p-4 mb-5" style={{ boxShadow: "0 4px 14px rgba(0,0,0,0.06)" }}>
            <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
              <span className="bg-[#d2d7ff] text-[#5d6eff] px-[10px] py-1 rounded border border-[#4f75ff] font-semibold text-[1.5rem]">
                Subscription
              </span>
              {expiresIn <= 3 && (
                <Link href="/payment" className="bg-[#fff7ed] text-[#c05621] border border-[#fbd38d] rounded px-[10px] py-1 text-[1.2rem] font-semibold">
                  Ongera Subscription
                </Link>
              )}
            </div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[1.3rem] text-[#202842]/60">Iminsi isigaye</span>
              <span className="text-[1.3rem] text-[#202842]/60">Irangira kuwa</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <strong className="text-[2rem] text-[#5d6eff]">{expiresIn > 0 ? `${expiresIn} Iminsi` : "Irangiye uyu munsi"}</strong>
              <span className="text-[1.4rem] text-[#5d6eff]">{expiryStr}</span>
            </div>

            {/* Progress */}
            <div className="flex justify-between mb-1.5">
              <span className="text-[1.2rem] font-medium">Ibizami</span>
              <span className="text-[1.2rem] text-[#5d6eff]">{doneTests} / 20</span>
            </div>
            <div className="progress-bar mb-3">
              <div className="line" style={{ width: `${(doneTests / 20) * 100}%` }} />
              <div className="circle" style={{ left: `calc(${(doneTests / 20) * 100}% - 9px)`, right: "unset" }} />
            </div>

            <div className="flex justify-between mb-1.5">
              <span className="text-[1.2rem] font-medium">Amagambo</span>
              <span className="text-[1.2rem] text-[#5d6eff]">{doneKeywords} / 4</span>
            </div>
            <div className="progress-bar">
              <div className="line" style={{ width: `${(doneKeywords / 4) * 100}%` }} />
              <div className="circle" style={{ left: `calc(${(doneKeywords / 4) * 100}% - 9px)`, right: "unset" }} />
            </div>
          </div>
        )}

        {/* Test type cards */}
        <h2 className="text-[1.8rem] font-bold mb-4 text-[#202842]">Hitamo Ikizami</h2>

        <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}>
          {/* Ibizami card */}
          <Link href="/levels?test=tests" className="test-card">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-[10px] bg-[#eeefff] grid place-items-center">
                <Image src="/assets/images/icons/Document.svg" alt="" width={24} height={24} />
              </div>
              <h3 className="text-[1.8rem] font-bold text-[#202842]">Ibizami</h3>
            </div>
            <p className="text-[1.3rem] text-[#202842]/60 mb-[14px]">Amabwiriza y&apos;umuhanda — ibizami 20</p>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[1.2rem] text-[#5d6eff] font-semibold">{doneTests}/20 bizami birangiye</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5d6eff" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
            </div>
            <div className="progress-bar">
              <div className="line" style={{ width: `${(doneTests / 20) * 100}%` }} />
            </div>
          </Link>

          {/* Amagambo card */}
          <Link href="/levels?test=keywords" className="test-card">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-[10px] bg-[#e6f9f8] grid place-items-center">
                <Image src="/assets/images/icons/Notification.svg" alt="" width={24} height={24} />
              </div>
              <h3 className="text-[1.8rem] font-bold text-[#202842]">Amagambo</h3>
            </div>
            <p className="text-[1.3rem] text-[#202842]/60 mb-[14px]">Vocabulaire — ibizami 4</p>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[1.2rem] text-[#0ad4c8] font-semibold">{doneKeywords}/4 bizami birangiye</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0ad4c8" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
            </div>
            <div className="progress-bar" style={{ backgroundColor: "#a0e8e4" }}>
              <div className="line" style={{ width: `${(doneKeywords / 4) * 100}%`, backgroundColor: "#0ad4c8" }} />
            </div>
          </Link>
        </div>

        {/* Renew warning */}
        {expiresIn > 0 && expiresIn <= 3 && (
          <Link href="/payment" className="block mt-5 bg-[#fff7ed] border border-[#fbd38d] rounded-[10px] p-4 no-underline">
            <p className="font-bold text-[#c05621] text-[1.5rem]">Subscription yawe irimo kurangira!</p>
            <p className="text-[#dd6b20] text-[1.3rem] mt-1">Kanda hano kugirango uyongere →</p>
          </Link>
        )}
      </div>

      <footer className="app-footer">
        <p>&copy; Copyright 2025 RoadReady - A Binary Solutions Company.</p>
        <p>Designed By ClaroCreatives</p>
      </footer>
    </div>
  );
}
