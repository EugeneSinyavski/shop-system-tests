import { test, expect } from '../../src/fixtures/base.js';
import { generateTestUser } from '../../src/utils/testData';
import { AllureHelper } from '../../src/utils/allureHelper.js';
import { endpoints } from '../../config/endpoints.js';

test.describe('TC-UI-01: Authorized user can place an order', () => {
  let testUser;

  test.beforeEach(async ({ authApi }) => {
    testUser = generateTestUser();
    await authApi.registerUser(testUser);

    test.info().annotations.push({
      type: 'testUser',
      description: testUser.email,
    });
  });

  test.afterEach(async () => {
    await test.step('Post-condition: simulate deletion of test user', async () => {
      // API does not support DELETE; simulation only
    });
  });

  test('Happy Path: registered user can place an order', async ({
    loginPage,
    homePage,
    cartPage,
    orderPage,
    page,
  }) => {
    let productName;
    let productPrice;

    await AllureHelper.apply({
      qaseId: 'SS-1',
      owner: 'Eugene Senko',
      severity: 'critical',

      epic: 'UI Tests',
      feature: 'Orders',
      story: 'Critical Path (E2E)',

      tags: ['UI', 'E2E', 'Happy-path', 'orders'],
      layer: 'E2E',

      description:
        'Verify that a newly registered and logged-in user can successfully place an order via the UI and see it in order history.',
    });

    await test.step('1: Open login page', async () => {
      await loginPage.open();
      await expect(loginPage.pageHeading).toBeVisible();
      await expect(page).toHaveURL(endpoints.ui.login);
    });

    await test.step('2: Login with valid credentials', async () => {
      await loginPage.fillCredentials(testUser.email, testUser.password);
      await loginPage.submit();

      await expect(page).toHaveURL(endpoints.ui.home);
      await homePage.notification.expectLoginSuccess();
    });

    await test.step('3: Add first available product to the cart', async () => {
      productName = await homePage.getProductName();
      productPrice = await homePage.getProductPrice();

      await homePage.addProductToCart();
      await homePage.notification.expectAddedToCart();
    });

    await test.step('4: Open the cart', async () => {
      await homePage.header.openCart();
      await expect(page).toHaveURL(endpoints.ui.cart);
      await cartPage.verifyItemInCart(productName, productPrice);
    });

    await test.step('5: Place the order', async () => {
      await cartPage.checkout();
      await cartPage.notification.expectOrderCreated();
      await expect(page).toHaveURL(endpoints.ui.home);
    });

    await test.step('6: Open Order History', async () => {
      await homePage.header.openOrders();
      await expect(page).toHaveURL(endpoints.ui.orders);
    });

    await test.step('7: Verify latest order details', async () => {
      const lastOrderData = await orderPage.getLastOrderData();

      expect(lastOrderData.totalPrice).toBe(productPrice);
      expect(lastOrderData.products).toContain(productName);
    });
  });
});
