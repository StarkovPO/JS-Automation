import { test, expect } from '@playwright/test';
import { Homepage } from './pageobject/page.home';

test('Should not have active orders', async ({ page }) => {
  
  const homepage = new Homepage(page);
  
  await homepage.goto();
  await page.waitForTimeout(1000);
  await homepage.passCookies();
  await homepage.chooseHub();

  await homepage.myOrdersButton.click();

  expect(page.locator('p:has-text("Aktuelle Bestellungen")').toBeVisible)
  expect(page.locator('p:has-text("Ihre Bestellungen können am Vortag des Liefertages bis 20:00 Uhr storniert werden.")').toBeVisible)

})