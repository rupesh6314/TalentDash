import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cacheHeaders } from '@/lib/cache';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1');
  const limit = Math.min(parseInt(searchParams.get('limit') || '25'), 100);
  const where: any = {};
  if (searchParams.get('company')) where.company = { name: { contains: searchParams.get('company'), mode: 'insensitive' } };
  if (searchParams.get('level')) where.level = searchParams.get('level');
  if (searchParams.get('location')) where.location = { contains: searchParams.get('location'), mode: 'insensitive' };
  const [salaries, total] = await Promise.all([
    prisma.salary.findMany({ where, include: { company: true }, orderBy: { totalCompensation: 'desc' }, skip: (page-1)*limit, take: limit }),
    prisma.salary.count({ where }),
  ]);
  const serialized = salaries.map(s => ({ ...s, baseSalary: Number(s.baseSalary), bonus: Number(s.bonus), stock: Number(s.stock), totalCompensation: Number(s.totalCompensation) }));
  const response = NextResponse.json({ data: serialized, meta: { total, page, limit, totalPages: Math.ceil(total/limit) } });
  response.headers.set('Cache-Control', 's-maxage=300, stale-while-revalidate=3600');
  return response;
}