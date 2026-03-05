import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import AdminSidebar from "@/components/admin/AdminSidebar";

const planLabel = (amount: number) => {
  if (amount === 900) return "Bronze — 1 Day";
  if (amount === 2000) return "Silver — 1 Week";
  if (amount === 3000) return "Gold — 2 Weeks";
  if (amount === 5000) return "Diamond — 1 Month";
  return `${amount} RWF`;
};

const planImg: Record<number, string> = {
  900: "/assets/images/bronze 1.png",
  2000: "/assets/images/icons/silver 1.png",
  3000: "/assets/images/gold 1.png",
  5000: "/assets/images/icons/diamond.png",
};

export default async function AdminPaymentsPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const params = await searchParams;
  const page = Number(params.page || 1);
  const limit = 20;
  const now = new Date();

  const [payments, total, revenue] = await Promise.all([
    prisma.payment.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { paymentDate: "desc" },
      include: { user: { select: { username: true, phone: true } } },
    }),
    prisma.payment.count(),
    prisma.payment.aggregate({ _sum: { amountPaid: true } }),
  ]);

  const pages = Math.ceil(total / limit);
  const totalRevenue = Number(revenue._sum.amountPaid ?? 0);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#13162b", display: "flex", fontFamily: "inherit" }}>
      <AdminSidebar />

      <main className="admin-main" style={{ flex: 1, overflowY: "auto", minHeight: "100vh" }}>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: "2.4rem", fontWeight: 700, color: "#fff" }}>All Payments</h1>
          <p style={{ fontSize: "1.3rem", color: "rgba(255,255,255,0.45)", marginTop: 4 }}>
            Total Revenue:{" "}
            <span style={{ color: "#68d391", fontWeight: 700 }}>{totalRevenue.toLocaleString()} RWF</span>
          </p>
        </div>

        <div style={{ backgroundColor: "#12152a", border: "1px solid #2a2d4a", borderRadius: 16, overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #2a2d4a" }}>
                  {["User", "Plan", "Ref", "Date", "Status"].map(h => (
                    <th key={h} style={{ padding: "14px 20px", textAlign: "left", fontSize: "1.1rem", fontWeight: 600, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: 1 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {payments.map((p, i) => {
                  const active = new Date(p.paymentExpirationDate) >= now;
                  const amt = Number(p.amountPaid);
                  return (
                    <tr key={p.id} style={{ borderBottom: i < payments.length - 1 ? "1px solid #2a2d4a" : "none" }}>
                      <td style={{ padding: "14px 20px" }}>
                        <p style={{ fontSize: "1.4rem", fontWeight: 600, color: "#fff" }}>{p.user.username}</p>
                        <p style={{ fontSize: "1.2rem", color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{p.user.phone}</p>
                      </td>
                      <td style={{ padding: "14px 20px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          {planImg[amt] && (
                            <Image src={planImg[amt]} alt="" width={22} height={22} style={{ objectFit: "contain" }} />
                          )}
                          <span style={{ fontSize: "1.3rem", color: "rgba(255,255,255,0.8)", fontWeight: 600 }}>{planLabel(amt)}</span>
                        </div>
                      </td>
                      <td style={{ padding: "14px 20px", fontSize: "1.1rem", color: "rgba(255,255,255,0.35)", fontFamily: "monospace" }}>
                        {p.paymentRef.slice(0, 16)}...
                      </td>
                      <td style={{ padding: "14px 20px", fontSize: "1.2rem", color: "rgba(255,255,255,0.45)" }}>
                        <p>{new Date(p.paymentDate).toLocaleDateString()}</p>
                        <p style={{ marginTop: 2 }}>→ {new Date(p.paymentExpirationDate).toLocaleDateString()}</p>
                      </td>
                      <td style={{ padding: "14px 20px" }}>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: active ? "rgba(72,187,120,0.15)" : "rgba(255,255,255,0.05)", color: active ? "#68d391" : "rgba(255,255,255,0.3)", padding: "3px 10px", borderRadius: 20, fontSize: "1.2rem", fontWeight: 600 }}>
                          ● {active ? "Active" : "Expired"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {payments.length === 0 && (
            <p style={{ padding: "40px 20px", textAlign: "center", color: "rgba(255,255,255,0.3)", fontSize: "1.4rem" }}>No payments found.</p>
          )}
        </div>

        {pages > 1 && (
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 20 }}>
            {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
              <Link key={p} href={`/admin/payments?page=${p}`}
                style={{ width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 8, fontSize: "1.3rem", fontWeight: 600, textDecoration: "none", background: p === page ? "#5d6eff" : "#12152a", color: p === page ? "#fff" : "rgba(255,255,255,0.5)", border: p === page ? "none" : "1px solid #2a2d4a" }}
              >
                {p}
              </Link>
            ))}
          </div>
        )}
      </main>

      <style>{`
        .admin-main { margin-left: 240px; padding: 32px 36px; }
        
        @media (max-width: 1024px) {
          .admin-main { margin-left: 0; padding: 100px 20px 32px; }
        }
      `}</style>
    </div>
  );
}
