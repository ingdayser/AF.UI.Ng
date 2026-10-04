export interface PaymentTypeDto {
  paymentTypeId: string;
  description: string;
  code: string;
}

export interface CreatePaymentTypeRequest {
  description: string;
  code: string;
}

export interface AccountDto {
  readonly id: string;
  readonly ownerId: string;
  readonly entity: string;
  readonly currentBalance: number | null;
  readonly paymentTypeId: string;
  readonly paymentType: string;
}

export interface AccountRequest {
  ownerId: string;
  entity: string;
  currentBalance: number | null;
  paymentTypeId: string;
}

/** D = deposit, P = payment received, R = reversal. */
export type AccountMovementType = 'D' | 'P' | 'R';

export interface MovimientoCuentaDto {
  readonly id: string;
  readonly cuentaId: string;
  readonly fechaMovimiento: string;
  readonly tipoMovimiento: AccountMovementType;
  readonly monto: number;
  readonly creditoId: string | null;
  readonly numeroCredito: string | null;
  readonly pagoId: string | null;
  readonly concepto: string;
}

export interface DocumentType {
  id: string;
  name: string;
  shortName: string;
}

export interface LoanStatusDto {
  readonly loanStatusId: string;
  readonly description: string;
  readonly code: string;
}

export interface LoanStatusRequest {
  description: string;
  code: string;
}

export interface QuotaStatusDto {
  readonly quotaStatusId: string;
  readonly description: string;
  readonly code: string;
}

export interface QuotaStatusRequest {
  description: string;
  code: string;
}

export interface SupplierDto {
  readonly supplierId: string;
  readonly businessName: string;
  readonly documentTypeId: string;
  readonly documentType: string;
  readonly taxId: string;
  readonly phone: string | null;
  readonly email: string | null;
  readonly address: string | null;
}

export interface SupplierRequest {
  businessName: string;
  documentTypeId: string;
  taxId: string;
  phone: string | null;
  email: string | null;
  address: string | null;
}

export interface RateDto {
  readonly id: string;
  readonly loanTypeId: string;
  readonly loanTypeName: string;
  readonly loanTypeCode: string;
  readonly annualEffectiveRate: number;
  readonly monthlyRate: number;
  readonly dailyRate: number;
  readonly monthlyAdminPercentage: number;
  readonly suggestedMonthlySignature: number;
  readonly guarantyPercentage: number;
  readonly validFrom: string;
  readonly validUntil: string | null;
}

export interface RateRequest {
  loanTypeId: string;
  annualEffectiveRate: number;
  monthlyAdminPercentage: number;
  suggestedMonthlySignature: number;
  guarantyPercentage: number;
  validFrom: string;
  validUntil: string | null;
}

export interface LoanTypeDto {
  readonly loanTypeId: string;
  readonly name: string;
  readonly description: string;
  readonly code: string;
  readonly maxTermMonths: number | null;
  readonly allowsCapitalPayment: boolean;
  readonly generatesFixedPlan: boolean;
  readonly chargesAdminPerInstallment: boolean;
  readonly chargesDeferredSignature: boolean;
  readonly generatesMoraInterest: boolean;
  readonly generatesHonorarios: boolean;
  readonly requiresValidation: boolean;
  readonly rate: RateDto | null;
}

export interface LoanTypeRequest {
  name: string;
  description: string;
  code: string;
  maxTermMonths: number | null;
  allowsCapitalPayment: boolean;
  generatesFixedPlan: boolean;
  chargesAdminPerInstallment: boolean;
  chargesDeferredSignature: boolean;
  generatesMoraInterest: boolean;
  generatesHonorarios: boolean;
  requiresValidation: boolean;
}
