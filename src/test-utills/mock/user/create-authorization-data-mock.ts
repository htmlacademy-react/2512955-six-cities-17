import { AuthorizationData } from '@entities/user';
import faker from 'faker';

export const createAuthorizationDataMock = (): AuthorizationData => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});
