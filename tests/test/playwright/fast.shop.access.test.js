import { expect, test } from '@playwright/test';
import { Homepage } from './pageobject/page.home';

test.describe('Fast access to different hubs', async () => {

test('F0015 hub', async ({ page }) => {
  const homepage = new Homepage(page);
  await homepage.goto();
  await homepage.addressField.isVisible();
  await homepage.passCookies();
  await homepage.provideDeliveryAddress('Landgrafenstr. 22, 60486, Frankfurt-Bockenheim');
  await homepage.gotoMarket();
  await page.waitForTimeout(3000);
  await expect(page).toHaveTitle("Markt - Alnatura Lieferdienst"); 
});

// test('F0047 hub', async ({ page }) => {    //if 3 tests are launched, 1 normally is droped
//   const homepage = new Homepage(page);
//   await homepage.goto();
//   await homepage.addressField.isVisible();
//   await homepage.passCookies();
//   await homepage.provideDeliveryAddress('Hedderichstraße 44, Frankfurt-Sachsenhausen, 60594');
//   await homepage.gotoMarket();
//   await page.waitForTimeout(3000);
//   await expect(page).toHaveTitle("Markt - Alnatura Lieferdienst"); 
// });

test('B0080 hub', async ({ page }) => {
  const homepage = new Homepage(page);
  await homepage.goto();
  await homepage.addressField.isVisible();
  await homepage.passCookies();
  await homepage.provideDeliveryAddress('Alte Jakobstraße 77, Berlin-Mitte, 10179');
  await homepage.gotoMarket();
  await page.waitForTimeout(3000);
  await expect(page).toHaveTitle("Markt - Alnatura Lieferdienst"); 
});

});
