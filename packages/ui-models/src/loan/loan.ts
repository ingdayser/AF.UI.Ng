import type { Customer } from '../customer/customer.ts';
import type { LoanStatusCode } from './loan-status.ts';
import type { LegalCollectionDto } from './legal-collection.ts';

export interface QuotaPaymentDto {
  paymentId: string;
  paymentDate: string;
  registrationDate: string;
  totalPaymentAmount: number;
  appliedTotal: number;
  appliedCapital: number;
  appliedInterest: number;
  appliedAdmin: number;
  appliedFirma: number;
  appliedMora: number;
  paymentType: string;
  reference?: string | null;
  reversado: boolean;
}

export interface MonthlyQuotaDto {
  quotaId: string;
  quotaNumber: number;
  dueDate: string;
  initialBalance: number;
  principalAmount: number;
  interestAmount: number;
  signatureFee: number;
  administrationFee: number;
  totalAmount: number;
  balance: number;
  status: string;
  statusCode: string;
  daysOverdue: number;
  moraInterest: number;
  lateDays: number;
  amountPaid: number;
  remainingAmount: number;
}

export interface LoanDto {
  // Entity fields: populated only when the loan is not a simulation
  loanId: string;
  loanNumber?: string | null;
  customer?: Customer | null;
  loanTypeId: string;
  loanType: string;
  loanTypeCode: string;
  observation?: string | null;
  expenditureDate: string;

  // Always populated
  initialDate: string;
  dueDate: string;
  initialAmount: number;
  currentBalance: number;
  loanStatus: string;
  loanStatusCode: LoanStatusCode;
  interestRate: number;
  dailyInterestRate: number;
  annualEffectiveRate: number;

  // Calculation fields: populated after the domain strategy runs
  monthlyInstallment: number;
  monthlyCapitalAndInterest: number;
  totalInterest: number;
  totalPayment: number;
  monthlyAdminFee: number;
  signatureFeeTotal: number;
  suretyFeeTotal: number;
  amortizationSchedule: MonthlyQuotaDto[];
  daysOverdue: number;
  totalMoraInterest: number;
  totalLateDays: number;
  requiresValidation: boolean;
  allowsCapitalPayment: boolean;
  promissoryNoteId?: string | null;
  totalDaysOverdue: number;
  canMoveToLegalCollection: boolean;
  legalCollection?: LegalCollectionDto | null;
}

/** With `isSimulation: true` the loan is only calculated, nothing is saved. */
export interface CreateLoanRequest {
  customerId: string | null;
  amount: number;
  loanTypeId: string;
  initialDate: string;
  quotaNumber: number;
  signature: number;
  description?: string | null;
  isSimulation: boolean;
}

export interface MoraPreviewDto {
  loanId: string;
  loanTypeCode: string;
  paymentDate: string;
  generaMora: boolean;
  quotaId: string;
  quotaNumber: number;
  dueDate: string;
  daysOverdue: number;
  remainingAmount: number;
  moraInterest: number;
  totalAmount: number;
}
