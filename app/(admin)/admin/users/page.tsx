import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function AdminUsersPage({ searchParams }: { searchParams: Promise<{ page?: string; search?: string }> }) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const params = await searchParams;
  const page = Number(params.page || 1);
  const search = params.search || "";
  const limit = 20;

  const where = search
    ? { OR: [{ username: { contains: search, mode: "insensitive" as const } }, { phone: { contains: search } }, { email: { contains: search, mode: "insensitive" as const } }] }
    : {};

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: { payments: { orderBy: { paymentExpirationDate: "desc" }, take: 1 } },
    }),
    prisma.user.count({ where }),
  ]);

  const pages = Math.ceil(total / limit);
  const now = new Date();

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar */}
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
            <h1 className="text-2xl font-bold text-white">Abakoresha</h1>
            <p className="text-gray-400 text-sm mt-1">{total} mukoresha wose</p>
          </div>
        </div>

        {/* Search */}
        <form className="mb-6">
          <div className="flex gap-3">
            <input
              name="search"
              defaultValue={search}
              placeholder="Shakisha amazina, imeri, cyangwa nomero..."
              className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#5d63ff] transition-colors placeholder-gray-500"
            />
            <button type="submit" className="bg-[#5d63ff] text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-[#4a4fd6] transition-colors">Shakisha</button>
          </div>
        </form>

        {/* Table */}
        <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="px-5 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Umukoresha</th>
                  <th className="px-5 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Telefoni</th>
                  <th className="px-5 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Subscription</th>
                  <th className="px-5 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Yiyandikishije</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {users.map(user => {
                  const activePayment = user.payments.find(p => new Date(p.paymentExpirationDate) >= now);
                  return (
                    <tr key={user.id} className="hover:bg-gray-750 transition-colors">
                      <td className="px-5 py-4">
                        <p className="text-white font-medium text-sm">{user.username}</p>
                        <p className="text-gray-400 text-xs mt-0.5">{user.email}</p>
                      </td>
                      <td className="px-5 py-4 text-gray-300 text-sm">{user.phone}</td>
                      <td className="px-5 py-4">
                        {activePayment ? (
                          <span className="inline-flex items-center gap-1 bg-green-900/40 text-green-400 text-xs font-medium px-2.5 py-1 rounded-full">
                            ● Ifite - {new Date(activePayment.paymentExpirationDate).toLocaleDateString()}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 bg-red-900/30 text-red-400 text-xs font-medium px-2.5 py-1 rounded-full">
                            ● Ntayihari
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-gray-400 text-xs">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {users.length === 0 && (
            <div className="py-12 text-center text-gray-500">Nta mukoresha uboneka.</div>
          )}
        </div>

        {/* Pagination */}
        {pages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
              <Link
                key={p}
                href={`/admin/users?page=${p}&search=${search}`}
                className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-medium transition-colors ${p === page ? "bg-[#5d63ff] text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700 border border-gray-700"}`}
              >
                {p}
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
