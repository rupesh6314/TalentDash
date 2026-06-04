import { prisma } from './prisma';

export function normaliseCompanyName(raw: string): string {
  return raw.trim().toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, ' ');
}

export async function findOrCreateCompany(rawName: string) {
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