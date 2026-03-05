import { redirect } from "next/navigation";
import Link from "next/link";
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

  const maxTest = testResults.length > 0 ? Math.max(...testResults.map(r => r.testNumber)) : 0;
  const maxKeyword = keywordResults.length > 0 ? Math.max(...keywordResults.map(r => r.testNumber)) : 0;

  const expiresIn = payment
    ? Math.ceil((new Date(payment.paymentExpirationDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <span className="text-xl font-bold text-[#5d63ff]">Road<span className="text-gray-800">Ready</span></span>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 hidden sm:block">Muraho, {user.username}</span>
            <form action="/api/auth/logout" method="POST">
              <button className="text-xs text-gray-400 hover:text-red-500 transition-colors">Sohoka</button>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        {/* Subscription badge */}
        {payment && (
          <div className="bg-gradient-to-r from-[#5d63ff] to-purple-500 rounded-2xl p-5 text-white">
            <p className="text-sm opacity-80">Subscription yawe</p>
            <p className="text-2xl font-bold mt-1">
              {expiresIn > 0 ? `Iminsi ${expiresIn} isigaye` : "Irangiye uyu munsi"}
            </p>
            <p className="text-sm opacity-70 mt-1">
              Irangira: {new Date(payment.paymentExpirationDate).toLocaleDateString("rw-RW")}
            </p>
          </div>
        )}

        {/* Test cards */}
        <h2 className="text-lg font-bold text-gray-900">Hitamo Ikizami</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Link href="/levels?test=tests" className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md hover:border-[#5d63ff]/30 transition-all group">
            <div className="w-12 h-12 bg-[#5d63ff]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#5d63ff]/20 transition-colors">
              <svg className="w-6 h-6 text-[#5d63ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Ibizami</h3>
            <p className="text-sm text-gray-500">Amabwiriza y'umuhanda - ibizami 20</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-[#5d63ff] font-medium">{maxTest}/20 bizami birangiye</span>
              <svg className="w-5 h-5 text-[#5d63ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            {/* Progress bar */}
            <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#5d63ff] rounded-full transition-all" style={{ width: `${(maxTest / 20) * 100}%` }} />
            </div>
          </Link>

          <Link href="/levels?test=keywords" className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md hover:border-emerald-300 transition-all group">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Amagambo Ngenderwaho</h3>
            <p className="text-sm text-gray-500">Vocabulaire - ibizami 4</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-emerald-600 font-medium">{maxKeyword}/4 bizami birangiye</span>
              <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${(maxKeyword / 4) * 100}%` }} />
            </div>
          </Link>
        </div>

        {/* Renew subscription */}
        {expiresIn <= 3 && (
          <Link href="/payment" className="block bg-amber-50 border border-amber-200 rounded-2xl p-5 hover:bg-amber-100 transition-colors">
            <p className="font-semibold text-amber-800">Subscription yawe irimo kurangira!</p>
            <p className="text-sm text-amber-600 mt-1">Kanda hano kugirango uyongere →</p>
          </Link>
        )}
      </div>
    </div>
  );
}
