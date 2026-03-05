import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import "dotenv/config";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter } as ConstructorParameters<typeof PrismaClient>[0]);

async function main() {
  const adminPassword = await bcrypt.hash("Admin2026!", 12);
  const userPassword = await bcrypt.hash("User2026!", 12);

  // ── Admins ──
  const admins = [
    { email: "rutagebanke@gmail.com", name: "Rutagengwa Eric", password: adminPassword },
    { email: "manziboris250@gmail.com", name: "Manzi Boris", password: adminPassword },
    { email: "princebagena@gmail.com", name: "Bagena Prince", password: adminPassword },
  ];

  for (const admin of admins) {
    await prisma.admin.upsert({
      where: { email: admin.email },
      update: {},
      create: admin,
    });
    console.log(`✓ Admin seeded: ${admin.email}`);
  }

  // ── Paid users ──
  const now = new Date();
  const in30Days = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
  const in14Days = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
  const in7Days  = new Date(now.getTime() +  7 * 24 * 60 * 60 * 1000);
  const in1Day   = new Date(now.getTime() +      24 * 60 * 60 * 1000);

  const paidUsers = [
    {
      user: { username: "Mugisha Jean", email: "mugisha@test.rw", phone: "0781000001", password: userPassword },
      payment: { amountPaid: 5000, paymentExpirationDate: in30Days, paymentRef: "SEED-PAY-001" },
    },
    {
      user: { username: "Uwase Claudine", email: "uwase@test.rw", phone: "0781000002", password: userPassword },
      payment: { amountPaid: 3000, paymentExpirationDate: in14Days, paymentRef: "SEED-PAY-002" },
    },
    {
      user: { username: "Habimana Patrick", email: "habimana@test.rw", phone: "0781000003", password: userPassword },
      payment: { amountPaid: 2000, paymentExpirationDate: in7Days, paymentRef: "SEED-PAY-003" },
    },
    {
      user: { username: "Ingabire Solange", email: "ingabire@test.rw", phone: "0781000004", password: userPassword },
      payment: { amountPaid: 900, paymentExpirationDate: in1Day, paymentRef: "SEED-PAY-004" },
    },
  ];

  for (const { user, payment } of paidUsers) {
    const created = await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });

    await prisma.payment.upsert({
      where: { paymentRef: payment.paymentRef },
      update: {},
      create: {
        userId: created.id,
        amountPaid: payment.amountPaid,
        paymentExpirationDate: payment.paymentExpirationDate,
        paymentRef: payment.paymentRef,
      },
    });

    console.log(`✓ Paid user seeded: ${user.email} (expires ${payment.paymentExpirationDate.toDateString()})`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
