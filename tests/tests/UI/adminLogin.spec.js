import { test, expect } from '../../src/fixtures/base.js';
import { AllureHelper } from '../../src/utils/allureHelper.js';
import { endpoints } from '../../config/endpoints.js';

test.describe('TC-UI-SM-04: Admin user sees admin panel on Home page', () => {
  test('Smoke: admin sees admin panel after login', async ({ loginPage, homePage, page }) => {
    await AllureHelper.apply({
      qaseId: 'SS-7',
      owner: 'Eugene Senko',
      severity: 'critical',

      epic: 'UI Tests',
      feature: 'Admin Access',
      story: 'Header Visibility',

      tags: ['Smoke', 'UI'],
      layer: 'E2E',

      description:
        'Verifies that the "Admin Panel" button is visible in the global header for an authorized Admin user.',
    });

    await test.step('1: Open login page', async () => {
      await loginPage.open();
      await expect(loginPage.pageHeading).toBeVisible();
      await expect(page).toHaveURL(endpoints.ui.login);
    });

    await test.step('2: Login with admin credentials', async () => {
      await loginPage.fillCredentials(process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD);
      await loginPage.submit();

      await expect(page).toHaveURL(endpoints.ui.home);
    });

    await test.step('3: Verify admin panel is displayed in header', async () => {
      await expect(homePage.header.adminPanel).toBeVisible();
    });
  });
});
