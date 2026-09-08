import { test as base } from '@playwright/test';
import { CartPage } from '../../pages/CartPage';
import { CheckoutCompletePage } from '../../pages/CheckoutCompletePage';
import { CheckoutInformationPage } from '../../pages/CheckoutInformationPage';
import { CheckoutOverviewPage } from '../../pages/CheckoutOverviewPage';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';

export type Pages = {
  loginPage: LoginPage;
  productsPage: ProductsPage;
  cartPage: CartPage;
  checkoutInformationPage: CheckoutInformationPage;
  checkoutOverviewPage: CheckoutOverviewPage;
  checkoutCompletePage: CheckoutCompletePage;
};

export const test = base.extend<Pages>({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  productsPage: async ({ page }, use) => use(new ProductsPage(page)),
  cartPage: async ({ page }, use) => use(new CartPage(page)),
  checkoutInformationPage: async ({ page }, use) => use(new CheckoutInformationPage(page)),
  checkoutOverviewPage: async ({ page }, use) => use(new CheckoutOverviewPage(page)),
  checkoutCompletePage: async ({ page }, use) => use(new CheckoutCompletePage(page)),
});

export { expect } from '@playwright/test';
