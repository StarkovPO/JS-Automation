import { expect, test} from '@playwright/test';
import { Homepage } from './pageobject/page.home';
import { LoginPage } from './pageobject/page.login';
import { Catalog } from './pageobject/page.catalog';
import { Favorites } from './pageobject/page.favorites';
import { Header } from './pageobject/page.header';

test.describe.only('Testing Favorites functionality: hearts and specific section', async () => {

  test.beforeEach(async ({ page }) => {

    const homepage = new Homepage(page);
    const loginpage = new LoginPage(page);
    await homepage.gotoProduction();
    await homepage.passCookies();
    await homepage.provideDeliveryAddress('Hans-Sachs-Straße 4/b-c, Berlin, 12205');
    await homepage.clickOnAnmeldenButton();
    await loginpage.passAuth();
  });

  test.afterEach(async ({ page }) => {

    const homepage = new Homepage(page);
    const loginpage = new LoginPage(page);
    const header = new Header(page);
    const favorites = new Favorites(page);
    await page.waitForLoadState('networkidle');
    await Promise.all([
      page.waitForRequest('**/toggle.json'),
      favorites.favoriteButton.click()
    ])
  });

  test('Check Favourites heart-icon in Catalog', async ({ page }) => {
  
    const homepage = new Homepage(page);
    const catalog = new Catalog(page);
    const favorites = new Favorites(page);
    const header = new Header(page);
    await page.waitForLoadState('networkidle');
    await homepage.goMarketButton.click();
    await catalog.firstHeart.click();
    await header.profileDropButton.click();
    await header.profileFavoriteLink.click();
    await page.waitForLoadState('networkidle');
    const zumProduktButton = await favorites.zumProduktButton.isVisible();
    expect(zumProduktButton).toBeTruthy();
  })
});