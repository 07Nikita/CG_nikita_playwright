import { test, expect } from '../fixtures/testFixtures';
import { executablePurchaseData } from '../../utils/jsonReader';
import { expectCurrency } from '../../utils/assertions/assertionHelper';
import { calculateTotal, currencyValue } from '../../utils/priceCalculator';
import { logger, maskSecret } from '../../utils/logger/logger';
import { reportData } from '../../utils/reporting/allureHelper';

for (const data of executablePurchaseData().filter((row) => row.expectedCheckoutResult === 'Success')) {
  test(`${data.testCaseId} - purchase ${data.productName}`, async ({ loginPage, productsPage, cartPage, checkoutInformationPage, checkoutOverviewPage, checkoutCompletePage }) => {
    logger.info('Starting purchase flow', { testCaseId: data.testCaseId, username: data.username, password: maskSecret(data.password), product: data.productName });
    await reportData(data.testCaseId, data.productName);
    await test.step('Login', async () => { await loginPage.goto(); await loginPage.login(data.username, data.password); });
    await test.step('Verify products and add item', async () => {
      await productsPage.expectVisible(); await productsPage.expectProduct(data.productName);
      expectCurrency(await productsPage.productPrice(data.productName), data.expectedUnitPrice, 'Product price');
      await productsPage.addProduct(data.productName); await productsPage.expectCartCount(1);
    });
    await test.step('Verify cart', async () => {
      await productsPage.openCart(); await cartPage.expectVisible(); await cartPage.expectProduct(data.productName);
      expectCurrency(await cartPage.productPrice(data.productName), data.expectedUnitPrice, 'Cart price'); await cartPage.checkout();
    });
    await test.step('Enter checkout details', async () => { await checkoutInformationPage.expectVisible(); await checkoutInformationPage.complete(data.firstName, data.lastName, data.postalCode); });
    await test.step('Verify overview and finish order', async () => {
      await checkoutOverviewPage.expectVisible(); await checkoutOverviewPage.expectProduct(data.productName);
      expectCurrency(await checkoutOverviewPage.productPrice(data.productName), data.expectedUnitPrice, 'Overview price');
      const subtotal = currencyValue(await checkoutOverviewPage.subtotalText()); const tax = currencyValue(await checkoutOverviewPage.taxText()); const total = currencyValue(await checkoutOverviewPage.totalText());
      expectCurrency(subtotal, data.expectedSubtotal, 'Subtotal'); expectCurrency(tax, data.expectedTax, 'Tax'); expectCurrency(total, data.expectedTotal, 'Total');
      expectCurrency(calculateTotal(subtotal, tax), data.expectedTotal, 'Calculated total'); await checkoutOverviewPage.finish();
    });
    await test.step('Confirm order and logout', async () => {
      await checkoutCompletePage.expectVisible(); await checkoutCompletePage.backToProducts(); await productsPage.expectVisible(); await productsPage.logout(); await loginPage.expectVisible();
    });
    logger.info('Purchase flow completed', { testCaseId: data.testCaseId });
  });
}
