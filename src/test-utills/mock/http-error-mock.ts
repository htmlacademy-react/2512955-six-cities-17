import { HttpError } from '@test-utills/types/http-error';
import faker from 'faker';

export const createHttpErrorMock = (code: string | number): HttpError => ({
  code: String(code),
  message: faker.lorem.words(2),
  name: faker.lorem.sentence(3),
});
