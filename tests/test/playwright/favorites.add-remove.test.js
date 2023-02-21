import { expect, test} from '@playwright/test';
import { Homepage } from './pageobject/page.home';
import { LoginPage } from './pageobject/page.login';
import { Catalog } from './pageobject/page.catalog';
import { Favorites } from './pageobject/page.favorites';
import { Header } from './pageobject/page.header';

//The tests should be launched one by one
test.describe.only('Testing Favorites functionality: hearts and specific section', async () => {

  test.beforeEach(async ({ page }) => {

    const homepage = new Homepage(page);
    const loginpage = new LoginPage(page);
    await homepage.gotoProduction();
    await homepage.passCookies();
    await homepage.provideDeliveryAddress('Hans-Sachs-Straße 4/b-c, Berlin, 12205');
    await homepage.clickOnAnmeldenButton();
    await loginpage.passAuth();

    // const [response] = await Promise.all([
    //   page.waitForRequest('**/login_url'),
    //   page.waitForResponse('**/login_url'),
    //   loginpage.passAuth()
    // ]);
    // expect(response.ok()).toBeTruthy();
  });

test('Check Favourites heart-icon in Catalog', async ({page}) => {
  
  const homepage = new Homepage(page);
  const catalog = new Catalog(page);
  const favorites = new Favorites(page);
  const header = new Header(page);
  await page.waitForLoadState('networkidle');
  await homepage.goMarketButton.click();
  await catalog.firstHeart.click();
  await header.profileDropButton.click();
  await header.favoriteButton.click();
  // await page.waitForLoadState('networkidle');
  // const locator = favorites.zumProduktButton
  // await expect(locator).toBeVisible();
});

test.afterEach(async ({ page }) => {

    const homepage = new Homepage(page);
    const loginpage = new LoginPage(page);
    const header = new Header(page);
    const favorites = new Favorites(page);
    await homepage.gotoProduction();
    await homepage.passCookies();
    await homepage.provideDeliveryAddress('Hans-Sachs-Straße 4/b-c, Berlin, 12205');
    await homepage.clickOnAnmeldenButton();
    await loginpage.passAuth();
    await header.profileDropButton.click();
    await header.favoriteButton.click();
    await page.waitForLoadState('networkidle');
    await Promise.all([
      page.waitForRequest('**/toggle.json'),
      favorites.favoriteButton.click()
    ])

})

// test('Check Favourites heart-icon in specific section', async ({page}) => {
  
//     const homepage = new Homepage(page);
//     const loginpage = new LoginPage(page);
//     const favorites = new Favorites(page);
     
//     await homepage.goto();
//     await homepage.passCookies();
//     await homepage.provideDeliveryAddress('Hans-Sachs-Straße 4/b-c, Berlin, 12205');
//     await page.waitForTimeout(3000);
  
//     await homepage.gotoLogin2();
//     await page.waitForTimeout(2000);
  
//     //await loginpage.passCookies();
//     //await page.waitForTimeout(1000);
//     await loginpage.passAuth();
//     await page.waitForTimeout(2000);
  
//     await homepage.gotoFavorites();
//     await page.waitForTimeout(2000);
  
//     await favorites.clickHeart();
//     await page.waitForTimeout(2000);

//     await expect(favorites.allFavorites).toBeEmpty();
//   });

});