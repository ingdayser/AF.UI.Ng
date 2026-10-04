import type {
  CreateLoanRequest,
  CreatePaymentAgreementRequest,
  LegalCollectionDto,
  LegalCollectionPreviewDto,
  LoanDto,
  LoanPaymentResultDto,
  LpPaymentRequest,
  LpPaymentResult,
  MoraPreviewDto,
  MoveToLegalCollectionRequest,
  PaymentAgreementDto,
  PaymentAgreementPreviewDto,
  QuotaPaymentDto,
  RegisterPaymentRequest,
} from '@af/ui-models';
import type { Observable } from 'rxjs';
import { AfApi, apiToken } from './af-api.ts';

/** Loans: `finance/loan`. */
export class LoanApi extends AfApi {
  constructor() {
    super('finance/loan');
  }

  /** With `isSimulation: true` it only calculates the loan. */
  create(request: CreateLoanRequest): Observable<LoanDto> {
    return this.post<CreateLoanRequest, LoanDto>('', request);
  }

  getAll(): Observable<LoanDto[]> {
    return this.get<LoanDto[]>('');
  }

  getById(id: string): Observable<LoanDto> {
    return this.get<LoanDto>(id);
  }

  remove(loanId: string): Observable<void> {
    return this.delete<void>(loanId, { allowEmpty: true });
  }

  registerPayment(loanId: string, request: RegisterPaymentRequest): Observable<LoanPaymentResultDto> {
    return this.post<RegisterPaymentRequest, LoanPaymentResultDto>(`${loanId}/payments`, request);
  }

  registerLpPayment(loanId: string, request: LpPaymentRequest): Observable<LpPaymentResult> {
    return this.post<LpPaymentRequest, LpPaymentResult>(`${loanId}/lp-payments`, request);
  }

  deletePayment(loanId: string, paymentId: string): Observable<LoanDto> {
    return this.delete<LoanDto>(`${loanId}/payment/${paymentId}`);
  }

  getQuotaPayments(loanId: string, quotaId: string): Observable<QuotaPaymentDto[]> {
    return this.get<QuotaPaymentDto[]>(`${loanId}/quotas/${quotaId}/payments`);
  }

  /** Mora a payment made on `paymentDate` would generate. Silent: it runs while the user types the date. */
  getMoraPreview(loanId: string, paymentDate: string): Observable<MoraPreviewDto> {
    return this.get<MoraPreviewDto>(`${loanId}/mora`, { fechaPago: paymentDate }, { silent: true });
  }

  validate(loanId: string): Observable<LoanDto> {
    return this.post<null, LoanDto>(`${loanId}/validate`, null);
  }

  disburse(loanId: string, accountId: string, disbursementDate: string): Observable<LoanDto> {
    return this.post<{ accountId: string; disbursementDate: string }, LoanDto>(`${loanId}/disburse`, {
      accountId,
      disbursementDate,
    });
  }

  sign(loanId: string): Observable<LoanDto> {
    return this.post<null, LoanDto>(`${loanId}/sign`, null);
  }

  /** With `isPreview: true` it only calculates the liquidation. */
  moveToLegalCollection(loanId: string, request: MoveToLegalCollectionRequest): Observable<LegalCollectionPreviewDto> {
    return this.post<MoveToLegalCollectionRequest, LegalCollectionPreviewDto>(`${loanId}/legal-collection`, request);
  }

  notifyLegalCollectionProgress(loanId: string): Observable<LegalCollectionDto> {
    return this.post<null, LegalCollectionDto>(`${loanId}/legal-collection/notify-progress`, null);
  }

  getPaymentAgreementPreview(loanId: string, numeroCuotas: number): Observable<PaymentAgreementPreviewDto> {
    return this.get<PaymentAgreementPreviewDto>(`${loanId}/payment-agreement/preview`, { numeroCuotas });
  }

  /** The loan's agreement, or `null` when it has none. */
  getPaymentAgreement(loanId: string): Observable<PaymentAgreementDto | null> {
    return this.get<PaymentAgreementDto | null>(`${loanId}/payment-agreement`, undefined, { allowEmpty: true });
  }

  createPaymentAgreement(loanId: string, request: CreatePaymentAgreementRequest): Observable<PaymentAgreementDto> {
    return this.post<CreatePaymentAgreementRequest, PaymentAgreementDto>(`${loanId}/payment-agreement`, request);
  }

  notifyAgreementBreach(loanId: string): Observable<PaymentAgreementDto> {
    return this.post<null, PaymentAgreementDto>(`${loanId}/payment-agreement/notify-breach`, null);
  }
}

export const LOAN_API = apiToken('LOAN_API', () => new LoanApi());
