const { test, expect } = require('@playwright/test');

test('auth, cookies, login, order', async ({ page }) => {

  const urlPlusCredentials = 'https://a2021:alnatura@p1staging2.farmy.ch/';
  
  await page.goto(urlPlusCredentials);

  page.on('dialog', dialog => dialog.accept());

  await expect(page).toHaveTitle(/Lieferdienst/);

  await page.waitForTimeout(2000);
  await page.locator('a:has-text("Alle Cookies erlauben")').click();
  await page.locator('.link-styled:has-text("Anmelden")').click();

  await page.waitForTimeout(2000);
  await page.locator('a:has-text("Alle Cookies erlauben")').click();

  await page.locator('input[id="signInName"]').fill('caxid61645@otodir.com');
  await page.locator('input[id="password"]').fill('qqqqQQ11');
  await page.locator('button[id="next"]').click();

  await page.locator('.hub-text:has-text("Ihr Markt:")').click();
  const address = 'Hans-Sachs-Straße 4/b-c, Berlin, 12205';
  await page.locator('input[id="address-input"]').fill(address);
  await page.locator('div[tabindex="0"]').click();
  await page.locator('button:has-text("Einkauf Starten")').click();

  await page.locator('button:has-text("Letzten Kauf wiederholen")').click();
  await page.locator('button:has-text("zur kasse")').click();

  if ((await page.$('#form-check-input')) !== null) {await page.locator('id=delivery_mode_pickup').check()};
  await page.waitForTimeout(2000);
  await page.locator('.form-check-label:has-text("Abholung im Markt")').click();
  await page.waitForTimeout(3000);

  await page.locator(':nth-match(:text("10:00-20:00"), 1)').click();

  await page.locator('button:has-text("Weiter")').click();
  await page.waitForTimeout(1000);

  await page.locator('button:has-text("Weiter")').click();

  await page.locator('id=10').check();

  await page.locator('button:has-text("Jetzt Bestellen")').click();
  await expect(page).toHaveTitle(/Danke für Ihre Bestellung! - Alnatura Lieferdienst/);

});
