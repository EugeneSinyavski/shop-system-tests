import { Notification } from '../components/Notification';
import { Header } from '../components/Header';

export class BasePage {
  constructor(page) {
    this.page = page;
    this.notification = new Notification(page);
    this.header = new Header(page);
  }

  async open(path) {
    await this.page.goto(path);
  }
}
