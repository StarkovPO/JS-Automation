import { expect, test} from '@playwright/test';
import { Homepage } from './pageobject/page.home';
import { LoginPage } from './pageobject/page.login';
import { Catalog } from './pageobject/page.catalog';
import { Favorites } from './pageobject/page.favorites';

//The tests shoul be launched one by one
test.describe('Testing Favorites functionality: hearts and specific section', async () => {

test('Check Favourites heart-icon in Catalog', async ({page}) => {
//test('Check Favourites icons', async ({browser}) => {     #authorization via auth.json file
  // const context = await browser.newContext({             #should be updated from time to time
  //   storageState: "./playwright-auth.json"
  // })
  // //const page = await context.newPage();

  const homepage = new Homepage(page);
  const loginpage = new LoginPage(page);
  const catalog = new Catalog(page);
 
  await homepage.goto();
  await page.waitForTimeout(2000);
  await homepage.passCookies();
  await homepage.provideDeliveryAddress('Hans-Sachs-Straße 4/b-c, Berlin, 12205');
  await page.waitForTimeout(3000);

  await homepage.gotoLogin2();
  await page.waitForTimeout(2000);

  //await loginpage.passCookies();
  //await page.waitForTimeout(1000);
  await loginpage.passAuth();
  await page.waitForTimeout(2000);

  await homepage.gotoMarket();
  await page.waitForTimeout(2000);

  await catalog.clickHeart();
  await expect(catalog.heartWrapper).toHaveClass(/favorite/);
});

test('Check Favourites heart-icon in specific section', async ({page}) => {
  //test('Check Favourites icons', async ({browser}) => {     #authorization via auth.json file
    // const context = await browser.newContext({             #should be updated from time to time
    //   storageState: "./auth.json"
    // })
    // //const page = await context.newPage();
  
    const homepage = new Homepage(page);
    const loginpage = new LoginPage(page);
    const favorites = new Favorites(page);
     
    await homepage.goto();
    await homepage.passCookies();
    await homepage.provideDeliveryAddress('Hans-Sachs-Straße 4/b-c, Berlin, 12205');
    await page.waitForTimeout(3000);
  
    await homepage.gotoLogin2();
    await page.waitForTimeout(2000);
  
    //await loginpage.passCookies();
    //await page.waitForTimeout(1000);
    await loginpage.passAuth();
    await page.waitForTimeout(2000);
  
    await homepage.gotoFavorites();
    await page.waitForTimeout(2000);
  
    await favorites.clickHeart();
    await page.waitForTimeout(2000);

    await expect(favorites.allFavorites).toBeEmpty();
  });

});