import { test as base } from '@playwright/test';
import { AuthAPI } from '../apiClients/AuthAPI';

import { LoginPage } from '../pages/LoginPage.js';
import { HomePage } from '../pages/HomePage.js';
import { CartPage } from '../pages/CartPage.js';
import { OrderPage } from '../pages/OrderPage.js';

export const test = base.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  orderPage: async ({ page }, use) => {
    await use(new OrderPage(page));
  },
  authApi: async ({ request }, use) => {
    const authApi = new AuthAPI(request);
    await use(authApi);
  },
});

export { expect } from '@playwright/test';
