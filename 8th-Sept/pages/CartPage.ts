import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  private readonly title = this.page.getByTestId('title');
  private readonly items = this.page.getByTestId('inventory-item');
  private readonly checkoutButton = this.page.getByTestId('checkout');
  async expectVisible(): Promise<void> { await expect(this.title).toHaveText('Your Cart'); }
  async expectProduct(name: string): Promise<void> { await expect(this.items.filter({ hasText: name })).toHaveCount(1); }
  async productPrice(name: string): Promise<string> { return this.items.filter({ hasText: name }).getByTestId('inventory-item-price').innerText(); }
  async checkout(): Promise<void> { await this.checkoutButton.click(); }
}
