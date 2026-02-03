import { expect, test } from '@playwright/test';
import { endpoints } from '../../config/endpoints.js';

const API_URL = process.env.API_URL || 'http://localhost:3000';

export class AuthAPI {
  constructor(request) {
    this.request = request;
  }

  getUrl(endpoint) {
    return `${API_URL}${endpoint}`;
  }

  async _attachData(name, data) {
    if (data) {
      await test.info().attach(name, {
        body: JSON.stringify(data, null, 2),
        contentType: 'application/json',
      });
    }
  }

  async registerUser(userData) {
    return await test.step(`→ Register User: ${userData.email}`, async () => {
      const url = this.getUrl(endpoints.auth.register);
      await this._attachData('Request Body', userData);

      const response = await this.request.post(url, { data: userData });
      const body = await response.json();

      await this._attachData('Response Body', body);

      expect(response.status(), `Status check. Body:${JSON.stringify(body)}`).toBe(201);

      return body;
    });
  }

  async registerUserExpectingError(userData, expectedStatus) {
    return await test.step(`→ Register User (Expect Error ${expectedStatus})`, async () => {
      const url = this.getUrl(endpoints.auth.register);
      await this._attachData('Request Body (Conflict)', userData);

      const response = await this.request.post(url, { data: userData });
      const body = await response.json();

      await this._attachData('Error Response Body', body);

      expect(response.status()).toBe(expectedStatus);

      return body;
    });
  }

  async loginUser(email, password) {
    return await test.step(`→ Login User: ${email}`, async () => {
      const url = this.getUrl(endpoints.auth.login);
      const payload = { email, password };

      await this._attachData('Login Request', payload);

      const response = await this.request.post(url, { data: payload });
      const body = await response.json();

      await this._attachData('Login Response', body);

      await expect(response).toBeOK();
      return body;
    });
  }
}
