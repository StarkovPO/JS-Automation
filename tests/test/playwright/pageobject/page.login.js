const { expect } = require('@playwright/test');


exports.LoginPage = class LoginPage {

  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor(page) {
    this.page = page;
    this.okCookieLink = page.locator('a', { hasText: 'Alle Cookies erlauben' });
    this.login = page.locator('input[id="signInName"]');
    this.password = page.locator('input[id="password"]');
    this.loginButton = page.locator('button[id="next"]');
  }

  async passCookies() {
    await this.okCookieLink.click();
  }

  async passAuth() {
    await this.login.fill(process.env.P1LOGIN);
    await this.password.fill(process.env.P1PASS);
    await this.loginButton.click();
  }
}
