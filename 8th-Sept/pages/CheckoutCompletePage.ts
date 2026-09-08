import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutCompletePage extends BasePage {
  private readonly title = this.page.getByTestId('title');
  private readonly confirmation = this.page.getByTestId('complete-header');
  private readonly backButton = this.page.getByTestId('back-to-products');
  async expectVisible(): Promise<void> {
    await expect(this.title).toHaveText('Checkout: Complete!');
    await expect(this.confirmation).toHaveText('Thank you for your order!');
  }
  async backToProducts(): Promise<void> { await this.backButton.click(); }
}
