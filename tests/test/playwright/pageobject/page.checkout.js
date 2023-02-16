const { expect } = require('@playwright/test');

exports.Checkout = class Checkout {

  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor(page) {
    this.page = page;
    this.deliveryRadioButton = page.locator('id=delivery_mode_deliver');
    this.ccRadioButton = page.locator('id=delivery_mode_pickup');
    this.ccFirstSlot = page.locator(':nth-match(:text("10:00-20:00"), 1)');
    this.ccOtherSlot = page.locator(':nth-match(:text("10:00-20:00"), 3)');
    this.deliveryMorningFirstSlot = page.locator(':nth-match(:text("10:00-13:00"), 1)');
    this.deliveryEveningFirstSlot = page.locator(':nth-match(:text("16:00-19:00"), 1)');
    this.deliveryWeiterButton = page.locator('button:has-text("Weiter")');
    this.paybackWeiterButton = page.locator('//*[@id="viewport"]/div/main/div/div/div/div[5]/div/div/div[2]/div/button');
    this.creditcardPayment = page.locator('div.mb-3:has-text("Kreditkarte")');
    this.paypalPayment = page.locator('div.mb-3:has-text("Paypal")');
    this.klarnaPayment = page.locator('div.mb-3:has-text("Klarna-Lastschrift")');
    this.rechnungPayment = page.locator('div.mb-3:has-text("Rechnung")');
    this.completeOrderButton = page.locator('button:has-text("Jetzt Bestellen")');
  }

  async ccOrder() {
    await this.ccRadioButton.click();
    await this.ccOtherSlot.click();
    await this.deliveryWeiterButton.click();
    await this.paybackWeiterButton.click();
    await this.rechnungPayment.click();
    await this.completeOrderButton.click();
  }
}
