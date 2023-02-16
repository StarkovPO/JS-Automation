import { chromium, test, expect } from '@playwright/test';
import { Homepage } from './pageobject/page.home.js';

test('Login to PROD with pre-saved cookies', async ({}) => {

  const browser = await chromium.launch();
  const context = await browser.newContext({
    storageState: "./playwright-auth.json"
  })
  const page = await context.newPage();

  const homepage = new Homepage(page);
  await homepage.gotoProduction();
  await expect(page).toHaveURL("https://shop.alnatura.de")
})
   