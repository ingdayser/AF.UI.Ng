export interface PaymentAgreementInstallmentDto {
  numeroCuota: number;
  fechaVencimiento: string;
  monto: number;
  pagada: boolean;
}

export interface PaymentAgreementDto {
  id: string;
  tipoAcuerdo: 'U' | 'D';
  numeroCuotas: number;
  saldoBase: number;
  saldoMoraCondonada: number;
  saldoTotalPactado: number;
  fechaLimite: string;
  fechaCreacion: string;
  estado: 'V' | 'C' | 'I';
  cuotas: PaymentAgreementInstallmentDto[];
}

export interface PaymentAgreementPreviewDto {
  saldoBase: number;
  saldoMoraCondonada: number;
  saldoTotalPactado: number;
  fechaLimite: string;
  fechaMinima: string;
  fechaMaximaEfectiva: string;
  cuotasPropuestas: number[];
}

export interface PaymentAgreementInstallmentRequest {
  monto: number;
  fechaVencimiento: string;
}

export interface CreatePaymentAgreementRequest {
  cuotas: PaymentAgreementInstallmentRequest[];
}
