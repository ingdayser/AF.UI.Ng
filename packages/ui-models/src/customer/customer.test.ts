import { describe, expect, it } from 'vitest';
import { customerFullName, customerSearchQuery, customerShortName } from './customer.ts';

describe('customer helpers', () => {
  it('joins only the names that exist', () => {
    expect(customerFullName({ firstName: 'Ana', secondName: ' María ', firstSurname: 'Pérez', secondSurname: null })).toBe('Ana María Pérez');
    expect(customerFullName({ firstName: 'Ana', firstSurname: 'Pérez' })).toBe('Ana Pérez');
  });

  it('greets with first name and first surname', () => {
    expect(customerShortName({ firstName: 'Ana', firstSurname: 'Pérez' })).toBe('Ana Pérez');
  });

  it('searches by document or contact when the term is only digits, by name otherwise', () => {
    expect(customerSearchQuery(' 1234567 ')).toEqual({ documentOrContact: '1234567' });
    expect(customerSearchQuery('Ana Pérez')).toEqual({ name: 'Ana Pérez' });
    expect(customerSearchQuery('ana@mail.co')).toEqual({ name: 'ana@mail.co' });
  });
});
