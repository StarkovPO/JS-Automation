const { test, expect } = require('@playwright/test');

exports.Catalog = class Catalog {

  /**
   * @param {import('@playwright/test').Page} page
   */

   constructor(page) {
    this.page = page;

    this.checkboxAlnatura = page.locator('id=k_supplier_id_v_1831')
    this.productQuantityAlnatura = page.locator("li.checkbox-filter-value.checkbox awesome-checkbox.id_1889")

    this.checkboxRapunzel = page.locator('id=k_supplier_id_v_1889')
    this.productQuantityRapunzel = page.locator("li.checkbox-filter-value.checkbox.awesome-checkbox.id_1889 >> span.result-count")

    this.firstHeart = page.locator('svg.fa.fa-heart.favorites-toggle.text-color-primary>>nth=0');
    this.heartWrapper = page.locator('//*[@id="viewport"]/div/main/div/div[1]/div/div[2]/div[4]/div/div/div[1]/div[1]/div[2]');

    this.neuFilterButton = page.getByAltText('sort-by-newest');
    this.stickerNeuWrapper = page.locator('//*[@id="viewport"]/div/main/div/div[1]/div/div[2]/div[4]/div/div/div/div[1]/div[1]/div/div');

    this.lowHighSortArrow = page.locator('img.icon-price-asc'); 
    this.highLowSortArrow = page.locator('img.icon-price-desc');

    this.firstZumProduktButton = page.locator('a > button >> nth=0');
  }

  async clickHeart() {
    await this.firstHeart.click();
  }

  async clickNeuFilter() {
    await this.neuFilterButton.click();
  }

  async lowToHigh() {
    await this.lowHighSortArrow.click();
  }

  async highToLow() {
    await this.highLowSortArrow.click();
  }

}