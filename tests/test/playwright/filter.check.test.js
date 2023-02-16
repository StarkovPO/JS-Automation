import { expect, test } from '@playwright/test';
import { Homepage } from './pageobject/page.home.js';
import { Header } from './pageobject/page.header.js';
import { Catalog } from './pageobject/page.catalog.js';

test('Check filters consistency', async ({page}) => {
  
  const homepage = new Homepage(page);
  const header = new Header(page);
  const catalog = new Catalog(page);

  await homepage.goto();
  await homepage.passCookies();
  await homepage.provideDeliveryAddress();

  await header.vorratskammerLink.click();
  await catalog.checkboxRapunzel.click();
  await page.waitForTimeout(3000);

  const quantityRapunzel = await catalog.productQuantityRapunzel.innerText();
  const quantityRapunzelInLeftMenu  = quantityRapunzel.slice(1, quantityRapunzel.length - 1);
  
  const productQuantityRapunzelInCatalog = await page.locator("h5.category-title.margin-top-20 >> small.total-count").innerText();
  const quantityRapunzelInCatalog = productQuantityRapunzelInCatalog.split(" ")[0];
  
  expect(quantityRapunzelInLeftMenu).toBe(quantityRapunzelInCatalog);
})




  

