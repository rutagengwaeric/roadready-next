import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import "dotenv/config";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter } as ConstructorParameters<typeof PrismaClient>[0]);

async function main() {
  const password = await bcrypt.hash("Admin2026!", 12);

  const admins = [
    { email: "rutagebanke@gmail.com", name: "Rutagengwa Eric", password },
    { email: "manziboris250@gmail.com", name: "Manzi Boris", password },
    { email: "princebagena@gmail.com", name: "Bagena Prince", password },
  ];

  for (const admin of admins) {
    await prisma.admin.upsert({
      where: { email: admin.email },
      update: {},
      create: admin,
    });
    console.log(`✓ Admin seeded: ${admin.email}`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
