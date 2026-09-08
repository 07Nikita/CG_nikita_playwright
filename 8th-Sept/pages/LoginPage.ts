import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private readonly username = this.page.getByTestId('username');
  private readonly password = this.page.getByTestId('password');
  private readonly loginButton = this.page.getByTestId('login-button');
  readonly error = this.page.getByTestId('error');

  async goto(): Promise<void> { await this.page.goto('/'); }

  async login(username: string, password: string): Promise<void> {
    await this.fill(this.username, username);
    await this.fill(this.password, password);
    await this.click(this.loginButton);
  }

  async expectVisible(): Promise<void> { await expect(this.loginButton).toBeVisible(); }
}
