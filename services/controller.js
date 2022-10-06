const { test ,expect, page } = require('@playwright/test');
import {testData} from '../fixtures/testData';
export const loginWidget = {
  async visit (page)  {
    await page.goto(testData.url);
  },
  async fillEmailLogin (page, email) {
    const loginFormLogin = await page.locator('[data-testid="log-in-form__fields-universal"]');
    await loginFormLogin.fill(email);
  },
  async fillPassLogin (page, password) {
    const loginFormPass = await page.locator('[data-testid="log-in-form__fields-password"]');
    await loginFormPass.fill(password);
  },
  async login (page) {
    const loginFormButton = await page.locator('[data-testid="login-form__button-submit"]');
    await loginFormButton.click();
  },
  async signUp(page) {
    const signUpFormButton = await page.locator('[data-testid="sign-up-form__button-submit"]');
    await signUpFormButton.click();
  },
  async fillEmailSignup (page, email){
    const signUpFormLogin = await page.locator('[data-testid="sign-up-form__fields-email"]');
    await signUpFormLogin.fill(email);
  },
  async fillPassSignup (page, password) {
    const signUpFormPass = await page.locator('[data-testid="sign-up-form__fields-password"]');
    await signUpFormPass.fill(password);
  }
}