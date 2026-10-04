import { describe, expect, it } from 'vitest';
import { isFullyPaid, nextQuota, overdueQuotas, paidQuotas, totalOverdue } from './loan-rules.ts';
import { LoanStatusCode, LoanStatusLabel, LoanStatusTone, isLoanStatusCode } from './loan-status.ts';
import type { MonthlyQuotaDto } from './loan.ts';

const quota = (number: number, statusCode: string, daysOverdue = 0, remaining = 100, mora = 0): MonthlyQuotaDto => ({
  quotaId: `q${number}`,
  quotaNumber: number,
  dueDate: '2026-01-01T00:00:00Z',
  initialBalance: 0,
  principalAmount: 0,
  interestAmount: 0,
  signatureFee: 0,
  administrationFee: 0,
  totalAmount: remaining,
  balance: 0,
  status: '',
  statusCode,
  daysOverdue,
  moraInterest: mora,
  lateDays: daysOverdue,
  amountPaid: 0,
  remainingAmount: remaining,
});

const loan = (...quotas: MonthlyQuotaDto[]) => ({ amortizationSchedule: quotas });

describe('loan rules', () => {
  const schedule = loan(quota(1, 'C'), quota(2, 'V', 10, 80, 5), quota(3, 'V', 0, 100), quota(4, 'P', 0, 100));

  it('finds overdue, paid and next quotas', () => {
    expect(overdueQuotas(schedule).map((q) => q.quotaNumber)).toEqual([2]);
    expect(paidQuotas(schedule).map((q) => q.quotaNumber)).toEqual([1]);
    expect(nextQuota(schedule)?.quotaNumber).toBe(3);
  });

  it('adds what is left of each overdue quota and its mora', () => {
    expect(totalOverdue(schedule)).toBe(85);
    expect(totalOverdue(loan(quota(1, 'C')))).toBe(0);
  });

  it('knows when everything is paid', () => {
    expect(isFullyPaid(loan(quota(1, 'C'), quota(2, 'C')))).toBe(true);
    expect(isFullyPaid(schedule)).toBe(false);
    expect(isFullyPaid(loan())).toBe(false);
    expect(nextQuota(loan(quota(1, 'C')))).toBeNull();
  });
});

describe('loan status', () => {
  it('has a label and a tone for every code', () => {
    for (const code of Object.values(LoanStatusCode)) {
      expect(LoanStatusLabel[code]).toBeTruthy();
      expect(LoanStatusTone[code]).toBeTruthy();
    }
  });

  it('recognizes only known codes', () => {
    expect(isLoanStatusCode('J')).toBe(true);
    expect(isLoanStatusCode('Z')).toBe(false);
    expect(isLoanStatusCode(undefined)).toBe(false);
  });
});
