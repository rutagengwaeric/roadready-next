import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";
import AdminSidebar from "@/components/admin/AdminSidebar";

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
    <div style={{ minHeight: "100vh", backgroundColor: "#13162b", display: "flex", fontFamily: "inherit" }}>
      <AdminSidebar />

      <main style={{ flex: 1, marginLeft: 240, padding: "32px 36px", overflowY: "auto", minHeight: "100vh" }}>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: "2.4rem", fontWeight: 700, color: "#fff" }}>Abakoresha</h1>
          <p style={{ fontSize: "1.3rem", color: "rgba(255,255,255,0.45)", marginTop: 4 }}>{total} mukoresha wose</p>
        </div>

        {/* Search */}
        <form style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", gap: 10 }}>
            <input
              name="search"
              defaultValue={search}
              placeholder="Shakisha amazina, imeri, cyangwa nomero..."
              style={{ flex: 1, backgroundColor: "#12152a", border: "1px solid #2a2d4a", borderRadius: 10, padding: "10px 16px", color: "#fff", fontSize: "1.4rem", outline: "none", fontFamily: "inherit" }}
            />
            <button type="submit" className="btn btn-primary" style={{ height: 44, paddingInline: 20, fontSize: "1.3rem" }}>Shakisha</button>
          </div>
        </form>

        {/* Table */}
        <div style={{ backgroundColor: "#12152a", border: "1px solid #2a2d4a", borderRadius: 16, overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #2a2d4a" }}>
                  {["Umukoresha", "Telefoni", "Subscription", "Yiyandikishije"].map(h => (
                    <th key={h} style={{ padding: "14px 20px", textAlign: "left", fontSize: "1.1rem", fontWeight: 600, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: 1 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((user, i) => {
                  const activePayment = user.payments.find(p => new Date(p.paymentExpirationDate) >= now);
                  return (
                    <tr key={user.id} style={{ borderBottom: i < users.length - 1 ? "1px solid #2a2d4a" : "none" }}>
                      <td style={{ padding: "14px 20px" }}>
                        <p style={{ fontSize: "1.4rem", fontWeight: 600, color: "#fff" }}>{user.username}</p>
                        <p style={{ fontSize: "1.2rem", color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{user.email}</p>
                      </td>
                      <td style={{ padding: "14px 20px", fontSize: "1.3rem", color: "rgba(255,255,255,0.6)" }}>{user.phone}</td>
                      <td style={{ padding: "14px 20px" }}>
                        {activePayment ? (
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(72,187,120,0.15)", color: "#68d391", padding: "3px 10px", borderRadius: 20, fontSize: "1.2rem", fontWeight: 600 }}>
                            ● Ifite — {new Date(activePayment.paymentExpirationDate).toLocaleDateString()}
                          </span>
                        ) : (
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(252,129,129,0.15)", color: "#fc8181", padding: "3px 10px", borderRadius: 20, fontSize: "1.2rem", fontWeight: 600 }}>
                            ● Ntayihari
                          </span>
                        )}
                      </td>
                      <td style={{ padding: "14px 20px", fontSize: "1.2rem", color: "rgba(255,255,255,0.4)" }}>
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {users.length === 0 && (
            <p style={{ padding: "40px 20px", textAlign: "center", color: "rgba(255,255,255,0.3)", fontSize: "1.4rem" }}>Nta mukoresha uboneka.</p>
          )}
        </div>

        {/* Pagination */}
        {pages > 1 && (
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 20 }}>
            {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
              <Link key={p} href={`/admin/users?page=${p}&search=${search}`}
                style={{ width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 8, fontSize: "1.3rem", fontWeight: 600, textDecoration: "none", background: p === page ? "#5d6eff" : "#12152a", color: p === page ? "#fff" : "rgba(255,255,255,0.5)", border: p === page ? "none" : "1px solid #2a2d4a" }}
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
