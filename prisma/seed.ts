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
    companyId: c3.id, role: 'Machine Learning Engineer', level: Level.L5, location: 'San Francisco', currency: Currency.USD, experienceYears: 8,
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

  await prisma.salary.createMany({ data: salaryData, skipDuplicates: true });
  const extraCompanies = [
    'Apple', 'Stripe', 'Uber', 'Airbnb', 'Netflix', 'Salesforce', 'Adobe', 'Oracle', 'Intel', 'Cisco',
    'LinkedIn', 'Twitter', 'Snap', 'Pinterest', 'Spotify', 'Shopify', 'ByteDance', 'Roblox', 'Lyft', 'DoorDash'
  ];
  
  const roleList = [
    'Software Engineer', 'Frontend Engineer', 'Backend Engineer', 'Full Stack Engineer',
    'Data Scientist', 'Machine Learning Engineer', 'Data Engineer', 'Product Manager',
    'Engineering Manager', 'DevOps Engineer', 'Site Reliability Engineer', 'Security Engineer',
    'iOS Engineer', 'Android Engineer', 'Blockchain Developer'
  ];

  const locList = [
    'San Francisco', 'New York', 'Seattle', 'London', 'Bengaluru',
    'Berlin', 'Toronto', 'Singapore', 'Austin', 'Remote'
  ];

  const levelList = Object.values(Level);
  const currencyList = Object.values(Currency);

  console.log('Generating extra companies, salaries, reviews, and interviews...');
  
  // Create 20+ extra companies
  const companyRecords = [];
  for (const name of extraCompanies) {
    const comp = await findOrCreateCompany(name);
    companyRecords.push(comp);
  }

  // Generate 120 random salaries
  for (let i = 0; i < 120; i++) {
    const comp = companyRecords[Math.floor(Math.random() * companyRecords.length)];
    const role = roleList[Math.floor(Math.random() * roleList.length)];
    const location = locList[Math.floor(Math.random() * locList.length)];
    const level = levelList[Math.floor(Math.random() * levelList.length)];
    const currency = currencyList[Math.floor(Math.random() * currencyList.length)];
    const experienceYears = Math.floor(Math.random() * 15);
    
    let base = Math.floor(Math.random() * 150000) + 80000;
    let bonus = Math.floor(Math.random() * 30000);
    let stock = Math.floor(Math.random() * 100000);
    
    // Scale for INR
    if (currency === Currency.INR) {
      base = base * 20;
      bonus = bonus * 20;
      stock = stock * 20;
    }

    salaryData.push({
      companyId: comp.id,
      role,
      level,
      location,
      currency,
      experienceYears,
      baseSalary: BigInt(base),
      bonus: BigInt(bonus),
      stock: BigInt(stock),
      totalCompensation: BigInt(base + bonus + stock),
      source: Source.USER_SUBMITTED,
      confidenceScore: 0.85
    });
  }

  // Insert all salaries
  await prisma.salary.createMany({ data: salaryData, skipDuplicates: true });

  // Add dummy reviews and interviews for some companies
  const reviewsData = [];
  const interviewsData = [];
  
  for (const comp of companyRecords) {
    // 1-3 reviews per company
    const numReviews = Math.floor(Math.random() * 3) + 1;
    for (let i=0; i<numReviews; i++) {
      reviewsData.push({
        companyId: comp.id,
        rating: Math.floor(Math.random() * 2) + 4, // 4 or 5
        pros: 'Great culture, smart people, amazing compensation and benefits.',
        cons: 'Can be fast-paced and occasionally stressful during launches.',
        advice: 'Focus on work-life balance and avoid burnout.',
      });
    }

    // 1-3 interviews
    const numInterviews = Math.floor(Math.random() * 3) + 1;
    const difficulties = ['Easy', 'Medium', 'Hard'];
    const outcomes = ['Offer', 'No Offer', 'Pending'];
    for (let i=0; i<numInterviews; i++) {
      interviewsData.push({
        companyId: comp.id,
        role: roleList[Math.floor(Math.random() * roleList.length)],
        difficulty: difficulties[Math.floor(Math.random() * difficulties.length)],
        experience: 'The interview process consisted of a phone screen followed by 4 virtual onsite rounds focusing on algorithms, system design, and behavioral questions.',
        outcome: outcomes[Math.floor(Math.random() * outcomes.length)],
      });
    }
  }

  await prisma.review.createMany({ data: reviewsData });
  await prisma.interview.createMany({ data: interviewsData });

  // Add dummy community posts
  await prisma.communityPost.createMany({
    data: [
      {
        title: 'Is the current tech market recovering?',
        content: 'I have been seeing more recruiters reaching out lately. What is everyone else experiencing?',
        authorName: 'TechExplorer99',
        likes: 245,
        replies: 89,
      },
      {
        title: 'Negotiation strategies for Staff Engineer offers',
        content: 'Just got an offer from Stripe but the equity feels a bit low compared to Netflix. How should I approach the counter-offer?',
        authorName: 'SeniorDev10x',
        likes: 412,
        replies: 156,
      },
      {
        title: 'System Design Interview tips for 2024',
        content: 'Focus heavily on microservices architecture and understanding message queues (Kafka vs RabbitMQ).',
        authorName: 'SysArchMaster',
        likes: 890,
        replies: 234,
      },
      {
        title: 'Remote work policies at FAANG',
        content: 'Which companies are strictly enforcing RTO and which ones are still flexible?',
        authorName: 'RemoteWorker',
        likes: 156,
        replies: 342,
      }
    ]
  });

  console.log(`✅ Seeded ${extraCompanies.length + 13} companies and ${salaryData.length} salaries. Added reviews, interviews, and community posts.`);
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());