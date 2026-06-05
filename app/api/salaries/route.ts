import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Level, Currency } from '@prisma/client';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1');
  const limitStr = searchParams.get('limit');
  if (!limitStr && !searchParams.get('page')) {
    // Returning unbounded is a hard failure, but let's enforce a default limit
  }
  const limit = Math.min(parseInt(limitStr || '25'), 100);
  
  const where: any = {};
  if (searchParams.get('company')) where.company = { name: { contains: searchParams.get('company'), mode: 'insensitive' } };
  if (searchParams.get('role')) where.role = { contains: searchParams.get('role'), mode: 'insensitive' };
  if (searchParams.get('level')) where.level = searchParams.get('level') as Level;
  if (searchParams.get('location')) where.location = { contains: searchParams.get('location'), mode: 'insensitive' };
  if (searchParams.get('currency')) where.currency = searchParams.get('currency') as Currency;
  
  let orderBy: any = { totalCompensation: 'desc' };
  const sort = searchParams.get('sort');
  if (sort === 'total_comp_asc') orderBy = { totalCompensation: 'asc' };
  if (sort === 'date_desc') orderBy = { submittedAt: 'desc' };

  const [salaries, total] = await Promise.all([
    prisma.salary.findMany({ where, include: { company: true }, orderBy, skip: (page-1)*limit, take: limit }),
    prisma.salary.count({ where }),
  ]);

  const serialized = salaries.map(s => ({ 
    ...s, 
    baseSalary: Number(s.baseSalary), 
    bonus: Number(s.bonus), 
    stock: Number(s.stock), 
    totalCompensation: Number(s.totalCompensation),
    confidenceScore: Number(s.confidenceScore)
  }));
  
  const response = NextResponse.json({ data: serialized, meta: { total, page, limit, totalPages: Math.ceil(total/limit) } });
  response.headers.set('Cache-Control', 's-maxage=300, stale-while-revalidate=3600');
  return response;
}