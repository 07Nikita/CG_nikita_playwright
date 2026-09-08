import { expect } from '@playwright/test';

export function expectCurrency(actual: string | number, expected: number, label: string): void {
  const actualValue = typeof actual === 'number' ? actual : Number(actual.replace(/[^0-9.-]/g, ''));
  expect(actualValue, `${label} mismatch`).toBeCloseTo(expected, 2);
}
