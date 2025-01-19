import { authorizationSliceReducer, AuthorizationSliceState } from '../authorization-slice';
import { checkAuthorizationAction, loginAction, logoutAction } from '../actions';
import { emptyAction } from '@test-utills/mock/redux';
import { createUserMock, createAuthorizationDataMock } from '@test-utills/mock/user';
import { createHttpErrorMock } from '@test-utills/mock/http-error-mock';
import { AuthorizationStatusEnum } from '@shared/types';

describe('Authorization slice reducer', () => {
  let initialSliceState: AuthorizationSliceState;

  beforeEach(() => {
    initialSliceState = {
      error: null,
      status: AuthorizationStatusEnum.Unknown,
      user: null,
    };
  });

  it('should return initial state with empty action', () => {
    const result = authorizationSliceReducer(initialSliceState, emptyAction);

    expect(result).toEqual(initialSliceState);
  });

  it('should return initial state with empty action and undefined state', () => {
    const result = authorizationSliceReducer(undefined, emptyAction);

    expect(result).toEqual(initialSliceState);
  });

  it('should return correct state with "checkAuthorization.pending" action', () => {
    const result = authorizationSliceReducer(initialSliceState, checkAuthorizationAction.pending);

    expect(result).toEqual(initialSliceState);
  });

  it('should return correct state with "checkAuthorization.rejected" action', () => {
    initialSliceState.status = AuthorizationStatusEnum.Authorized;
    initialSliceState.user = createUserMock();
    const errorMock = createHttpErrorMock(401);

    const expectedState: AuthorizationSliceState = {
      error: {
        code: errorMock.code,
        message: errorMock.message
      },
      status: AuthorizationStatusEnum.NoAuthorized,
      user: null,
    };

    const result = authorizationSliceReducer(initialSliceState, checkAuthorizationAction.rejected(errorMock, '', undefined));

    expect(result).toEqual(expectedState);
  });

  describe('should return correct state with "checkAuthorization.fullfilled" action', () => {
    it('authorized case', () => {
      const userMock = createUserMock();
      const expectedState: AuthorizationSliceState = {
        error: null,
        status: AuthorizationStatusEnum.Authorized,
        user: userMock,
      };

      const result = authorizationSliceReducer(initialSliceState, checkAuthorizationAction.fulfilled(userMock, '', undefined));

      expect(result).toEqual(expectedState);
    });

    it('no authorized case', () => {
      const expectedState: AuthorizationSliceState = {
        error: null,
        status: AuthorizationStatusEnum.NoAuthorized,
        user: null,
      };

      const result = authorizationSliceReducer(initialSliceState, checkAuthorizationAction.fulfilled(null, '', undefined));

      expect(result).toEqual(expectedState);
    });
  });

  it('should return correct state with "loginAction.pending" action', () => {
    initialSliceState.status = AuthorizationStatusEnum.Authorized;
    initialSliceState.user = createUserMock();

    const expectedState: AuthorizationSliceState = {
      error: null,
      status: AuthorizationStatusEnum.Unknown,
      user: null,
    };

    const result = authorizationSliceReducer(initialSliceState, loginAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should return correct state with "loginAction.rejected" action', () => {
    const errorMock = createHttpErrorMock(400);
    const authorizationDataMock = createAuthorizationDataMock();
    const expectedState: AuthorizationSliceState = {
      error: {
        code: errorMock.code,
        message: errorMock.message
      },
      status: AuthorizationStatusEnum.NoAuthorized,
      user: null,
    };

    const result = authorizationSliceReducer(initialSliceState, loginAction.rejected(errorMock, '', authorizationDataMock));

    expect(result).toEqual(expectedState);
  });

  it('should return correct state with "loginAction.fullfilled" action', () => {
    const authorizationDataMock = createAuthorizationDataMock();
    const userMock = createUserMock();
    const expectedState: AuthorizationSliceState = {
      error: null,
      status: AuthorizationStatusEnum.Authorized,
      user: userMock,
    };

    const result = authorizationSliceReducer(initialSliceState, loginAction.fulfilled(userMock, '', authorizationDataMock));

    expect(result).toEqual(expectedState);
  });

  it('should return correct state with "logoutAction.pending" action', () => {
    const userMock = createUserMock();
    initialSliceState = {
      error: {
        code: 'test',
        message: 'test'
      },
      status: AuthorizationStatusEnum.Authorized,
      user: userMock
    };

    const expectedState: AuthorizationSliceState = {
      error: null,
      status: AuthorizationStatusEnum.Authorized,
      user: userMock,
    };

    const result = authorizationSliceReducer(initialSliceState, logoutAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should return correct state with "logoutAction.rejected" action', () => {
    const userMock = createUserMock();
    const errorMock = createHttpErrorMock(500);
    initialSliceState.user = userMock;
    initialSliceState.status = AuthorizationStatusEnum.Authorized;

    const expectedState: AuthorizationSliceState = {
      error: {
        code: errorMock.code,
        message: errorMock.message
      },
      status: AuthorizationStatusEnum.Authorized,
      user: userMock,
    };

    const result = authorizationSliceReducer(initialSliceState, logoutAction.rejected(errorMock, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should return correct state with "logoutAction.fullfilled" action', () => {
    const userMock = createUserMock();
    initialSliceState.user = userMock;
    initialSliceState.status = AuthorizationStatusEnum.Authorized;

    const expectedState: AuthorizationSliceState = {
      error: null,
      status: AuthorizationStatusEnum.NoAuthorized,
      user: null,
    };

    const result = authorizationSliceReducer(initialSliceState, logoutAction.fulfilled);

    expect(result).toEqual(expectedState);
  });
});
