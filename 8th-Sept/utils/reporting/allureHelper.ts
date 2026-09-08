import { test } from '@playwright/test';

export async function reportData(testCaseId: string, productName: string): Promise<void> {
  test.info().annotations.push({ type: 'testCaseId', description: testCaseId });
  test.info().annotations.push({ type: 'product', description: productName });
}
