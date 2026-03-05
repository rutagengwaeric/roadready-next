import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/lib/auth";
import { initiateCashin } from "@/lib/paypack";

const VALID_AMOUNTS = [900, 2000, 3000, 5000];

export async function POST(req: NextRequest) {
  try {
    const user = await getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { amount, phone } = await req.json();

    if (!VALID_AMOUNTS.includes(amount) || !phone) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const result = await initiateCashin(amount, phone);

    if (!result.ref || result.status !== "pending") {
      return NextResponse.json({ error: "Payment initiation failed" }, { status: 502 });
    }

    return NextResponse.json({ ref: result.ref, status: result.status });
  } catch (err) {
    console.error("Payment initiate error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
