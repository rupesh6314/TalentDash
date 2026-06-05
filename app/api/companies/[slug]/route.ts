import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const company = await prisma.company.findUnique({ where: { slug }, include: { salaries: true } });
  if (!company) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  
  const tcValues = company.salaries.map(s => Number(s.totalCompensation)).sort((a,b)=>a-b);
  const median = tcValues[Math.floor(tcValues.length/2)] || 0;
  const minTc = tcValues.length > 0 ? tcValues[0] : 0;
  const maxTc = tcValues.length > 0 ? tcValues[tcValues.length - 1] : 0;
  
  const levelDist: Record<string, number> = {};
  company.salaries.forEach(s => levelDist[s.level] = (levelDist[s.level] || 0) + 1);
  
  const salaries = company.salaries.map(s => ({ ...s, baseSalary: Number(s.baseSalary), bonus: Number(s.bonus), stock: Number(s.stock), totalCompensation: Number(s.totalCompensation), confidenceScore: Number(s.confidenceScore) }));
  
  const response = NextResponse.json({ 
    company, 
    salaries, 
    medianTotalCompensation: median, 
    minTotalCompensation: minTc,
    maxTotalCompensation: maxTc,
    levelDistribution: levelDist 
  });
  response.headers.set('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
  return response;
}