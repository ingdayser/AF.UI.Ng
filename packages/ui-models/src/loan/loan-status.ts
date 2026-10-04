/** Loan status codes. The backend sends and expects these single letters. */
export enum LoanStatusCode {
  Validado = 'V',
  Pendiente = 'P',
  Cancelada = 'C',
  Activo = 'A',
  EnTramite = 'T',
  Firmar = 'F',
  Juridico = 'J',
}

export const LoanStatusLabel: Record<LoanStatusCode, string> = {
  [LoanStatusCode.Validado]: 'Validado',
  [LoanStatusCode.Pendiente]: 'Pendiente',
  [LoanStatusCode.Cancelada]: 'Cancelada',
  [LoanStatusCode.Activo]: 'Activo',
  [LoanStatusCode.EnTramite]: 'En trámite',
  [LoanStatusCode.Firmar]: 'Por firmar',
  [LoanStatusCode.Juridico]: 'Jurídico',
};

/** Meaning of a status color, so each app maps it to its own palette (Bootstrap class, native color...). */
export type StatusTone = 'success' | 'warning' | 'secondary' | 'primary' | 'info' | 'danger';

export const LoanStatusTone: Record<LoanStatusCode, StatusTone> = {
  [LoanStatusCode.Validado]: 'success',
  [LoanStatusCode.Pendiente]: 'warning',
  [LoanStatusCode.Cancelada]: 'secondary',
  [LoanStatusCode.Activo]: 'primary',
  [LoanStatusCode.EnTramite]: 'info',
  [LoanStatusCode.Firmar]: 'warning',
  [LoanStatusCode.Juridico]: 'danger',
};

/** Quota status code of a fully paid quota. */
export const QUOTA_PAID_CODE = 'C';

export function isLoanStatusCode(value: unknown): value is LoanStatusCode {
  return Object.values(LoanStatusCode).includes(value as LoanStatusCode);
}
