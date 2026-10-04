export interface RegisterPaymentRequest {
  amount: number;
  accountId: string;
  paymentDate: string;
  observation?: string;
}

export interface AffectedQuotaResultDto {
  quotaId: string;
  quotaNumber: number;
  dueDate: string;
  quotaStatus: string;
  remainingAmount: number;
  appliedCapital: number;
  appliedInterest: number;
  appliedAdmin?: number | null;
  appliedFirma?: number | null;
  appliedMora?: number | null;
  daysOverdue: number;
}

export interface LoanPaymentResultDto {
  paymentId: string;
  paymentDate: string;
  totalAmount: number;
  currentBalance: number;
  loanStatus: string;
  affectedQuotas: AffectedQuotaResultDto[];
}

/** Payment of a "libre pago" quota: interest and capital are chosen by the operator. */
export interface LpPaymentRequest {
  quotaId: string;
  interestAmount: number;
  capitalAmount: number;
  accountId: string;
  paymentDate: string;
  observation?: string;
}

export interface LpPaymentResult {
  paymentId: string;
  paymentDate: string;
  totalAmount: number;
  quotaId: string;
  quotaNumber: number;
  quotaStatus: string;
  remainingAmount: number;
  appliedInterest: number;
  appliedCapital: number;
  currentBalance: number;
  loanStatus: string;
}
