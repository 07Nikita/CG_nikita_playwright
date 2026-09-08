import { PurchaseData } from './testData';

export function validatePurchaseData(rows: PurchaseData[]): void {
  const ids = new Set<string>();
  for (const row of rows) {
    if (ids.has(row.testCaseId)) throw new Error(`Duplicate TestCaseId: ${row.testCaseId}`);
    ids.add(row.testCaseId);
    if (!row.testCaseId || !row.username || !row.password) throw new Error(`Missing required login data for ${row.testCaseId}`);
    if (row.expectedCheckoutResult === 'Success' && !row.productName) throw new Error(`Missing product for ${row.testCaseId}`);
  }
}
