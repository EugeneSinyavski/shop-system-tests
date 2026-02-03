import { BasePage } from './BasePage';
import { parsePrice } from '../utils/parsePrice';

export class OrderPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
    this.orders = page.getByRole('button', { name: /Заказ #/ });
    this.lastOrder = this.orders.last();

    this.openOrderDetails = page.locator('div[role="region"]:not([hidden])').last();
  }

  async openLastOrder() {
    await this.lastOrder.click();
    await this.openOrderDetails.waitFor();
  }

  async getLastOrderTotalPrice() {
    const rawText = await this.lastOrder.getByText(/руб\./).first().textContent();

    return parsePrice(rawText);
  }

  async getLastOrderProductNames() {
    return await this.openOrderDetails.locator('img + div h5').allTextContents();
  }

  async getLastOrderData() {
    await this.openLastOrder();

    return {
      totalPrice: await this.getLastOrderTotalPrice(),
      products: await this.getLastOrderProductNames(),
    };
  }
}
