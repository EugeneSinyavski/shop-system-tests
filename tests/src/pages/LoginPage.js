import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.emailInput = page.getByRole('textbox', { name: 'email' });
    this.pageHeading = page.getByText('Вход в систему');
    this.passwordInput = page.getByRole('textbox', { name: 'Пароль' });
    this.submitButton = page.getByRole('button', { name: 'Войти' });
  }

  async open() {
    await super.open('/login');
  }

  async fillCredentials(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }
  //проверка перед заполнением
  async submit() {
    await this.submitButton.click();
  }
}
