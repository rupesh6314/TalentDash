import { PrismaClient, Level, Currency, Source } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

function normaliseCompanyName(raw: string): string {
  return raw.trim().toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, ' ');
}

async function findOrCreateCompany(rawName: string) {
  const normalised = normaliseCompanyName(rawName);
  const slug = normalised.replace(/\s+/g, '-');
  let company = await prisma.company.findUnique({ where: { normalizedName: normalised } });
  if (!company) {
    company = await prisma.company.create({
      data: { name: rawName.trim(), slug, normalizedName: normalised },
    });
  }
  return company;
}

async function main() {
  console.log('🌱 Seeding database...');

  await prisma.salary.deleteMany();
  await prisma.company.deleteMany();

  const rawCompanies = [
    'Google India', 'GOOGLE', 'google', 'Amazon', 'Meta', 'Microsoft', 
    'Flipkart', 'Meesho', 'NVIDIA', 'TCS', 'Infosys', 'Wipro', 'Razorpay', 'Zepto'
  ];
  const locations = ['Bengaluru', 'Mumbai', 'Hyderabad', 'Pune', 'Delhi', 'San Francisco', 'London'];
  const levels = Object.values(Level);
  const roles = ['Software Engineer', 'Senior Software Engineer', 'Product Manager', 'Data Scientist'];

  // Ensure normalisation
  for (const raw of rawCompanies) {
    await findOrCreateCompany(raw);
  }

  const allCompanies = await prisma.company.findMany();

  const salaryData = [];

  // Edge Case 1: Zero Bonus
  const c1 = await findOrCreateCompany('Amazon');
  salaryData.push({
    companyId: c1.id, role: 'Software Engineer', level: Level.L4, location: 'Bengaluru', currency: Currency.INR, experienceYears: 3,
    baseSalary: BigInt(2500000), bonus: BigInt(0), stock: BigInt(1000000), totalCompensation: BigInt(3500000), source: Source.SCRAPED, confidenceScore: 0.95
  });

  // Edge Case 2: Zero Stock
  const c2 = await findOrCreateCompany('TCS');
  salaryData.push({
    companyId: c2.id, role: 'Software Engineer', level: Level.L3, location: 'Mumbai', currency: Currency.INR, experienceYears: 2,
    baseSalary: BigInt(800000), bonus: BigInt(100000), stock: BigInt(0), totalCompensation: BigInt(900000), source: Source.CONTRIBUTOR, confidenceScore: 0.8
  });

  // Edge Case 3: Very High Equity
  const c3 = await findOrCreateCompany('Meta');
  salaryData.push({
    companyId: c3.id, role: 'Machine Learning Engineer', level: Level.E5, location: 'San Francisco', currency: Currency.USD, experienceYears: 8,
    baseSalary: BigInt(220000), bonus: BigInt(40000), stock: BigInt(800000), totalCompensation: BigInt(1060000), source: Source.AI_INFERRED, confidenceScore: 0.7
  });

  // Edge Case 4: Principal Level
  const c4 = await findOrCreateCompany('Microsoft');
  salaryData.push({
    companyId: c4.id, role: 'Principal Engineer', level: Level.PRINCIPAL, location: 'London', currency: Currency.GBP, experienceYears: 15,
    baseSalary: BigInt(150000), bonus: BigInt(50000), stock: BigInt(200000), totalCompensation: BigInt(400000), source: Source.CONTRIBUTOR, confidenceScore: 0.99
  });

  // Generate 60+ more realistic records
  for (let i = 0; i < 65; i++) {
    const company = faker.helpers.arrayElement(allCompanies);
    const level = faker.helpers.arrayElement(levels);
    const currency = faker.helpers.arrayElement([Currency.INR, Currency.USD]);
    const base = currency === Currency.INR ? faker.number.int({ min: 1000000, max: 8000000 }) : faker.number.int({ min: 80000, max: 350000 });
    const bonus = faker.number.int({ min: 0, max: base * 0.3 });
    const stock = faker.number.int({ min: 0, max: base * 1.5 });
    salaryData.push({
      companyId: company.id,
      role: faker.helpers.arrayElement(roles),
      level,
      location: faker.helpers.arrayElement(locations),
      currency,
      experienceYears: faker.number.int({ min: 1, max: 20 }),
      baseSalary: BigInt(base),
      bonus: BigInt(bonus),
      stock: BigInt(stock),
      totalCompensation: BigInt(base + bonus + stock),
      source: Source.CONTRIBUTOR,
      confidenceScore: faker.number.float({ min: 0.4, max: 1.0 })
    });
  }

  await prisma.salary.createMany({ data: salaryData });
  console.log(`✅ Seeded ${await prisma.company.count()} companies and ${await prisma.salary.count()} salaries.`);
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());