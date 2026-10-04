import type {
  AccountDto,
  AccountRequest,
  CreatePaymentTypeRequest,
  DocumentType,
  LoanStatusDto,
  LoanStatusRequest,
  LoanTypeDto,
  LoanTypeRequest,
  MovimientoCuentaDto,
  PaymentCalendarItemDto,
  PaymentTypeDto,
  QuotaStatusDto,
  QuotaStatusRequest,
  RateDto,
  RateRequest,
  SupplierDto,
  SupplierRequest,
} from '@af/ui-models';
import { toLocalDateTimeString } from '@af/ui-models';
import type { Observable } from 'rxjs';
import { AfApi, CrudApi, apiToken } from './af-api.ts';

/** Accounts where money is received: `parameter/account`. */
export class AccountApi extends CrudApi<AccountDto, AccountRequest> {
  constructor() {
    super('parameter/account');
  }

  getMovements(accountId: string): Observable<MovimientoCuentaDto[]> {
    return this.get<MovimientoCuentaDto[]>(`${accountId}/movimientos`);
  }
}
export const ACCOUNT_API = apiToken('ACCOUNT_API', () => new AccountApi());

export class PaymentTypeApi extends CrudApi<PaymentTypeDto, CreatePaymentTypeRequest> {
  constructor() {
    super('parameter/paymenttype');
  }
}
export const PAYMENT_TYPE_API = apiToken('PAYMENT_TYPE_API', () => new PaymentTypeApi());

export class RateApi extends CrudApi<RateDto, RateRequest> {
  constructor() {
    super('parameter/rate');
  }
}
export const RATE_API = apiToken('RATE_API', () => new RateApi());

export class LoanTypeApi extends CrudApi<LoanTypeDto, LoanTypeRequest> {
  constructor() {
    super('parameter/loantype');
  }
}
export const LOAN_TYPE_API = apiToken('LOAN_TYPE_API', () => new LoanTypeApi());

export class LoanStatusApi extends CrudApi<LoanStatusDto, LoanStatusRequest> {
  constructor() {
    super('parameter/loanstatus');
  }
}
export const LOAN_STATUS_API = apiToken('LOAN_STATUS_API', () => new LoanStatusApi());

export class QuotaStatusApi extends CrudApi<QuotaStatusDto, QuotaStatusRequest> {
  constructor() {
    super('parameter/quotastatus');
  }
}
export const QUOTA_STATUS_API = apiToken('QUOTA_STATUS_API', () => new QuotaStatusApi());

/** Suppliers have no delete in the API. */
export class SupplierApi extends AfApi {
  constructor() {
    super('parameter/supplier');
  }

  getAll(): Observable<SupplierDto[]> {
    return this.get<SupplierDto[]>('');
  }

  getById(id: string): Observable<SupplierDto> {
    return this.get<SupplierDto>(id);
  }

  create(request: SupplierRequest): Observable<SupplierDto> {
    return this.post<SupplierRequest, SupplierDto>('', request);
  }

  update(id: string, request: SupplierRequest): Observable<SupplierDto> {
    return this.put<SupplierRequest, SupplierDto>(id, request);
  }
}
export const SUPPLIER_API = apiToken('SUPPLIER_API', () => new SupplierApi());

export class DocumentTypeApi extends AfApi {
  constructor() {
    super('parameter/documenttype');
  }

  getAll(): Observable<DocumentType[]> {
    return this.get<DocumentType[]>('');
  }
}
export const DOCUMENT_TYPE_API = apiToken('DOCUMENT_TYPE_API', () => new DocumentTypeApi());

/** Quotas due in a date range: `finance/loan/payment-calendar`. */
export class PaymentCalendarApi extends AfApi {
  constructor() {
    super('finance/loan');
  }

  getCalendar(from: Date, to: Date): Observable<PaymentCalendarItemDto[]> {
    return this.get<PaymentCalendarItemDto[]>('payment-calendar', {
      from: toLocalDateTimeString(from),
      to: toLocalDateTimeString(to),
    });
  }
}
export const PAYMENT_CALENDAR_API = apiToken('PAYMENT_CALENDAR_API', () => new PaymentCalendarApi());
