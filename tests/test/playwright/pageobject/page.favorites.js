const { test, expect } = require('@playwright/test');

exports.Favorites = class Favorites {

  /**
   * @param {import('@playwright/test').Page} page
   */

   constructor(page) {
    this.page = page;

    this.firstHeart = page.locator('svg.fa.fa-heart.favorites-toggle.text-color-primary>>nth=0');
    this.heartWrapper = page.locator('//*[@id="viewport"]/div/main/div/div[1]/div/div[2]/div[4]/div/div/div[1]/div[1]/div[2]');
    this.allFavorites = page.locator('//*[@id="viewport"]/div/main/div/div/div/div[2]/div/div[2]/div');

  }

  async clickHeart() {
    await this.firstHeart.click();
  }
}
