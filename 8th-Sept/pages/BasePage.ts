import { Locator, Page } from '@playwright/test';
import { waitForVisible } from '../utils/synchronization/waitHelper';

export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  protected async click(locator: Locator): Promise<void> {
    await waitForVisible(locator);
    await locator.click();
  }

  protected async fill(locator: Locator, value: string): Promise<void> {
    await waitForVisible(locator);
    await locator.fill(value);
  }

  protected async text(locator: Locator): Promise<string> {
    await waitForVisible(locator);
    return (await locator.innerText()).trim();
  }
}
