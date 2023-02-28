import { expect, test } from '@playwright/test';
import { Header } from '../pageobject/page.header';
import { Homepage } from '../pageobject/page.home'; 
 

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

        const buttons = header.AddToCartButtonCount;
        await page.waitForTimeout(1000)
        const count = await buttons.count();
        const element = header.AddToCartButton;
        

        for (let i = 0; i < count; i++) {
            await element.click();
        }
        await header.cancelSearchButton.click();
        const value = await header.cartCounter.innerText()
        expect(value === count);
    }) 

    test('Check that total of added suggested products match the cart total', async ({ page }) => {
        
        const header = new Header(page);
    
        await header.searchField.click();
        await header.searchFieldExpanded.fill('brot');
        await page.waitForLoadState('networkidle');

        const buttons = header.AddToCartButtonCount;
        await page.waitForTimeout(1000)
        const count = await buttons.count();
        const element = header.AddToCartButton;
        
        const responseBody = [];
        for (let i = 0; i < count; i++) {

            let [userResponse] = await Promise.all([
                page.waitForResponse('**/cart.json'),
                element.click()
            ])
            let userResponseBody = await userResponse.json();
            if (i === count - 1) {
                // push only the last response to the array
                responseBody.push(userResponseBody);
            }
            // console.log(responseBody)
        }    
        let itemTotal = 0;
        for (let i = 0; i < responseBody.length; i++) {
            itemTotal += responseBody[i].cart.item_total
            // console.log(itemTotal)
        }

        await header.cancelSearchButton.click();
        await page.waitForTimeout(2000)
        const priceText = await header.cartTotalPrice.innerText();
        const priceRegex = /\d+(,\d+)?/;
        const priceMatch = priceText.match(priceRegex);
        // convert the price string to a float
        const price = priceMatch ? parseFloat(priceMatch[0].replace(',', '.')) : NaN;
        // console.log(price);
        expect(price === itemTotal).toBe(true);
        
    }) 
    
});