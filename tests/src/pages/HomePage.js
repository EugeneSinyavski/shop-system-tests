import { BasePage } from './BasePage';
import { parsePrice } from '../utils/parsePrice';
import { test } from '@playwright/test';

export class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.catalogHeader = page.getByRole('heading', { name: 'Каталог товаров' });
    this.productCards = page.locator('a[href^="/product/"]');
  }

  async open() {
    await super.open('/');
  }

  getProductCardLocators(index = 0) {
    const card = this.productCards.nth(index);
    return {
      card,
      name: card.locator('div.flex-grow > div:first-child'),
      price: card.locator('div.flex-grow span'),
      addToCartButton: card.getByRole('button', { name: /в корзину/i }),
    };
  }

  async getProductName(index = 0) {
    const { name } = this.getProductCardLocators(index);
    return name.innerText();
  }

  async getProductPrice(index = 0) {
    const { price } = this.getProductCardLocators(index);
    return parsePrice(await price.innerText());
  }

  async addProductToCart(index = 0) {
    await test.step(`Action: Add product to cart`, async () => {
      const { addToCartButton } = this.getProductCardLocators(index);
      await addToCartButton.click();
    });
  }
}
