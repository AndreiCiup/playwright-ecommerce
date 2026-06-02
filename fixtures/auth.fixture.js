import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';

export const test = base.extend({
  loggedInPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.loginAs('standard_user', 'secret_sauce');
    await use(page);
  },
  inventoryPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.loginAs('standard_user', 'secret_sauce');
    const inventory = new InventoryPage(page);
    await use(inventory);
  },
});

export { expect } from '@playwright/test';
