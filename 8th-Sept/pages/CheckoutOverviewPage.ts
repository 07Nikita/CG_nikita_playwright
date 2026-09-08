import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutOverviewPage extends BasePage {
  private readonly title = this.page.getByTestId('title');
  private readonly items = this.page.getByTestId('inventory-item');
  private readonly subtotal = this.page.getByTestId('subtotal-label');
  private readonly tax = this.page.getByTestId('tax-label');
  private readonly total = this.page.getByTestId('total-label');
  private readonly finishButton = this.page.getByTestId('finish');
  async expectVisible(): Promise<void> { await expect(this.title).toHaveText('Checkout: Overview'); }
  async expectProduct(name: string): Promise<void> { await expect(this.items.filter({ hasText: name })).toHaveCount(1); }
  async productPrice(name: string): Promise<string> { return this.items.filter({ hasText: name }).getByTestId('inventory-item-price').innerText(); }
  async subtotalText(): Promise<string> { return this.subtotal.innerText(); }
  async taxText(): Promise<string> { return this.tax.innerText(); }
  async totalText(): Promise<string> { return this.total.innerText(); }
  async finish(): Promise<void> { await this.finishButton.click(); }
}
