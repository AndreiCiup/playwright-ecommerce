// scripts/getDom.js
import { chromium } from '@playwright/test';

const browser = await chromium.launch({ headless: false });
const page = await browser.newPage();

await page.goto('https://www.saucedemo.com');
await page.fill('[data-test="username"]', 'standard_user');
await page.fill('[data-test="password"]', 'secret_sauce');
await page.click('[data-test="login-button"]');
await page.waitForLoadState('networkidle');

// grab just the inventory section, not the whole page
const dom = await page.locator('.inventory_container').innerHTML();

// write it to a file so you can paste it into Copilot
import fs from 'fs';
fs.writeFileSync('dom-snapshot.html', dom);

await browser.close();
