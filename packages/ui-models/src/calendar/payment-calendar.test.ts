import { expect, it } from 'vitest';
import { toLocalDateTimeString } from './payment-calendar.ts';

it('formats a date in local time with zero padding', () => {
  expect(toLocalDateTimeString(new Date(2026, 0, 5, 3, 4, 9))).toBe('2026-01-05T03:04:09');
});
