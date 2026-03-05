import { redirect } from "next/navigation";
import Link from "next/link";
import { getAdminSession } from "@/lib/auth";

async function getStats() {
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  try {
    const res = await fetch(`${baseUrl}/api/admin/stats`, { cache: "no-store" });
    return res.json();
  } catch {
    return { totalUsers: 0, totalPayments: 0, activeSubscriptions: 0, totalRevenue: 0 };
  }
}

export default async function AdminDashboard() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const stats = await getStats();

  const cards = [
    { label: "Abakoresha bose", value: stats.totalUsers, icon: "👥", color: "from-blue-500 to-blue-600" },
    { label: "Payments zose", value: stats.totalPayments, icon: "💳", color: "from-green-500 to-green-600" },
    { label: "Subscriptions zifite", value: stats.activeSubscriptions, icon: "✅", color: "from-purple-500 to-purple-600" },
    { label: "Revenue yose (RWF)", value: Number(stats.totalRevenue).toLocaleString(), icon: "💰", color: "from-orange-500 to-orange-600" },
  ];

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: "📊" },
    { href: "/admin/users", label: "Abakoresha", icon: "👥" },
    { href: "/admin/payments", label: "Payments", icon: "💳" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col p-6 fixed h-full">
        <div className="mb-8">
          <span className="text-xl font-bold text-white">Road<span className="text-[#5d63ff]">Ready</span></span>
          <p className="text-xs text-gray-400 mt-1">Admin Panel</p>
        </div>
        <nav className="space-y-1 flex-1">
          {navItems.map(item => (
            <Link key={item.href} href={item.href} className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-gray-700 hover:text-white transition-colors text-sm font-medium">
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <form action="/api/auth/logout" method="POST">
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-red-400 transition-colors text-sm w-full">
            <span>🚪</span> Sohoka
          </button>
        </form>
      </aside>

      {/* Main */}
      <main className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 text-sm mt-1">Ikinyamakuru cy'imicungire ya RoadReady</p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {cards.map(card => (
            <div key={card.label} className={`bg-gradient-to-br ${card.color} rounded-2xl p-5 text-white`}>
              <span className="text-3xl mb-3 block">{card.icon}</span>
              <p className="text-2xl font-bold">{card.value}</p>
              <p className="text-sm opacity-80 mt-1">{card.label}</p>
            </div>
          ))}
        </div>

        {/* Quick links */}
        <div className="grid sm:grid-cols-2 gap-4">
          <Link href="/admin/users" className="bg-gray-800 border border-gray-700 rounded-2xl p-6 hover:border-[#5d63ff]/40 transition-colors group">
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl">👥</span>
              <svg className="w-5 h-5 text-gray-500 group-hover:text-[#5d63ff] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <h3 className="text-white font-semibold">Gucunga Abakoresha</h3>
            <p className="text-gray-400 text-sm mt-1">Reba kandi ucunge abakoresha bose</p>
          </Link>
          <Link href="/admin/payments" className="bg-gray-800 border border-gray-700 rounded-2xl p-6 hover:border-[#5d63ff]/40 transition-colors group">
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl">💳</span>
              <svg className="w-5 h-5 text-gray-500 group-hover:text-[#5d63ff] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <h3 className="text-white font-semibold">Payments Zose</h3>
            <p className="text-gray-400 text-sm mt-1">Reba amateka ya payments yose</p>
          </Link>
        </div>
      </main>
    </div>
  );
}
