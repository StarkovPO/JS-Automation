import { test, expect } from '@playwright/test';
import { Homepage } from './pageobject/page.home';

test('Navigation buttons lead to the right catalog section', async ({ page }) => {

    const homepage = new Homepage(page);

    await homepage.goto();
    await homepage.passCookies();
    await homepage.provideDeliveryAddress();
    
    const navigationButtons = page.locator("div.nav-item"); // get locators of all nav buttons 
    const count = await navigationButtons.count();

    for(let i = 0; i < count; ++i) { 

        await navigationButtons.nth(i).click(); //clicking on each nav button
        const navigationButtonsText = await navigationButtons.nth(i).textContent(); //saving text of each nav button
        await navigationButtons.nth(i).waitFor(); //waiting until the page is fully loaded
        const currentBreadcrumb =  await page.locator('.current-breadcrumb').textContent(); //saving text of each breadcrumb
        expect(navigationButtonsText === currentBreadcrumb) //comparing two texts: nav button and a breadcrumb
    };
  })

  