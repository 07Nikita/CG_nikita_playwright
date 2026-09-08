import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
  readonly title = this.page.getByTestId('title');
  private readonly inventoryItems = this.page.getByTestId('inventory-item');
  private readonly cartLink = this.page.getByTestId('shopping-cart-link');
  private readonly cartBadge = this.page.getByTestId('shopping-cart-badge');
  private readonly menuButton = this.page.getByRole('button', { name: 'Open Menu' });
  private readonly logoutLink = this.page.getByTestId('logout-sidebar-link');

  async expectVisible(): Promise<void> {
    await expect(this.title).toHaveText('Products');
    await expect(this.inventoryItems.first()).toBeVisible();
  }

  private product(name: string) { return this.inventoryItems.filter({ hasText: name }); }
  async expectProduct(name: string): Promise<void> { await expect(this.product(name)).toHaveCount(1); }
  async addProduct(name: string): Promise<void> {
    const product = this.product(name);
    await expect(product).toHaveCount(1);
    await product.getByRole('button', { name: /Add to cart/i }).click();
  }
  async productPrice(name: string): Promise<string> { return this.product(name).getByTestId('inventory-item-price').innerText(); }
  async openCart(): Promise<void> { await this.cartLink.click(); }
  async expectCartCount(count: number): Promise<void> { await expect(this.cartBadge).toHaveText(String(count)); }
  async logout(): Promise<void> { await this.menuButton.click(); await this.logoutLink.click(); }
}
