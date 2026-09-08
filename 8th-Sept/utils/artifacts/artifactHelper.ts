import { Page, TestInfo } from '@playwright/test';
import { attachScreenshot } from './screenshotHelper';

export async function attachFailureArtifacts(page: Page, testInfo: TestInfo): Promise<void> {
  await attachScreenshot(page, testInfo, 'failure-screenshot');
}
export { attachScreenshot };
