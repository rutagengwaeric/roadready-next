import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import prisma from "./prisma";

const SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || "fallback-secret"
);

export async function signToken(payload: Record<string, unknown>) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(SECRET);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload;
  } catch {
    return null;
  }
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("rr_token")?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function getUser() {
  const session = await getSession();
  if (!session?.userId) return null;
  return prisma.user.findUnique({
    where: { id: Number(session.userId) },
    select: { id: true, username: true, email: true, phone: true },
  });
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("rr_admin_token")?.value;
  if (!token) return null;
  const payload = await verifyToken(token);
  if (!payload?.isAdmin) return null;
  return payload;
}

export async function hasActivePayment(userId: number) {
  const now = new Date();
  const payment = await prisma.payment.findFirst({
    where: {
      userId,
      paymentExpirationDate: { gte: now },
    },
    orderBy: { paymentExpirationDate: "desc" },
  });
  return !!payment;
}
