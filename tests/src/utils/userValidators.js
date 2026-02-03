import { test, expect } from '@playwright/test';

export async function validateUserData(expectedUser, actualResponse) {
  await test.step(`Validate response data for ${expectedUser.email}`, async () => {
    expect.soft(actualResponse, 'User data structure mismatch').toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        firstname: expectedUser.firstname,
        lastname: expectedUser.lastname,
        phoneNumber: expectedUser.phoneNumber,
        email: expectedUser.email,
        username: expectedUser.username,
        role: expectedUser.role || 'USER',
        bucket_id: expect.any(Number),
      })
    );

    expect
      .soft(actualResponse, 'Security check: Password should not be present')
      .not.toHaveProperty('password');
  });
}
