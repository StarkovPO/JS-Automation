import { expect, test} from '@playwright/test';
import { Homepage } from './pageobject/page.home';
import { LoginPage } from './pageobject/page.login';
import { Catalog } from './pageobject/page.catalog';
import { Favorites } from './pageobject/page.favorites';
import { Header } from './pageobject/page.header';

test.describe('Testing Favorites functionality', async () => {

  test.beforeEach(async ({ page }) => {

    const homepage = new Homepage(page);
    const loginpage = new LoginPage(page);
    await homepage.goto();
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
    await favorites.favoriteButton.click();
  });

  test('Checking heart icon in the catalog and finding it in the Favoriten section ', async ({ page }) => {
  
    const homepage = new Homepage(page);
    const catalog = new Catalog(page);
    const favorites = new Favorites(page);
    const header = new Header(page);
    await page.waitForLoadState('networkidle');
    await homepage.goMarketButton.click();
    await catalog.firstHeart.click();
    await header.profileDropButton.click();
    await header.profileFavoriteLink.click();
    await page.waitForSelector('a > button')

    const zumProduktButton = favorites.zumProduktButton.isVisible();
    expect(zumProduktButton).toBeTruthy();
  })
});