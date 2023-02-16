import { expect, test } from '@playwright/test';
import { Homepage } from './pageobject/page.home.js';

test.describe('Testing More buttons on the main page', () => {

  test('Click Sparpreise button', async ({page}) => {

    const homepage = new Homepage(page);

    await homepage.goto();
    await homepage.passCookies();
    await homepage.provideDeliveryAddress();
  
    await homepage.moreButtonSparpreise.click();
    await expect(page).toContainUrl('is_saving_price');
  
  });

  test('Click Neu button', async ({page}) => {

    const homepage = new Homepage(page);

    await homepage.goto();
    await homepage.passCookies();
    await homepage.provideDeliveryAddress();
  
    await homepage.moreButtonNewAssortment.click();
    await expect(page).toContainUrl('sort_mode=new');
  
  });

});
