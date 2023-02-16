const { expect } = require('@playwright/test');
const address = 'Hans-Sachs-Straße 4/b-c, Berlin, 12205';

exports.Homepage = class Homepage {

  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor(page) {
    this.page = page;
    this.okCookieLink = page.locator('a', { hasText: 'Alle Cookies erlauben' });
    this.anmeldenOnPopup = page.locator('.link-styled:has-text("Anmelden")');
    this.anmeldenInCorner = page.locator(':nth-match(:text("Anmelden"), 1)');
    this.ihrMarktLink = page.locator('.hub-text:has-text("Ihr Markt:")');
    this.addressField = page.locator('input[id="address-input"]');
    this.addressInDropdown = page.locator('div.address-options > div > div');
    this.addressInCell = page.locator('div[tabindex="0"]');
    this.goShoppingButton = page.locator('button:has-text("Einkauf Starten")');
    this.goMarketButton = page.locator('button:has-text("Jetzt einlösen")');
    this.repeatLastOrderButton = page.locator('button:has-text("Letzten Kauf wiederholen")');
    this.myOrdersButton = page.locator('button:has-text("Bestellungen")');
    this.goFavoritesButton = page.locator('//*[@id="home-wrapper"]/div[2]/div/div/div/div[3]/a'); 
    this.moreButtonSparpreise = page.locator('//*[@id="product-list-wrapper"]/div/div[2]/a/button>>nth=0');
    this.moreButtonNewAssortment = page.locator('//*[@id="product-list-wrapper"]/div/div[2]/a/button>>nth=1');
    this.loggedInIcon = page.locator('button.header-dropdown-toggle.dropdown-toggle.btn.btn-primary');
    this.logOutButton = page.locator('a:has-text("Abmelden")');
  }

  async goto() {
    await this.page.goto('https://a2021:alnatura@p1staging2.farmy.ch/');
  }

  async gotoProduction() {
    await this.page.goto('https://shop.alnatura.de/');
  }

  async passCookies() {
    await this.okCookieLink.click();
  }

  async gotoLogin() {
    await this.anmeldenOnPopup.click();
  }

  async gotoLogin2() {
    await this.anmeldenInCorner.first().click();
  }

  async chooseHub () {
    await this.addressField.fill('Hans-Sachs-Straße 4/b-c, Berlin, 12205');
    await this.addressInDropdown.click();
    await this.addressInCell.click();
    await this.goShoppingButton.click();  
  }

  async provideDeliveryAddress(address) {
    await this.addressField.fill(address);
    await this.addressInDropdown.click();
    await this.addressInCell.click();
    await this.goShoppingButton.click();
  }

  async gotoMarket() {
    await this.goMarketButton.click();
  }

  async repeatLastOrder() {
    await this.repeatLastOrderButton.click();
  }

  async gotoFavorites() {
    await this.goFavoritesButton.click();
  }

  async gotoMarketFull() {
    this.goto();
    this.passCookies();
    this.provideDeliveryAddress();
    this.gotoMarket();
  }


}



