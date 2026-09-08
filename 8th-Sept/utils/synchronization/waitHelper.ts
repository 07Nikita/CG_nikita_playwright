import { Locator, Page } from '@playwright/test';

export async function waitForVisible(locator: Locator): Promise<void> { await locator.waitFor({ state: 'visible' }); }
export async function waitForUrl(page: Page, url: RegExp): Promise<void> { await page.waitForURL(url); }
