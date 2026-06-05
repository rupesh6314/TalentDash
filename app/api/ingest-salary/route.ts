import { NextResponse } from 'next/server';
import { ingestSalarySchema } from '@/lib/validation';
import { findOrCreateCompany } from '@/lib/normalisation';
import { prisma } from '@/lib/prisma';
import { Level, Currency, Source } from '@prisma/client';

export async function POST(req: Request) {
  const body = await req.json();
  const result = ingestSalarySchema.safeParse(body);
  if (!result.success) {
    const error = result.error.errors[0];
    const field = error.path[0] as string;
    let message = error.message;
    if (field === 'level') {
      message = 'Level must be one of: L3, L4, L5, L6, SDE_I, SDE_II, SDE_III, STAFF, PRINCIPAL, IC4, IC5';
    }
    return NextResponse.json({ error: true, field, message }, { status: 400 });
  }
  const data = result.data;
  const company = await findOrCreateCompany(data.companyName);
  const total = data.baseSalary + data.bonus + data.stock;
  const level = data.level as Level;
  const currency = data.currency as Currency;
  const source = data.source as Source;
  const duplicate = await prisma.salary.findFirst({
    where: { companyId: company.id, role: data.role, level, location: data.location, baseSalary: { gte: data.baseSalary*0.9, lte: data.baseSalary*1.1 }, submittedAt: { gte: new Date(Date.now()-48*3600000) } }
  });
  if (duplicate) return NextResponse.json({ error: 'Duplicate salary record found within 48 hours' }, { status: 409 });
  const salary = await prisma.salary.create({
    data: { companyId: company.id, role: data.role, level, location: data.location, currency, experienceYears: data.experienceYears, baseSalary: BigInt(data.baseSalary), bonus: BigInt(data.bonus), stock: BigInt(data.stock), totalCompensation: BigInt(total), source, confidenceScore: data.confidenceScore }
  });
  return NextResponse.json({ ...salary, totalCompensation: Number(salary.totalCompensation), baseSalary: Number(salary.baseSalary), bonus: Number(salary.bonus), stock: Number(salary.stock), confidenceScore: Number(salary.confidenceScore) }, { status: 201 });
}