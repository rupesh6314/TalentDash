import { NextResponse } from 'next/server';
import { ingestSalarySchema } from '@/lib/validation';
import { findOrCreateCompany } from '@/lib/normalisation';
import { prisma } from '@/lib/prisma';
import { Level, Currency, Source } from '@prisma/client';

export async function POST(req: Request) {
  const body = await req.json();
  const result = ingestSalarySchema.safeParse(body);
  if (!result.success) return NextResponse.json({ error: result.error }, { status: 400 });
  const data = result.data;
  const company = await findOrCreateCompany(data.companyName);
  const total = data.baseSalary + data.bonus + data.stock;
  const level = data.level as Level;
  const currency = data.currency as Currency;
  const source = data.source as Source;
  const duplicate = await prisma.salary.findFirst({
    where: { companyId: company.id, role: data.role, level, location: data.location, baseSalary: { gte: data.baseSalary*0.9, lte: data.baseSalary*1.1 }, submittedAt: { gte: new Date(Date.now()-48*3600000) } }
  });
  if (duplicate) return NextResponse.json({ error: 'Duplicate' }, { status: 409 });
  const salary = await prisma.salary.create({
    data: { companyId: company.id, role: data.role, level, location: data.location, currency, experienceYears: data.experienceYears, baseSalary: BigInt(data.baseSalary), bonus: BigInt(data.bonus), stock: BigInt(data.stock), totalCompensation: BigInt(total), source }
  });
  return NextResponse.json({ ...salary, totalCompensation: Number(salary.totalCompensation) }, { status: 201 });
}