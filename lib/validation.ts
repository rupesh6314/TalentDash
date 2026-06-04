import { z } from 'zod';
import { Level, Currency, Source } from '@prisma/client';

export const ingestSalarySchema = z.object({
  companyName: z.string().min(1),
  role: z.string().min(1),
  level: z.enum(Object.values(Level) as [string, ...string[]]),
  location: z.string().min(1),
  currency: z.enum(Object.values(Currency) as [string, ...string[]]).default('USD'),
  experienceYears: z.number().int().min(0).max(50),
  baseSalary: z.number().int().positive(),
  bonus: z.number().int().min(0).default(0),
  stock: z.number().int().min(0).default(0),
  source: z.enum(Object.values(Source) as [string, ...string[]]).default('CONTRIBUTOR'),
});