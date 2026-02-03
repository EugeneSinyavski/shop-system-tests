import { BasePage } from './BasePage';
import { parsePrice } from '../utils/parsePrice';
import { expect } from '@playwright/test';

export class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
    this.cartItems = page.getByRole('button', { name: 'Удалить' }).locator('..');
    this.totalValue = page.locator('div').filter({ hasText: 'Итого:' }).locator('span').last();
    this.checkoutButton = page.getByRole('button', { name: 'Оформить заказ' });
  }

  async count() {
    return await this.cartItems.count();
  }

  async getCartInfo() {
    const items = [];
    const rows = await this.cartItems.all();

    for (const row of rows) {
      const name = await row.getByRole('heading').innerText();
      const priceText = await row.locator('p').innerText();

      items.push({
        name: name.trim(),
        price: parsePrice(priceText),
      });
    }

    const totalText = await this.totalValue.innerText();

    return {
      items,
      total: parsePrice(totalText),
    };
  }

  async checkout() {
    await this.checkoutButton.click();
  }

  async verifyItemInCart(expectedName, expectedPrice) {
    await expect(this.page.getByText(expectedName).first()).toBeVisible();
    const info = await this.getCartInfo();
    const foundItem = info.items.find((item) => item.name === expectedName);
    expect(foundItem).toBeDefined();
    expect(foundItem.price).toBe(expectedPrice);
  }
}
