import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { USERS, MESSAGES } from '../utils/testData.js';

test.describe('Authentication', () => {
  let loginPage;
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('standard user can log in successfully', async ({ page }) => {
    await loginPage.loginAs(USERS.standard.username, USERS.standard.password);
    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator('.inventory_list')).toBeVisible();
  });

  test('locked out user sees correct error', async () => {
    await loginPage.attemptLogin(USERS.locked.username, USERS.locked.password);
    const error = await loginPage.getErrorMessage();
    expect(error).toContain(MESSAGES.lockedError);
  });

  test('wrong credentials show error message', async () => {
    await loginPage.attemptLogin('wrong_user', 'wrong_pass');
    const error = await loginPage.getErrorMessage();
    expect(error).toContain(MESSAGES.loginError);
  });

  test('empty username shows validation error', async () => {
    await loginPage.attemptLogin('', USERS.standard.password);
    await expect(loginPage.errorMessage).toBeVisible();
  });

  test('empty password shows validation error', async () => {
    await loginPage.attemptLogin(USERS.standard.username, '');
    await expect(loginPage.errorMessage).toBeVisible();
  });

  test('user can log out and is redirected to login', async ({ page }) => {
    await loginPage.loginAs(USERS.standard.username, USERS.standard.password);
    const inventory = new InventoryPage(page);
    await inventory.logout();
    await expect(page).toHaveURL('/');
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('logged-out user cannot access inventory directly', async ({ page }) => {
    await page.goto('/inventory.html');
    await expect(page).toHaveURL('/');
  });
});
