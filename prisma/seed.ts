import { PrismaClient, Level, Currency, Source } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const companies = [
  { name: 'Google', slug: 'google', industry: 'Tech', headquarters: 'Mountain View', foundedYear: 1998, logo: '/logos/google.svg' },
  { name: 'Amazon', slug: 'amazon', industry: 'E-commerce', headquarters: 'Seattle', foundedYear: 1994, logo: '/logos/amazon.svg' },
  { name: 'Microsoft', slug: 'microsoft', industry: 'Tech', headquarters: 'Redmond', foundedYear: 1975, logo: '/logos/microsoft.svg' },
  { name: 'Meta', slug: 'meta', industry: 'Social Media', headquarters: 'Menlo Park', foundedYear: 2004, logo: '/logos/meta.svg' },
  { name: 'Netflix', slug: 'netflix', industry: 'Streaming', headquarters: 'Los Gatos', foundedYear: 1997, logo: '/logos/netflix.svg' },
  { name: 'Flipkart', slug: 'flipkart', industry: 'E-commerce', headquarters: 'Bengaluru', foundedYear: 2007, logo: '/logos/flipkart.svg' },
  { name: 'Meesho', slug: 'meesho', industry: 'E-commerce', headquarters: 'Bengaluru', foundedYear: 2015 },
  { name: 'Razorpay', slug: 'razorpay', industry: 'Fintech', headquarters: 'Bengaluru', foundedYear: 2014 },
  { name: 'Zepto', slug: 'zepto', industry: 'Quick Commerce', headquarters: 'Mumbai', foundedYear: 2021 },
  { name: 'NVIDIA', slug: 'nvidia', industry: 'Hardware', headquarters: 'Santa Clara', foundedYear: 1993 },
  { name: 'TCS', slug: 'tcs', industry: 'IT Services', headquarters: 'Mumbai', foundedYear: 1968 },
  { name: 'Infosys', slug: 'infosys', industry: 'IT Services', headquarters: 'Bengaluru', foundedYear: 1981 },
  { name: 'Wipro', slug: 'wipro', industry: 'IT Services', headquarters: 'Bengaluru', foundedYear: 1945 },
  { name: 'Swiggy', slug: 'swiggy', industry: 'Food Delivery', headquarters: 'Bengaluru', foundedYear: 2014 },
  { name: 'PhonePe', slug: 'phonepe', industry: 'Fintech', headquarters: 'Bengaluru', foundedYear: 2015 },
  { name: 'Accenture', slug: 'accenture', industry: 'IT Services', headquarters: 'Dublin', foundedYear: 1989 },
  { name: 'Adobe', slug: 'adobe', industry: 'Software', headquarters: 'San Jose', foundedYear: 1982 },
  { name: 'Intuit', slug: 'intuit', industry: 'Software', headquarters: 'Mountain View', foundedYear: 1983 },
  { name: 'Salesforce', slug: 'salesforce', industry: 'Software', headquarters: 'San Francisco', foundedYear: 1999 },
  { name: 'Atlassian', slug: 'atlassian', industry: 'Software', headquarters: 'Sydney', foundedYear: 2002 },
  { name: 'Uber', slug: 'uber', industry: 'Mobility', headquarters: 'San Francisco', foundedYear: 2009 },
  { name: 'Airbnb', slug: 'airbnb', industry: 'Travel', headquarters: 'San Francisco', foundedYear: 2008 },
];

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.communityPost.deleteMany();
  await prisma.interview.deleteMany();
  await prisma.review.deleteMany();
  await prisma.salary.deleteMany();
  await prisma.company.deleteMany();

  // Seed companies
  for (const c of companies) {
    await prisma.company.create({
      data: {
        name: c.name,
        slug: c.slug,
        normalizedName: c.name.toLowerCase(),
        industry: c.industry,
        headquarters: c.headquarters,
        foundedYear: c.foundedYear,
        logo: c.logo || null,
      },
    });
  }

  const allCompanies = await prisma.company.findMany();
  const levels = Object.values(Level);
  const locations = [
    'Bengaluru', 'Mumbai', 'Hyderabad', 'Delhi', 'Pune', 'Chennai', 'Noida', 'Gurugram',
    'San Francisco', 'New York', 'London', 'Singapore', 'Seattle', 'Toronto', 'Sydney'
  ];
  const roles = [
    'Software Engineer', 'Senior Software Engineer', 'Staff Software Engineer', 'Principal Engineer',
    'Frontend Engineer', 'Backend Engineer', 'Full Stack Engineer', 'Mobile Developer',
    'Data Scientist', 'Data Engineer', 'Machine Learning Engineer', 'Deep Learning Engineer',
    'Product Manager', 'Senior Product Manager', 'Engineering Manager', 'DevOps Engineer',
    'Site Reliability Engineer', 'Cloud Architect', 'Security Engineer', 'UX Designer'
  ];

  // Salaries (200 records)
  const salaryData = [];
  for (let i = 0; i < 200; i++) {
    const company = faker.helpers.arrayElement(allCompanies);
    const level = faker.helpers.arrayElement(levels);
    const currency = faker.helpers.arrayElement([Currency.INR, Currency.INR, Currency.INR, Currency.USD]);
    const base = currency === Currency.INR
      ? faker.number.int({ min: 1000000, max: 10000000 })
      : faker.number.int({ min: 80000, max: 500000 });
    const bonus = faker.number.int({ min: 0, max: base * 0.4 });
    const stock = faker.number.int({ min: 0, max: base * 1.5 });
    salaryData.push({
      companyId: company.id,
      role: faker.helpers.arrayElement(roles),
      level,
      location: faker.helpers.arrayElement(locations),
      currency,
      experienceYears: faker.number.int({ min: 1, max: 25 }),
      baseSalary: BigInt(base),
      bonus: BigInt(bonus),
      stock: BigInt(stock),
      totalCompensation: BigInt(base + bonus + stock),
      source: Source.CONTRIBUTOR,
    });
  }
  await prisma.salary.createMany({ data: salaryData });

  const englishPros = [
    'Great work-life balance and amazing benefits.',
    'Smart colleagues and plenty of opportunities to learn.',
    'Good pay, free food, and excellent office facilities.',
    'Very flexible working hours and supportive management.',
    'Challenging projects that look great on a resume.'
  ];
  const englishCons = [
    'Slow promotion cycles and heavy bureaucracy.',
    'Sometimes expectations are unrealistic and stressful.',
    'On-call rotations can be quite exhausting.',
    'Legacy codebase makes feature development slow.',
    'Commute to the office can be tedious for hybrid workers.'
  ];
  const englishAdvice = [
    'Focus more on employee retention and mental health.',
    'Reduce unnecessary meetings and let engineers code.',
    'Improve transparency during the performance review cycle.',
    'Keep up the good work, just provide better hardware.',
    'Standardize the onboarding process for new hires.'
  ];

  // Reviews (50)
  const reviewData = [];
  for (let i = 0; i < 50; i++) {
    const company = faker.helpers.arrayElement(allCompanies);
    reviewData.push({
      companyId: company.id,
      rating: faker.number.int({ min: 1, max: 5 }),
      pros: faker.helpers.arrayElement(englishPros),
      cons: faker.helpers.arrayElement(englishCons),
      advice: faker.helpers.arrayElement(englishAdvice),
      isAnonymous: faker.datatype.boolean(),
    });
  }
  await prisma.review.createMany({ data: reviewData });

  const englishExperiences = [
    'The interview was highly technical. They asked multiple LeetCode hard questions. Overall, it was a smooth process but quite challenging.',
    'Standard process: one screening call, followed by a coding round, and a system design round. The interviewers were very polite.',
    'I found the behavioral rounds tougher than the technical ones. Make sure to prepare your leadership principles well!',
    'The process took almost two months. There were 5 rounds in total, including a take-home assignment.',
    'Very friendly recruiters, but the technical bar is extremely high. Brush up on dynamic programming and graphs.'
  ];

  // Interviews (40)
  const interviewData = [];
  for (let i = 0; i < 40; i++) {
    const company = faker.helpers.arrayElement(allCompanies);
    interviewData.push({
      companyId: company.id,
      role: faker.helpers.arrayElement(roles),
      difficulty: faker.helpers.arrayElement(['Easy', 'Medium', 'Hard']),
      experience: faker.helpers.arrayElement(englishExperiences),
      outcome: faker.helpers.arrayElement(['Offer', 'No Offer', 'Pending']),
    });
  }
  await prisma.interview.createMany({ data: interviewData });

  // Community posts (30)
  const topics = [
    'Amazon appraisal discussion 2026', 'Google hiring freeze impact on offers?',
    'Best companies for GenAI engineers', 'Remote work vs office in 2026',
    '2026 PM salaries in India', 'Startup layoffs megathread',
    'Amazon SDE-2 salary hike 2026', 'Google L4 hiring bar',
    'Microsoft return to office mandate', 'Meta E5 performance review'
  ];
  const englishPosts = [
    'I recently received an offer and I am trying to understand if this compensation is standard for the current market. Any insights would be helpful.',
    'Does anyone know if the current hiring freeze will end by Q3? I have been waiting for my start date to be confirmed for months.',
    'I am looking for resources to prepare for system design rounds at FAANG companies. What did you guys use to clear the bar?',
    'My manager just gave me a "Meets Expectations" rating despite me delivering two major projects this year. Should I switch teams or switch companies?',
    'Is the transition from individual contributor to engineering manager worth it? I love coding but the pay bump for management is tempting.',
    'Just got laid off today. It was completely unexpected. Please let me know if anyone is hiring for React/Node roles.',
    'Let us talk about remote work. Are your companies forcing you back to the office, or is remote work here to stay permanently?'
  ];

  const postData = [];
  for (let i = 0; i < 30; i++) {
    postData.push({
      title: topics[i % topics.length] + (i > topics.length ? ` ${i}` : ''),
      content: faker.helpers.arrayElement(englishPosts),
      authorName: faker.person.fullName(),
      authorRole: faker.helpers.arrayElement(roles),
      company: faker.helpers.arrayElement(allCompanies).name,
      likes: faker.number.int({ min: 10, max: 500 }),
      replies: faker.number.int({ min: 5, max: 300 }),
    });
  }
  await prisma.communityPost.createMany({ data: postData });

  console.log(`✅ Seeded ${await prisma.company.count()} companies, ${await prisma.salary.count()} salaries, ${await prisma.review.count()} reviews, ${await prisma.interview.count()} interviews, ${await prisma.communityPost.count()} posts.`);
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());