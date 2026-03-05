import { NextResponse } from "next/server";
import { getUser, hasActivePayment } from "@/lib/auth";

export async function GET() {
  const user = await getUser();
  if (!user) return NextResponse.json({ user: null });

  const paid = await hasActivePayment(user.id);
  return NextResponse.json({ user, paid });
}
