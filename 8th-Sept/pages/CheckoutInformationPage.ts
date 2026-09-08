import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutInformationPage extends BasePage {
  private readonly title = this.page.getByTestId('title');
  private readonly firstName = this.page.getByTestId('firstName');
  private readonly lastName = this.page.getByTestId('lastName');
  private readonly postalCode = this.page.getByTestId('postalCode');
  private readonly continueButton = this.page.getByTestId('continue');
  readonly error = this.page.getByTestId('error');
  async expectVisible(): Promise<void> { await expect(this.title).toHaveText('Checkout: Your Information'); }
  async complete(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.fill(this.firstName, firstName); await this.fill(this.lastName, lastName); await this.fill(this.postalCode, postalCode); await this.click(this.continueButton);
  }
}
