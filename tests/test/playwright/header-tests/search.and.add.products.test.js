import { expect, test } from '@playwright/test';
import { createConnection } from 'net';
import { Catalog } from '../pageobject/page.catalog';
import { Header } from '../pageobject/page.header';
import { Homepage } from '../pageobject/page.home.js'; 
 

test.describe('Search and add products from a search panel', () => {
    test.beforeEach(async ({ page }) => {
    
        const homepage = new Homepage(page);
        await homepage.goto();
        await homepage.passCookies();
        await homepage.provideDeliveryAddress('Hans-Sachs-Straße 4/b-c, Berlin, 12205');
    });

    test('Check that number of added suggested products match the cart counter', async ({ page }) => {
        
        const header = new Header(page);
    
        await header.searchField.click();
        await header.searchFieldExpanded.fill('brot');
        await page.waitForLoadState('networkidle');

        const buttons = header.AddToCartButtonCount;
        const count = await buttons.count();
        const element = header.AddToCartButton;

        for (let i = 0; i < count; i++) {
            await element.click();
        }
        expect(header.cartCounter == count);
    }) 

    test.only('Check that total of added suggested products match the cart total', async ({ page }) => {
        
        const header = new Header(page);
    
        await header.searchField.click();
        await header.searchFieldExpanded.fill('brot');
        await page.waitForLoadState('networkidle');

        const buttons = header.AddToCartButtonCount;
        const count = await buttons.count();
        const element = header.AddToCartButton;

        for (let i = 0; i < count; i++) {
            await element.click();
        }
        expect(header.cartCounter == count);
    }) 
    
});