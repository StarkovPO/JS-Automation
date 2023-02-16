import { expect, test } from '@playwright/test';
import { Homepage } from './pageobject/page.home.js';
import { LoginPage } from './pageobject/page.login.js';

test('User should logout upon clicking Abmelden button', async ({page}) => {
  
  const homepage = new Homepage(page);
  const loginpage = new LoginPage(page);

  await homepage.gotoProduction();
  await page.waitForTimeout(1000);
  await homepage.passCookies();
  await homepage.gotoLogin();
  await page.waitForTimeout(1000);

  await homepage.passCookies();
  await page.waitForTimeout(1000);
  await loginpage.passAuth();

  await homepage.loggedInIcon.click();
  await homepage.logOutButton.click();
  await expect(page.locator('a:has-text("hier klicken")')).toBeVisible();

})

