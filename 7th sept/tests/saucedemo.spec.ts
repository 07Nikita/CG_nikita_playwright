import { test, expect, Page } from '@playwright/test';

const BASE_URL = 'https://www.saucedemo.com/';
const USERS = {
  standard: { username: 'standard_user', password: 'secret_sauce' },
  lockedOut: { username: 'locked_out_user', password: 'secret_sauce' },
};

async function login(page: Page, username: string, password: string) {
  await page.goto(BASE_URL);
  await page.getByPlaceholder('Username').fill(username);
  await page.getByPlaceholder('Password').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
}

async function addProduct(page: Page, productName: string) {
  const product = page.locator('.inventory_item').filter({ hasText: productName });
  await product.getByRole('button', { name: 'Add to cart' }).click();
}

test.describe('SauceDemo smoke and critical regression', () => {
  test('critical purchase journey from login through logout', async ({ page }) => {
    await login(page, USERS.standard.username, USERS.standard.password);
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.getByText('Products', { exact: true })).toBeVisible();

    await page.locator('[data-test="item-4-title-link"]').click();
    await expect(page).toHaveURL(/inventory-item\.html\?id=4/);
    await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();
    await expect(page.getByText('$29.99', { exact: true })).toBeVisible();

    await page.getByRole('button', { name: 'Add to cart' }).click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();

    await page.getByRole('button', { name: 'Checkout' }).click();
    await page.locator('[data-test="firstName"]').fill('Ada');
    await page.locator('[data-test="lastName"]').fill('Lovelace');
    await page.locator('[data-test="postalCode"]').fill('10001');
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page).toHaveURL(/checkout-step-two\.html/);
    await expect(page.getByText('Item total: $29.99')).toBeVisible();
    await expect(page.getByText('Tax: $2.40')).toBeVisible();
    await expect(page.getByText('Total: $32.39')).toBeVisible();
    await page.getByRole('button', { name: 'Finish' }).click();

    await expect(page).toHaveURL(/checkout-complete\.html/);
    await expect(page.getByText('Thank you for your order!')).toBeVisible();

    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.getByRole('link', { name: 'Logout' }).click();
    await expect(page).toHaveURL(BASE_URL);
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });

  test('standard user can log in and inventory displays six products', async ({ page }) => {
    await login(page, USERS.standard.username, USERS.standard.password);
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.locator('.inventory_item')).toHaveCount(6);
    await expect(page.locator('.inventory_item_price')).toHaveCount(6);
  });

  test('product sorting supports all documented options', async ({ page }) => {
    await login(page, USERS.standard.username, USERS.standard.password);
    const sort = page.locator('[data-test="product-sort-container"]');
    const names = page.locator('.inventory_item_name');
    const prices = page.locator('.inventory_item_price');

    await sort.selectOption('az');
    await expect(names.first()).toHaveText('Sauce Labs Backpack');
    await sort.selectOption('za');
    await expect(names.first()).toHaveText('Test.allTheThings() T-Shirt (Red)');
    await sort.selectOption('lohi');
    await expect(prices.first()).toHaveText('$7.99');
    await sort.selectOption('hilo');
    await expect(prices.first()).toHaveText('$49.99');
  });

  test('checkout rejects missing required customer information', async ({ page }) => {
    await login(page, USERS.standard.username, USERS.standard.password);
    await addProduct(page, 'Sauce Labs Bike Light');
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.getByRole('button', { name: 'Checkout' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page).toHaveURL(/checkout-step-one\.html/);
    await expect(page.getByText('Error: First Name is required')).toBeVisible();
  });

  test('locked-out user cannot log in', async ({ page }) => {
    await login(page, USERS.lockedOut.username, USERS.lockedOut.password);
    await expect(page).toHaveURL(BASE_URL);
    await expect(page.getByText(/locked out/i)).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });
});

test.describe('SauceDemo cart and navigation', () => {
  test.beforeEach(async ({ page }) => {
    await login(page, USERS.standard.username, USERS.standard.password);
  });

  test('can add and remove products from the cart', async ({ page }) => {
    await addProduct(page, 'Sauce Labs Onesie');
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    await page.getByRole('button', { name: 'Remove' }).click();
    await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Add to cart' }).first()).toBeVisible();
  });

  test('sidebar reset app state clears cart selections', async ({ page }) => {
    await addProduct(page, 'Sauce Labs Bike Light');
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.getByRole('link', { name: 'Reset App State' }).click();
    await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Add to cart' }).first()).toBeVisible();
  });
});
