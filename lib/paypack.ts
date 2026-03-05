const BASE_URL = process.env.PAYPACK_BASE_URL!;
const CLIENT_ID = process.env.PAYPACK_CLIENT_ID!;
const CLIENT_SECRET = process.env.PAYPACK_CLIENT_SECRET!;

let cachedToken: { token: string; expiresAt: number } | null = null;

export async function getPaypackToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    return cachedToken.token;
  }

  const res = await fetch(`${BASE_URL}/auth/agents/authorize`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }),
    cache: "no-store",
  });

  const data = await res.json();
  const token = data.access;
  // Cache for 55 minutes (tokens usually last 1hr)
  cachedToken = { token, expiresAt: Date.now() + 55 * 60 * 1000 };
  return token;
}

export async function initiateCashin(amount: number, phone: string) {
  const token = await getPaypackToken();
  const idempotencyKey = crypto.randomUUID().replace(/-/g, "");

  const res = await fetch(
    `${BASE_URL}/transactions/cashin?Idempotency-Key=${idempotencyKey}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount, number: phone }),
      cache: "no-store",
    }
  );

  return res.json();
}

export async function checkTransactionStatus(ref: string, phone: string) {
  const token = await getPaypackToken();

  const res = await fetch(
    `${BASE_URL}/events/transactions?ref=${encodeURIComponent(ref)}&kind=CASHIN&phone=${encodeURIComponent(phone)}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  return res.json();
}

export function getExpirationDate(amount: number): Date {
  const seconds =
    amount === 900
      ? 86400
      : amount === 2000
        ? 604800
        : amount === 3000
          ? 1209600
          : amount === 5000
            ? 2592000
            : 0;

  const date = new Date();
  date.setSeconds(date.getSeconds() + seconds);
  return date;
}
