import type { User } from '@entities/user';
import faker from 'faker';

export const createUserMock = (isPro: boolean = false): User => ({
  avatarUrl: faker.internet.avatar(),
  email: faker.internet.email(),
  isPro,
  name: faker.internet.userName(),
});
