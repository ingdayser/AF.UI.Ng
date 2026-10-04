import { QUOTA_PAID_CODE } from './loan-status.ts';
import type { LoanDto, MonthlyQuotaDto } from './loan.ts';

/** Quotas past their due date. */
export function overdueQuotas(loan: Pick<LoanDto, 'amortizationSchedule'>): MonthlyQuotaDto[] {
  return loan.amortizationSchedule.filter((quota) => quota.daysOverdue > 0);
}

/** The first quota still to pay that is not overdue yet, or null when there is none. */
export function nextQuota(loan: Pick<LoanDto, 'amortizationSchedule'>): MonthlyQuotaDto | null {
  return loan.amortizationSchedule.find((quota) => quota.statusCode !== QUOTA_PAID_CODE && quota.daysOverdue === 0) ?? null;
}

export function paidQuotas(loan: Pick<LoanDto, 'amortizationSchedule'>): MonthlyQuotaDto[] {
  return loan.amortizationSchedule.filter((quota) => quota.statusCode === QUOTA_PAID_CODE);
}

/** True when every quota is paid (the loan has nothing left to collect). */
export function isFullyPaid(loan: Pick<LoanDto, 'amortizationSchedule'>): boolean {
  return loan.amortizationSchedule.length > 0 && loan.amortizationSchedule.every((quota) => quota.statusCode === QUOTA_PAID_CODE);
}

/** Total owed on the overdue quotas: what is left of each quota plus its mora. */
export function totalOverdue(loan: Pick<LoanDto, 'amortizationSchedule'>): number {
  return overdueQuotas(loan).reduce((sum, quota) => sum + quota.remainingAmount + quota.moraInterest, 0);
}
