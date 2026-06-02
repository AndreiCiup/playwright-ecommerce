import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';

test('complete purchase journey — standard user @smoke @e2e', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.loginAs('standard_user', 'secret_sauce');
  await expect(page).toHaveURL(/inventory/);
  await expect(page.locator('.inventory_list')).toBeVisible();

  const inventory = new InventoryPage(page);
  await inventory.sortBy('lohi');
  await inventory.addItemByName('Sauce Labs Bike Light');
  expect(await inventory.getCartCount()).toBe(1);

  const cart = new CartPage(page);
  await cart.goto();
  const items = await cart.getItemNames();
  expect(items).toContain('Sauce Labs Bike Light');

  await cart.proceedToCheckout();
  const checkout = new CheckoutPage(page);
  await checkout.fillInfo('Jane', 'Tester', '60601');
  await checkout.continue();
  await expect(page).toHaveURL(/checkout-step-two/);
  await checkout.finish();

  const confirmation = await checkout.getConfirmationText();
  expect(confirmation).toBe('Thank you for your order!');
});
