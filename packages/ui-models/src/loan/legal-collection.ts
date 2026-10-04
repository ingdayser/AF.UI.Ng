import type { PaymentAgreementDto } from './payment-agreement.ts';

export interface LegalCollectionPaymentDto {
  paymentDate: string;
  referenceNumber?: string | null;
  amountApplied: number;
}

export interface LegalCollectionDto {
  id: string;
  assignmentDate: string;
  moraCutoffDate: string;
  lawyerName?: string | null;
  feePercentage: number;
  baseCapital: number;
  baseInterest: number;
  baseAdminFee: number;
  baseSignatureFee: number;
  baseMora: number;
  totalBase: number;
  feeAmount: number;
  totalLiquidacion: number;
  feePaid: number;
  feePending: number;
  moraPending: number;
  daysOverdueAtAssignment: number;
  observation?: string | null;
  closingDate?: string | null;
  feePayments: LegalCollectionPaymentDto[];
  paymentAgreement?: PaymentAgreementDto | null;
}

export interface LegalCollectionPreviewDto {
  loanId: string;
  loanNumber?: string | null;
  customerName: string;
  daysOverdue: number;
  moraCutoffDate: string;
  baseCapital: number;
  baseInterest: number;
  baseAdminFee: number;
  baseSignatureFee: number;
  baseMora: number;
  totalBase: number;
  feePercentage: number;
  feeAmount: number;
  totalLiquidacion: number;
}

export interface MoveToLegalCollectionRequest {
  lawyerId?: string | null;
  observation?: string | null;
  /** Date the loan moves to legal collection. Empty = today. Only today or the past. */
  assignmentDate?: string | null;
  /** true only calculates the liquidation without saving; false moves the loan to Jurídico. */
  isPreview?: boolean;
}
