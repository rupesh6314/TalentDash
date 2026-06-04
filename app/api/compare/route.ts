import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const s1 = req.nextUrl.searchParams.get('s1');
    const s2 = req.nextUrl.searchParams.get('s2');

    if (!s1 || !s2) {
      return NextResponse.json(
        { error: true, message: 'Both s1 and s2 are required' },
        { status: 400 }
      );
    }

    if (s1 === s2) {
      return NextResponse.json(
        { error: true, message: 'Cannot compare identical records' },
        { status: 400 }
      );
    }

    const [record1, record2] = await Promise.all([
      prisma.salary.findUnique({
        where: { id: s1 },
        include: { company: true },
      }),
      prisma.salary.findUnique({
        where: { id: s2 },
        include: { company: true },
      }),
    ]);

    if (!record1 || !record2) {
      return NextResponse.json(
        { error: true, message: 'One or both salary records not found' },
        { status: 404 }
      );
    }

    // Convert BigInt to Number
    const toNum = (val: bigint) => Number(val);

    const delta = {
      baseDelta: toNum(record1.baseSalary) - toNum(record2.baseSalary),
      bonusDelta: toNum(record1.bonus) - toNum(record2.bonus),
      stockDelta: toNum(record1.stock) - toNum(record2.stock),
      tcDelta: toNum(record1.totalCompensation) - toNum(record2.totalCompensation),
      experienceDelta: record1.experienceYears - record2.experienceYears,
    };

    const response = NextResponse.json({
      record1: {
        ...record1,
        baseSalary: toNum(record1.baseSalary),
        bonus: toNum(record1.bonus),
        stock: toNum(record1.stock),
        totalCompensation: toNum(record1.totalCompensation),
      },
      record2: {
        ...record2,
        baseSalary: toNum(record2.baseSalary),
        bonus: toNum(record2.bonus),
        stock: toNum(record2.stock),
        totalCompensation: toNum(record2.totalCompensation),
      },
      delta,
    });

    response.headers.set('Cache-Control', 's-maxage=60');
    return response;
  } catch (error) {
    console.error('Compare API error:', error);
    return NextResponse.json(
      { error: true, message: 'Internal server error' },
      { status: 500 }
    );
  }
}