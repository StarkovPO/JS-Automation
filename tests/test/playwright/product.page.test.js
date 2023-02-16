import { expect, test } from '@playwright/test';
import { Homepage } from './pageobject/page.home.js';

test.describe('Product card buttons should lead to a product page', () => {

    test.beforeEach(async ({page}) => {
        const homepage = new Homepage(page);
        await homepage.goto();
        await homepage.passCookies();
        await homepage.provideDeliveryAddress();
      });

    test('Check Info Ansehen button', async ({page}) => {

        page.locator('div:has-text("Info ansehen")').click;
        await page.locator('span:has-text("zum Warenkorb hinzufügen")').toBeVisible;
      });
  
    test('Check product name link', async ({page}) => {
        page.locator('a.product-url').click;
        await page.locator('span:has-text("zum Warenkorb hinzufügen")').toBeVisible;
      });
    
    test('Check Zum Produkt button', async ({page}) => {
        page.locator('button:has-text("zum Produkt")').click;
        await page.locator('span:has-text("zum Warenkorb hinzufügen")').toBeVisible;
      });
  
  });
