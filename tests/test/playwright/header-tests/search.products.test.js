import { expect, test } from '@playwright/test';
import { Catalog } from '../pageobject/page.catalog';
import { Header } from '../pageobject/page.header';
import { Homepage } from '../pageobject/page.home.js';  
 
test.describe('Positive search test of available products and main search panel buttons functionality', () => {
    test.beforeEach(async ({ page }) => {
    
    const homepage = new Homepage(page);
    await homepage.goto();
    await homepage.passCookies();
    await homepage.provideDeliveryAddress('Hans-Sachs-Straße 4/b-c, Berlin, 12205');
    })

    const productsSet = ['milch', 'brot', 'eier', 'kaffe', 'vegan']
    for (const productName of productsSet) {
        test(`Check that parametrized search of staple product – ${productName} – returns results`, async ({ page }) => {
        const header = new Header(page);
        const catalog = new Catalog(page);
        await header.searchField.click();
        await header.searchFieldExpanded.fill(productName);
        await header.searchButton.click();
        await page.waitForLoadState('networkidle');
        const bool = await catalog.firstZumProduktButton.isVisible();
        expect(bool).toBeTruthy();
        }) 
    }

    test('Check that entering and cancelling the search query is possible', async ({ page }) => {
        const header = new Header(page);
        await header.searchField.click();
        await header.searchFieldExpanded.fill('alnatura');
        await header.cancelSearchButton.click();
        const bool = await header.searchField.isVisible();
        expect(bool).toBeTruthy();
    })

    test('Check that performing an empty search query shows products', async ({ page }) => {
        const header = new Header(page);
        const catalog = new Catalog(page);
        await header.searchField.click();
        await header.searchButton.click();
        await page.waitForLoadState('networkidle');
        const bool = await catalog.firstZumProduktButton.isVisible();
        expect(bool).toBeTruthy();
    })

    test('Check that suggestions are present', async ({ page }) => {
        const header = new Header(page);
        await header.searchField.click();
        await header.searchFieldExpanded.fill('milch');
        const morebutton = await header.searchPanelMoreProductsButton.isVisible();
        expect(morebutton).toBeTruthy();
        const linktomarket = await header.searchPanelAllProductsLink.isVisible();
        expect(linktomarket).toBeTruthy();
    })

    test('Check that Mehr Produkte button on a search panel with suggestions clicks', async ({ page }) => {
        const header = new Header(page);
        const catalog = new Catalog(page);
        await header.searchField.click();
        await header.searchFieldExpanded.fill('milch');
        await header.searchPanelMoreProductsButton.click();
        await page.waitForLoadState('networkidle');
        const bool = await catalog.firstZumProduktButton.isVisible();
        expect(bool).toBeTruthy(); 
    })

    test('Check that Alle Produkte link on a search panel with suggestions clicks', async ({ page }) => {
        const header = new Header(page);
        const catalog = new Catalog(page);
        await header.searchField.click();
        await header.searchFieldExpanded.fill('milch');
        await header.searchPanelAllProductsLink.click();
        await page.waitForLoadState('networkidle');
        const bool = await catalog.firstZumProduktButton.isVisible();
        expect(bool).toBeTruthy(); 
    })
});




