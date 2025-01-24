import { AuthorizationStatusEnum } from '@shared/types';
import {
  authorizationLoadingSelector,
  AuthorizationSliceState,
  authorizationStatusSelector,
  authorizedUserSelector
} from '../selectors';
import { createUserMock } from '@test-utills/mock/user';

describe('Authorization slice selectors', () => {
  let initialSliceState: AuthorizationSliceState;

  beforeEach(() => {
    initialSliceState = {
      authorization: {
        status: AuthorizationStatusEnum.Unknown,
        error: null,
        user: null,
        loading: false
      },
    };
  });

  describe('Selector "authorizationStatusSelector"', () => {
    it('should return correct status from state', () => {
      initialSliceState.authorization.status = AuthorizationStatusEnum.Authorized;

      const result = authorizationStatusSelector(initialSliceState);

      expect(result).toBe(AuthorizationStatusEnum.Authorized);
    });
  });

  describe('Selector "authorizedUserSelector"', () => {
    it('should return correct status from state', () => {
      const userMock = createUserMock();
      initialSliceState.authorization.user = userMock;

      const result = authorizedUserSelector(initialSliceState);

      expect(result).toBe(userMock);
    });
  });

  describe('Selector "authorizationLoadingSelector"', () => {
    it('should return correct status from state', () => {
      const result = authorizationLoadingSelector(initialSliceState);

      expect(result).toBe(initialSliceState.authorization.loading);
    });
  });
});
