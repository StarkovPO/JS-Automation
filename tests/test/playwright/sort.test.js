import { expect, test } from '@playwright/test';
import { Homepage } from './pageobject/page.home';
import { Catalog } from './pageobject/page.catalog'

test.describe('Sort/filter tests', async () => {

test('Neu sort', async ({ page }) => {
  const homepage = new Homepage(page);
  const catalog = new Catalog(page);

  await homepage.goto();
  await page.waitForTimeout(2000);
  await homepage.passCookies();
  await homepage.provideDeliveryAddress('Hans-Sachs-Straße 4/b-c, Berlin, 12205');
  await homepage.gotoMarket();

  await catalog.clickNeuFilter();
  await page.waitForTimeout(2000);
  await expect(catalog.stickerNeuWrapper).toHaveClass(/new/);

});

test('Low to high sort', async ({ page }) => {
  const homepage = new Homepage(page);
  const catalog = new Catalog(page);

  await homepage.goto();
  await page.waitForTimeout(2000);
  await homepage.passCookies();
  await homepage.provideDeliveryAddress('Hans-Sachs-Straße 4/b-c, Berlin, 12205');
  await homepage.gotoMarket();

  await catalog.lowToHigh();
  await page.waitForTimeout(1000);
  await expect(page).toHaveURL(/.*price_asc/);
});

test('High to low sort', async ({ page }) => {
  const homepage = new Homepage(page);
  const catalog = new Catalog(page);

  await homepage.goto();
  await page.waitForTimeout(2000);
  await homepage.passCookies();
  await homepage.provideDeliveryAddress('Hans-Sachs-Straße 4/b-c, Berlin, 12205');
  await homepage.gotoMarket();

  await catalog.highToLow();
  await page.waitForTimeout(1000);
  await expect(page).toHaveURL(/.*price_desc/);
});

});