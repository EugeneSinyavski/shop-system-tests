import { Faker, ru } from '@faker-js/faker';
//rename
const faker = new Faker({ locale: [ru] });

export function generateTestUser(overrides = {}) {
  const uniqueId = faker.string.uuid();

  return {
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    phoneNumber: '+7' + faker.string.numeric(10),
    email: `user-${uniqueId}@example.com`,
    username: `user-${uniqueId}`,
    password: 'Password123!',
    role: 'USER',
    ...overrides,
  };
}
