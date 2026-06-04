import { Company, Salary, Level, Currency, Source } from '@prisma/client';

export type SalaryWithCompany = Salary & {
  company: Company;
};

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CompanyWithSalaries extends Company {
  salaries: Salary[];
}

export interface CompareDelta {
  baseDelta: number;
  bonusDelta: number;
  stockDelta: number;
  tcDelta: number;
  experienceDelta: number;
}

export interface CompareResponse {
  record1: SalaryWithCompany;
  record2: SalaryWithCompany;
  delta: CompareDelta;
}

export { Level, Currency, Source };