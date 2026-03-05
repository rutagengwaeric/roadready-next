import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/lib/auth";
import { checkTransactionStatus } from "@/lib/paypack";

export async function GET(req: NextRequest) {
  try {
    const user = await getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const ref = searchParams.get("ref");
    const phone = searchParams.get("phone");

    if (!ref || !phone) {
      return NextResponse.json({ error: "Missing params" }, { status: 400 });
    }

    const data = await checkTransactionStatus(ref, phone);
    return NextResponse.json(data);
  } catch (err) {
    console.error("Payment status error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
