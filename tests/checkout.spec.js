import { test, expect } from '../fixtures/auth.fixture.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';

test.describe('Checkout flow', () => {
  test.beforeEach(async ({ loggedInPage }) => {
    const inventory = new InventoryPage(loggedInPage);
    await inventory.addItemByName('Sauce Labs Backpack');
    const cart = new CartPage(loggedInPage);
    await cart.goto();
    await cart.proceedToCheckout();
  });

  test('checkout requires all fields', async ({ loggedInPage }) => {
    const checkout = new CheckoutPage(loggedInPage);
    await checkout.continue();
    await expect(loggedInPage.locator('[data-test="error"]')).toBeVisible();
  });

  test('valid details advance to step two', async ({ loggedInPage }) => {
    const checkout = new CheckoutPage(loggedInPage);
    await checkout.fillInfo('John', 'Doe', '12345');
    await checkout.continue();
    await expect(loggedInPage).toHaveURL(/checkout-step-two/);
  });

  test('order summary shows correct item', async ({ loggedInPage }) => {
    const checkout = new CheckoutPage(loggedInPage);
    await checkout.fillInfo('John', 'Doe', '12345');
    await checkout.continue();
    await expect(loggedInPage.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');
  });

  test('completing order shows confirmation', async ({ loggedInPage }) => {
    const checkout = new CheckoutPage(loggedInPage);
    await checkout.fillInfo('John', 'Doe', '12345');
    await checkout.continue();
    await checkout.finish();
    expect(await checkout.getConfirmationText()).toBe('Thank you for your order!');
  });
});
