export function currencyValue(value: string | number): number {
  const numeric = typeof value === 'number' ? value : Number(value.replace(/[^0-9.-]/g, ''));
  if (!Number.isFinite(numeric)) throw new Error(`Invalid currency value: ${value}`);
  return Number(numeric.toFixed(2));
}
export function calculateTotal(subtotal: number, tax: number): number {
  return Number((subtotal + tax).toFixed(2));
}
