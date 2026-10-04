import {
  type Customer,
  type CustomerRequest,
  type LoanDto,
  type PersonalReference,
  type PersonalReferenceRequest,
  customerSearchQuery,
} from '@af/ui-models';
import type { Observable } from 'rxjs';
import { AfApi, apiToken } from './af-api.ts';

export interface CustomerFilters {
  readonly name?: string;
  readonly documentOrContact?: string;
}

/** Customers: `parameter/customer`. */
export class CustomerApi extends AfApi {
  constructor() {
    super('parameter/customer');
  }

  getAll(): Observable<Customer[]> {
    return this.get<Customer[]>('');
  }

  /**
   * Customers matching the filters that are not empty: `name`, and/or `documentOrContact` (document,
   * phone or email). With no filters it lists all. Silent when the call runs while the user types.
   */
  find(filters: CustomerFilters = {}, options: { readonly silent?: boolean } = {}): Observable<Customer[]> {
    return this.get<Customer[]>(
      '',
      { name: filters.name?.trim() || undefined, documentOrContact: filters.documentOrContact?.trim() || undefined },
      options,
    );
  }

  /** Customers by name, or by document / contact when the term is only digits. Silent: it runs while typing. */
  search(term: string): Observable<Customer[]> {
    return this.get<Customer[]>('', customerSearchQuery(term), { silent: true });
  }

  getById(id: string): Observable<Customer> {
    return this.get<Customer>(id);
  }

  create(request: CustomerRequest): Observable<Customer> {
    return this.post<CustomerRequest, Customer>('', request);
  }

  update(id: string, request: CustomerRequest): Observable<Customer> {
    return this.put<CustomerRequest, Customer>(id, request);
  }

  remove(id: string): Observable<void> {
    return this.delete<void>(id, { allowEmpty: true });
  }

  getLoans(customerId: string): Observable<LoanDto[]> {
    return this.get<LoanDto[]>(`${customerId}/loans`);
  }
}

export const CUSTOMER_API = apiToken('CUSTOMER_API', () => new CustomerApi());

/** Personal references of a customer: `parameter/personalreference`. */
export class PersonalReferenceApi extends AfApi {
  constructor() {
    super('parameter/personalreference');
  }

  getByCustomerId(customerId: string): Observable<PersonalReference[]> {
    return this.get<PersonalReference[]>(`customer/${customerId}`);
  }

  create(request: PersonalReferenceRequest): Observable<PersonalReference> {
    return this.post<PersonalReferenceRequest, PersonalReference>('', request);
  }

  update(id: string, request: PersonalReferenceRequest): Observable<PersonalReference> {
    return this.put<PersonalReferenceRequest, PersonalReference>(id, request);
  }

  remove(id: string): Observable<boolean> {
    return this.delete<boolean>(id);
  }
}

export const PERSONAL_REFERENCE_API = apiToken('PERSONAL_REFERENCE_API', () => new PersonalReferenceApi());
