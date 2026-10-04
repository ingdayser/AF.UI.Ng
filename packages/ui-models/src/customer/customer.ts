export interface Customer {
  customerId: string;
  firstName: string;
  secondName?: string | null;
  firstSurname: string;
  secondSurname?: string | null;
  documentTypeId: string;
  documentType: string;
  documentTypeCode: string;
  documentNumber: string;
  phoneNumber: string;
  email?: string | null;
  address?: string | null;
  birthDate?: string | null;
  documentIssueDate?: string | null;
  description?: string | null;
  empresa?: string | null;
  direccionEmpresa?: string | null;
  telefonoEmpresa?: string | null;
  cargo?: string | null;
}

export interface CustomerRequest {
  firstName: string;
  secondName?: string | null;
  firstSurname: string;
  secondSurname?: string | null;
  documentTypeId: string;
  documentNumber: string;
  isProvider: boolean;
  address: string;
  phone: string;
  mail?: string | null;
  birthDate: string;
  documentIssueDate: string;
  description?: string | null;
  custumerReferrer?: string | null;
  empresa?: string | null;
  direccionEmpresa?: string | null;
  telefonoEmpresa?: string | null;
  cargo?: string | null;
}

export interface PersonalReference {
  id: string;
  nombreCompleto: string;
  parentezco: string;
  celular: string;
  customerId: string;
}

export interface PersonalReferenceRequest {
  nombreCompleto: string;
  parentezco: string;
  celular: string;
  customerId: string;
}

/** "Ana María Pérez Gómez": the names that exist, in order. */
export function customerFullName(customer: Pick<Customer, 'firstName' | 'secondName' | 'firstSurname' | 'secondSurname'>): string {
  return [customer.firstName, customer.secondName, customer.firstSurname, customer.secondSurname]
    .map((part) => part?.trim())
    .filter((part): part is string => !!part)
    .join(' ');
}

/** "Ana Pérez": first name and first surname, the way messages greet a customer. */
export function customerShortName(customer: Pick<Customer, 'firstName' | 'firstSurname'>): string {
  return `${customer.firstName} ${customer.firstSurname}`.trim();
}

/**
 * How the customer search should filter: a term of only digits is a document or a phone
 * (`documentOrContact`), anything else is a name (`name`).
 */
export function customerSearchQuery(term: string): { documentOrContact: string } | { name: string } {
  const value = term.trim();
  return /^\d+$/.test(value) ? { documentOrContact: value } : { name: value };
}
