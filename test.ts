import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const companies = await prisma.company.findMany({
    select: { slug: true, name: true }
  });
  console.log(companies);
}

main().finally(() => prisma.$disconnect());
