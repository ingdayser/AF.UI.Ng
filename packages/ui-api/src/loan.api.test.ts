import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SKIP_GLOBAL_LOADING, loadingInterceptor, LoadingStore } from '@at/ui-http';
import { describe, expect, it } from 'vitest';
import { AF_API_CONFIG } from './config.ts';
import { CUSTOMER_API } from './customer.api.ts';
import { LOAN_API } from './loan.api.ts';
import { ACCOUNT_API, PAYMENT_CALENDAR_API, PAYMENT_TYPE_API, SUPPLIER_API } from './parameters.api.ts';

const CORE = 'https://core.test/api/v1.0';
const ok = <T>(result: T | null) => ({ responseType: 1, error: null, result });

function setup() {
  TestBed.configureTestingModule({
    providers: [
      { provide: AF_API_CONFIG, useValue: { coreApiUrl: `${CORE}/` } },
      provideHttpClient(withInterceptors([loadingInterceptor])),
      provideHttpClientTesting(),
    ],
  });
  return { http: TestBed.inject(HttpTestingController), loading: TestBed.inject(LoadingStore) };
}

describe('LoanApi', () => {
  it('registers a payment against the loan and returns its result', () => {
    const { http } = setup();
    let result: unknown;
    TestBed.runInInjectionContext(() => {
      TestBed.inject(LOAN_API)
        .registerPayment('L1', { amount: 100, accountId: 'A1', paymentDate: '2026-01-01T00:00:00Z' })
        .subscribe((value) => (result = value));
    });
    const req = http.expectOne(`${CORE}/finance/loan/L1/payments`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ amount: 100, accountId: 'A1', paymentDate: '2026-01-01T00:00:00Z' });
    req.flush(ok({ paymentId: 'P1', affectedQuotas: [] }));
    expect(result).toEqual({ paymentId: 'P1', affectedQuotas: [] });
  });

  it('asks for the mora with the payment date and without showing the loader', () => {
    const { http, loading } = setup();
    TestBed.inject(LOAN_API).getMoraPreview('L1', '2026-02-01').subscribe();
    expect(loading.pending()).toBe(0);
    const req = http.expectOne((r) => r.url === `${CORE}/finance/loan/L1/mora`);
    expect(req.request.params.get('fechaPago')).toBe('2026-02-01');
    expect(req.request.context.get(SKIP_GLOBAL_LOADING)).toBe(true);
    req.flush(ok({ generaMora: false }));
  });

  it('passes the installments as a query string and accepts a loan without agreement', () => {
    const { http } = setup();
    const api = TestBed.inject(LOAN_API);
    api.getPaymentAgreementPreview('L1', 3).subscribe();
    expect(http.expectOne((r) => r.url.endsWith('/payment-agreement/preview')).request.params.get('numeroCuotas')).toBe('3');

    let agreement: unknown = 'unset';
    api.getPaymentAgreement('L1').subscribe((value) => (agreement = value));
    http.expectOne(`${CORE}/finance/loan/L1/payment-agreement`).flush(ok(null));
    expect(agreement).toBeNull();
  });

  it('deletes a payment and returns the updated loan', () => {
    const { http } = setup();
    TestBed.inject(LOAN_API).deletePayment('L1', 'P9').subscribe();
    const req = http.expectOne(`${CORE}/finance/loan/L1/payment/P9`);
    expect(req.request.method).toBe('DELETE');
    req.flush(ok({ loanId: 'L1' }));
  });
});

describe('CustomerApi', () => {
  it('searches by name, or by document when the term is only digits, silently', () => {
    const { http, loading } = setup();
    const api = TestBed.inject(CUSTOMER_API);
    api.search('Ana').subscribe();
    api.search('1032').subscribe();
    expect(loading.pending()).toBe(0);
    const [byName, byDocument] = http.match((r) => r.url === `${CORE}/parameter/customer`);
    expect(byName?.request.params.toString()).toBe('name=Ana');
    expect(byDocument?.request.params.toString()).toBe('documentOrContact=1032');
    byName?.flush(ok([]));
    byDocument?.flush(ok([]));
  });

  it('lists the loans of a customer', () => {
    const { http } = setup();
    TestBed.inject(CUSTOMER_API).getLoans('C1').subscribe();
    http.expectOne(`${CORE}/parameter/customer/C1/loans`).flush(ok([]));
  });
});

describe('parameter clients', () => {
  it('share the five CRUD calls', () => {
    const { http } = setup();
    const api = TestBed.inject(PAYMENT_TYPE_API);
    api.getAll().subscribe();
    api.getById('1').subscribe();
    api.create({ description: 'Efectivo', code: 'EF' }).subscribe();
    api.update('1', { description: 'Efectivo', code: 'EF' }).subscribe();
    let removed: unknown = 'unset';
    api.remove('1').subscribe((value) => (removed = value));

    const calls = http.match(() => true);
    expect(calls.map((c) => `${c.request.method} ${c.request.url.replace(CORE, '')}`)).toEqual([
      'GET /parameter/paymenttype',
      'GET /parameter/paymenttype/1',
      'POST /parameter/paymenttype',
      'PUT /parameter/paymenttype/1',
      'DELETE /parameter/paymenttype/1',
    ]);
    calls.forEach((c) => c.flush(ok(c.request.method === 'DELETE' ? null : {})));
    expect(removed).toBeNull();
  });

  it('reads the movements of an account', () => {
    const { http } = setup();
    TestBed.inject(ACCOUNT_API).getMovements('A1').subscribe();
    http.expectOne(`${CORE}/parameter/account/A1/movimientos`).flush(ok([]));
  });

  it('suppliers cannot be deleted', () => {
    setup();
    expect('remove' in TestBed.inject(SUPPLIER_API)).toBe(false);
  });

  it('asks for the payment calendar in local time', () => {
    const { http } = setup();
    TestBed.inject(PAYMENT_CALENDAR_API).getCalendar(new Date(2026, 0, 1, 0, 0, 0), new Date(2026, 0, 31, 23, 59, 59)).subscribe();
    const req = http.expectOne((r) => r.url === `${CORE}/finance/loan/payment-calendar`);
    expect(req.request.params.get('from')).toBe('2026-01-01T00:00:00');
    expect(req.request.params.get('to')).toBe('2026-01-31T23:59:59');
    req.flush(ok([]));
  });
});
