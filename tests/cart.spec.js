import { test, expect } from '../fixtures/auth.fixture.js';
import { CartPage } from '../pages/CartPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';

test.describe('Shopping cart', () => {
  test('add one item updates badge to 1', async ({ inventoryPage }) => {
    await inventoryPage.addItemByName('Sauce Labs Backpack');
    expect(await inventoryPage.getCartCount()).toBe(1);
  });

  test('add two items updates badge to 2', async ({ inventoryPage }) => {
    await inventoryPage.addItemByName('Sauce Labs Backpack');
    await inventoryPage.addItemByName('Sauce Labs Bike Light');
    expect(await inventoryPage.getCartCount()).toBe(2);
  });

  test('cart contains added items', async ({ loggedInPage }) => {
    const inventory = new InventoryPage(loggedInPage);
    await inventory.addItemByName('Sauce Labs Backpack');
    await inventory.addItemByName('Sauce Labs Fleece Jacket');
    const cart = new CartPage(loggedInPage);
    await cart.goto();
    const names = await cart.getItemNames();
    expect(names).toContain('Sauce Labs Backpack');
    expect(names).toContain('Sauce Labs Fleece Jacket');
  });

  test('removing item decrements badge', async ({ inventoryPage }) => {
    await inventoryPage.addItemByName('Sauce Labs Backpack');
    await inventoryPage.addItemByName('Sauce Labs Bike Light');
    await inventoryPage.removeItemByName('Sauce Labs Backpack');
    expect(await inventoryPage.getCartCount()).toBe(1);
  });

  test('remove item from cart page removes it from list', async ({ loggedInPage }) => {
    const inventory = new InventoryPage(loggedInPage);
    await inventory.addItemByName('Sauce Labs Backpack');
    const cart = new CartPage(loggedInPage);
    await cart.goto();
    await cart.removeItem('Sauce Labs Backpack');
    expect(await cart.getItemCount()).toBe(0);
  });

  test('empty cart has no badge visible', async ({ loggedInPage }) => {
    await expect(loggedInPage.locator('.shopping_cart_badge')).not.toBeVisible();
  });
});
