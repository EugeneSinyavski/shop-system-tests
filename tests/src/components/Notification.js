import { expect } from '@playwright/test';
import { TOAST_MESSAGES } from '../data/messages.js';

export class Notification {
  constructor(page) {
    this.page = page;
    this.toastLocator = page.getByRole('listitem');
  }

  async expectToastWithText(expectedText) {
    const toast = this.toastLocator.filter({ hasText: expectedText }).last();
    await expect(toast).toBeVisible();
  }
  async expectToastDisappearance(expectedText, timeout = 10000) {
    const toast = this.toastLocator.filter({ hasText: expectedText }).first();
    await expect(toast).toBeVisible();
    await expect(toast).toBeHidden({ timeout: timeout });
  }

  async expectLoginSuccess() {
    await this.expectToastWithText(TOAST_MESSAGES.LOGIN_SUCCESS);
  }

  async expectAddedToCart() {
    await this.expectToastWithText(TOAST_MESSAGES.ADDED_TO_CART);
  }

  async expectOrderCreated() {
    await this.expectToastWithText(TOAST_MESSAGES.ORDER_CREATED);
  }
}
