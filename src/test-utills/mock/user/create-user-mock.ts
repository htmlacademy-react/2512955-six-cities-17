import type { User } from '@entities/user';
import { AuthorizedUser } from '@entities/user';
import faker from 'faker';

export const createUserMock = (isPro: boolean = false): User => ({
  avatarUrl: faker.internet.avatar(),
  email: faker.internet.email(),
  isPro,
  name: faker.internet.userName(),
});

export const createAuthorizedUserMock = (): AuthorizedUser => ({
  avatarUrl: faker.internet.avatar(),
  email: faker.internet.email(),
  isPro: faker.datatype.boolean(),
  name: faker.internet.userName(),
  token: faker.internet.password(20),
});
