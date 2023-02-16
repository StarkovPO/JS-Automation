import { expect, test } from '@playwright/test';
import { Homepage } from './pageobject/page.home';
import { LoginPage } from './pageobject/page.login';
import { Checkout } from './pageobject/page.checkout';

test('Create Click&Collect order', async ({ page }) => {
  
  const homepage = new Homepage(page);
  const loginpage = new LoginPage(page);
  const checkout = new Checkout(page);
  
  await homepage.goto();
  await homepage.passCookies();
  await homepage.provideDeliveryAddress();
  await page.waitForTimeout(3000);

  await homepage.gotoLogin2();
  await page.waitForTimeout(2000);

  await loginpage.passCookies();
  await page.waitForTimeout(1000);
  await loginpage.passAuth();
  await page.waitForTimeout(2000);

  await homepage.repeatLastOrder();
  await page.locator('button:has-text("zur kasse")').click();

  if ((await page.$('#form-check-input')) !== null) {await page.locator('id=delivery_mode_pickup').check()};
  await page.waitForTimeout(1000);
  await checkout.ccOrder();
  await page.waitForTimeout(1000);
  await expect(page).toHaveTitle('Danke für Ihre Bestellung! - Alnatura Lieferdienst');

});


