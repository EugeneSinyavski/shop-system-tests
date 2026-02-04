import { test, expect } from '../../src/fixtures/base.js';
import { generateTestUser } from '../../src/utils/testData';
import { validateUserData } from '../../src/utils/userValidators';
import { AllureHelper } from '../../src/utils/allureHelper.js';

test.describe('Register and Login User', () => {
  let testUser;
  let createdUser;

  test.beforeEach(async () => {
    testUser = generateTestUser();
  });

  test('TC-API-01: Register and Login User', async ({ authApi }) => {
    await AllureHelper.apply({
      qaseId: 'TC-API-01',
      owner: 'Eugene Senko',
      severity: 'critical',

      epic: 'API Tests',
      feature: 'Authentication',
      story: 'User Registration',

      tags: ['api', 'auth', 'smoke', 'positive'],
      layer: 'API',

      description: 'Verify that a new user can be registered and log in successfully via API.',
    });

    await test.step('1: Register a new user', async () => {
      createdUser = await authApi.registerUser(testUser);
      await validateUserData(testUser, createdUser);
    });

    await test.step('2: Login with the registered user', async () => {
      const loginResponse = await authApi.loginUser(testUser.email, testUser.password);
      await validateUserData(testUser, loginResponse);

      expect(loginResponse.id).toBe(createdUser.id);
      expect(loginResponse.bucket_id).toBe(createdUser.bucket_id);
    });
  });

  test('TC-API-02: Registration with Existing Email but Different Data', async ({ authApi }) => {
    await AllureHelper.apply({
      qaseId: 'SS-5',
      owner: 'Eugene Senko',
      severity: 'major',

      epic: 'API Tests',
      feature: 'Authentication',
      story: 'Negative Scenarios',

      tags: ['api', 'auth', 'negative'],
      layer: 'API',

      description: 'Verify registration fails with 409 Conflict when email already exists.',
    });

    await test.step('1: Register a new user', async () => {
      createdUser = await authApi.registerUser(testUser);
      await validateUserData(testUser, createdUser);
    });

    await test.step('2: Attempt to register another user with the SAME email', async () => {
      const conflictingUser = generateTestUser({ email: testUser.email });

      const errorResponse = await authApi.registerUserExpectingError(conflictingUser, 409);
      expect(errorResponse.message).toBe(`Email "${conflictingUser.email}" already exists.`);
    });

    await test.step('3: Verify original user can still login', async () => {
      const loginResponse = await authApi.loginUser(testUser.email, testUser.password);
      await validateUserData(testUser, loginResponse);

      expect(loginResponse.id).toBe(createdUser.id);
      expect(loginResponse.bucket_id).toBe(createdUser.bucket_id);
    });
  });

  test('TC-API-03: Registration with Existing Username but Different Data', async ({ authApi }) => {
    await AllureHelper.apply({
      qaseId: 'SS-6', // ID из твоего описания выше
      owner: 'Eugene Senko',
      severity: 'major',

      epic: 'API Tests',
      feature: 'Authentication',
      story: 'Negative Scenarios',

      tags: ['api', 'auth', 'negative'],
      layer: 'API',

      description: 'Verify registration fails with 409 Conflict when username already exists.',
    });

    await test.step('1: Register a new user', async () => {
      createdUser = await authApi.registerUser(testUser);
      await validateUserData(testUser, createdUser);
    });

    await test.step('2: Attempt to register another user with the SAME username', async () => {
      const conflictingUser = generateTestUser({ username: testUser.username });

      const errorResponse = await authApi.registerUserExpectingError(conflictingUser, 409);
      expect(errorResponse.message).toBe(`Username "${conflictingUser.username}" already exists.`);
    });

    await test.step('3: Verify original user can still login', async () => {
      const loginResponse = await authApi.loginUser(testUser.email, testUser.password);
      await validateUserData(testUser, loginResponse);

      expect(loginResponse.id).toBe(createdUser.id);
      expect(loginResponse.bucket_id).toBe(createdUser.bucket_id);
    });
  });

  test.afterEach(async () => {
    await test.step('Post-condition: simulate deletion of test user', async () => {
      // API does not support DELETE; simulation only
    });
  });
});
