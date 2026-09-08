import { Page, TestInfo } from '@playwright/test';

export async function attachScreenshot(page: Page, testInfo: TestInfo, name: string): Promise<void> {
  const image = await page.screenshot({ fullPage: true });
  await testInfo.attach(name, { body: image, contentType: 'image/png' });
}
