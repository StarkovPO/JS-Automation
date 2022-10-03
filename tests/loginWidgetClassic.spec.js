const { test, expect } = require('@playwright/test');
import {testData} from '../fixtures/testData';
import {loginWidget} from '../services/controller';

test.describe('Functionalty tests on login widget', () =>{
  test.beforeEach(async ({page}) => {
    loginWidget.visit(page ,testData.url);
  });
  test('Check widget loaded well', async ({page}) => {
    const loginTabLink = await page.locator('[data-testid="login_tab-link"]');
    const signupTabLink = await page.locator('[data-testid="signUp_tab-link"]');

   await expect(loginTabLink).toBeVisible();
   await expect(loginTabLink).toHaveCSS('color', 'rgb(0, 115, 247)');

   await expect(signupTabLink).toBeVisible();
   await expect(signupTabLink).toHaveCSS('color', 'rgba(0, 0, 0, 0.5)');

   const loginFormLogin = await page.locator('[data-testid="log-in-form__fields-universal"]');
   const loginFormPass = await page.locator('[data-testid="log-in-form__fields-password"]');

   await expect(loginFormLogin).toBeVisible();
   await expect(loginFormLogin).toHaveAttribute('name', 'universal');
   
   await expect(loginFormPass).toBeVisible();
   await expect(loginFormPass).toHaveAttribute('type', 'password');

   const iconEye  = await page.locator('[data-testid="icon-eye"]')
   await expect(iconEye).toHaveCSS('color', 'rgb(0, 0, 0)');

   const loginFormButton = await page.locator('[data-testid="login-form__button-submit"]');
   await expect(loginFormButton).toBeVisible();
   await expect(loginFormButton).toHaveAttribute('type', 'submit');
    expect(await loginFormButton.innerText()).toEqual('ВХОД');
  });

  test('Try to login success', async ({page}) => {
    await loginWidget.fillEmailLogin(page, testData.email);
    await loginWidget.fillPassLogin(page, testData.pass);
    await loginWidget.login(page);

    expect(await page.locator('h1').innerText()).toEqual('Successful authorization');
    expect(await page.locator('h1')).toBeVisible();
    expect(await page.locator('body > a').innerText()).toEqual('See documentation to learn more.');
    expect(await page.locator('body > a')).toBeVisible();
    expect(await page.locator('body > a')).toHaveAttribute('href','https://developers.xsolla.com/doc/login/integration-guide/set-up-login-project/#login_guide_classic_and_passwordless_login_basic_setup')
  });

  test('Try to login unsuccess', async ({page}) => {
    await loginWidget.fillEmailLogin(page, testData.email);
    await loginWidget.fillPassLogin(page, testData.wrongPass);
    await loginWidget.login(page);

    expect(await page.locator('[data-testid="login-form__notification-error"]').innerText()).toEqual('Email-адреc/имя пользователя или пароль введены неверно.');
  });

  test('Try to fill invalid data', async ({page}) => {
    await loginWidget.fillEmailLogin(page, testData.damagedEmail);
    await loginWidget.fillPassLogin(page, testData.damagedPass);

    expect(await page.locator('text=Недопустимый email')).toBeVisible();
    expect(await page.locator('text=Минимальная длина: 5 символов')).toBeVisible();
  });

  test('Try to sign up with already taken email', async ({page}) => {
    const signupTabLink = await page.locator('[data-testid="signUp_tab-link"]');
    await signupTabLink.click();
    await loginWidget.fillEmailSignup(page, testData.email);
    await loginWidget.fillPassSignup(page, testData.pass);
    await loginWidget.signUp(page);

    expect(await page.locator('[data-testid="alert-title"]').innerText()).toEqual('Имя пользователя уже существует. Введите другое имя пользователя.');
  });
});