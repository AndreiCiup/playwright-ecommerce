import { test, expect } from '../fixtures/auth.fixture.js';
import { SORT } from '../utils/testData.js';

test.describe('Product inventory', () => {
  test('displays 6 products after login', async ({ inventoryPage }) => {
    const count = await inventoryPage.productItems.count();
    expect(count).toBe(6);
  });

  test('sort by price low to high', async ({ inventoryPage }) => {
    await inventoryPage.sortBy(SORT.priceLH);
    const prices = await inventoryPage.getAllPrices();
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  test('sort by price high to low', async ({ inventoryPage }) => {
    await inventoryPage.sortBy(SORT.priceHL);
    const prices = await inventoryPage.getAllPrices();
    expect(prices).toEqual([...prices].sort((a, b) => b - a));
  });

  test('sort by name A to Z', async ({ inventoryPage }) => {
    await inventoryPage.sortBy(SORT.nameAZ);
    const names = await inventoryPage.getAllNames();
    expect(names).toEqual([...names].sort());
  });

  test('sort by name Z to A', async ({ inventoryPage }) => {
    await inventoryPage.sortBy(SORT.nameZA);
    const names = await inventoryPage.getAllNames();
    expect(names).toEqual([...names].sort().reverse());
  });

  test('product detail page loads correctly', async ({ loggedInPage }) => {
    await loggedInPage.locator('.inventory_item_name').first().click();
    await expect(loggedInPage.locator('.inventory_details_name')).toBeVisible();
    await expect(loggedInPage.locator('.inventory_details_name')).not.toBeEmpty();
    await expect(loggedInPage.locator('.inventory_details_price')).toBeVisible();
  });
});
