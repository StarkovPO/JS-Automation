const { expect } = require('@playwright/test');

exports.Header = class Header {

  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor(page) {
    this.page = page

    this.vorratskammerLink = page.locator('text=Vorratskammer')
    this.suessesLink = page.locator('text=Süßes & Salziges')
    this.getraenkeLink = page.locator('text=Getränke')
    this.milchLink = page.locator('text=Milch, Käse & Milchprodukte')
    this.obstLink = page.locator('text=Obst, Gemüse & Eier')
    this.baeckereiLink = page.locator('text=Bäckerei')
    this.fleischLink = page.locator('text=Fleisch, Wurst & Fisch')
    this.schnelleKuecheLink = page.locator('text=Schnelle Küche')
    this.babyLink = page.locator('text=Baby & Kind')
    this.tiefkuehlLink = page.locator('text=Tiefkühl')
    this.drogerieLink = page.locator('text=Drogerie & Pflege')

    this.headerLogo = page.locator('img[alt="Alnatura Shop"]')
    this.beliebteProdukteLink = page.getByText('Drogerie & Pflege')
    this.neuImSortimentLink = page.getByText('Neu im Sortiment')
    this.SparpreiseLink = page.getByText('Sparpreise')

    this.ihrMarkt = page.getByText('Ihr Markt')
    this.searchField = page.getByPlaceholder('Suchen...')
    this.searchFieldExpanded = page.getByPlaceholder('...')
    this.searchButton = page.locator('.input-group-append')
    this.cancelSearchButton = page.locator('.close-btn')
    this.cartTotalValue = page.locator('.cart-button > div > p')
    this.cartCounter = page.locator('.round-counter-content')
    this.profileDropButton = page.getByTestId('button')
    this.searchPanelMoreProductsButton = page.locator('.more-products-btn') 
    this.searchPanelAllProductsLink = page.getByRole('link', { name: 'Markt' })
    this.AddToCartButtonCount = page.locator('.cart-btn.add-to-cart-btn')
    this.AddToCartButton = page.locator('.add-to-cart-btn >> nth=0')
  }
}

