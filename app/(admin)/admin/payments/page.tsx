import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function AdminPaymentsPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const params = await searchParams;
  const page = Number(params.page || 1);
  const limit = 20;
  const now = new Date();

  const [payments, total] = await Promise.all([
    prisma.payment.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { paymentDate: "desc" },
      include: { user: { select: { username: true, phone: true } } },
    }),
    prisma.payment.count(),
  ]);

  const totalRevenue = await prisma.payment.aggregate({ _sum: { amountPaid: true } });
  const pages = Math.ceil(total / limit);

  const planLabel = (amount: number) => {
    if (amount === 900) return "Bronze (1 Day)";
    if (amount === 2000) return "Silver (1 Week)";
    if (amount === 3000) return "Gold (2 Weeks)";
    if (amount === 5000) return "Diamond (1 Month)";
    return `${amount} RWF`;
  };

  return (
    <div className="min-h-screen bg-gray-900 flex">
      <aside className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col p-6 fixed h-full">
        <div className="mb-8">
          <span className="text-xl font-bold text-white">Road<span className="text-[#5d63ff]">Ready</span></span>
          <p className="text-xs text-gray-400 mt-1">Admin Panel</p>
        </div>
        <nav className="space-y-1 flex-1">
          {[{ href: "/admin", label: "Dashboard", icon: "📊" }, { href: "/admin/users", label: "Abakoresha", icon: "👥" }, { href: "/admin/payments", label: "Payments", icon: "💳" }].map(item => (
            <Link key={item.href} href={item.href} className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-gray-700 hover:text-white transition-colors text-sm font-medium">
              <span>{item.icon}</span>{item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 ml-64 p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Payments Zose</h1>
            <p className="text-gray-400 text-sm mt-1">Revenue yose: <span className="text-green-400 font-semibold">{Number(totalRevenue._sum.amountPaid ?? 0).toLocaleString()} RWF</span></p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="px-5 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Umukoresha</th>
                  <th className="px-5 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Plan</th>
                  <th className="px-5 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Ref</th>
                  <th className="px-5 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Igihe</th>
                  <th className="px-5 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {payments.map(p => {
                  const active = new Date(p.paymentExpirationDate) >= now;
                  return (
                    <tr key={p.id} className="hover:bg-gray-750 transition-colors">
                      <td className="px-5 py-4">
                        <p className="text-white font-medium text-sm">{p.user.username}</p>
                        <p className="text-gray-400 text-xs mt-0.5">{p.user.phone}</p>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-white text-sm font-medium">{planLabel(Number(p.amountPaid))}</span>
                      </td>
                      <td className="px-5 py-4 text-gray-400 text-xs font-mono">{p.paymentRef.slice(0, 16)}...</td>
                      <td className="px-5 py-4 text-gray-400 text-xs">
                        <p>{new Date(p.paymentDate).toLocaleDateString()}</p>
                        <p className="mt-0.5">→ {new Date(p.paymentExpirationDate).toLocaleDateString()}</p>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${active ? "bg-green-900/40 text-green-400" : "bg-gray-700 text-gray-400"}`}>
                          {active ? "● Ifite" : "Irangiranye"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {payments.length === 0 && <div className="py-12 text-center text-gray-500">Nta payment iboneka.</div>}
        </div>

        {pages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
              <Link key={p} href={`/admin/payments?page=${p}`} className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-medium transition-colors ${p === page ? "bg-[#5d63ff] text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700 border border-gray-700"}`}>{p}</Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
