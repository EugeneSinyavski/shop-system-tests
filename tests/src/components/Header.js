export class Header {
  constructor(page) {
    this.page = page;
    this.adminPanel = page.getByRole('link', { name: 'Панель' });
    this.cartButton = page.getByRole('link', { name: 'Корзина' });
    this.ordersButton = page.getByRole('link', { name: 'Заказы' });
  }

  async openCart() {
    await this.cartButton.click();
  }

  async openOrders() {
    await this.ordersButton.click();
  }
}
