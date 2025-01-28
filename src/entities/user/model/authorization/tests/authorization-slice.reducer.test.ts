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
      loading: false,
    };
  });

  it('should return \'initialState\' with empty action', () => {
    const result = authorizationSliceReducer(initialSliceState, emptyAction);

    expect(result).toEqual(initialSliceState);
  });

  it('should return \'initialState\' with empty action and undefined state', () => {
    const result = authorizationSliceReducer(undefined, emptyAction);

    expect(result).toEqual(initialSliceState);
  });

  it('should return correct state with "checkAuthorization.pending" action', () => {
    const expectedState: AuthorizationSliceState = {
      ...initialSliceState,
      loading: true
    };

    const result = authorizationSliceReducer(initialSliceState, checkAuthorizationAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should return correct state with "checkAuthorization.rejected" action', () => {
    initialSliceState.status = AuthorizationStatusEnum.Authorized;
    initialSliceState.user = createUserMock();
    initialSliceState.loading = true;
    const errorMock = createHttpErrorMock(401);

    const expectedState: AuthorizationSliceState = {
      error: {
        code: errorMock.code,
        message: errorMock.message
      },
      status: AuthorizationStatusEnum.NoAuthorized,
      user: null,
      loading: false,
    };

    const result = authorizationSliceReducer(initialSliceState, checkAuthorizationAction.rejected(errorMock, '', undefined));

    expect(result).toEqual(expectedState);
  });

  describe('should return correct state with "checkAuthorization.fullfilled" action', () => {
    it('authorized case', () => {
      initialSliceState.loading = true;
      const userMock = createUserMock();
      const expectedState: AuthorizationSliceState = {
        error: null,
        status: AuthorizationStatusEnum.Authorized,
        user: userMock,
        loading: false
      };

      const result = authorizationSliceReducer(initialSliceState, checkAuthorizationAction.fulfilled(userMock, '', undefined));

      expect(result).toEqual(expectedState);
    });

    it('no authorized case', () => {
      initialSliceState.loading = true;
      const expectedState: AuthorizationSliceState = {
        error: null,
        status: AuthorizationStatusEnum.NoAuthorized,
        user: null,
        loading: false
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
      loading: true,
    };

    const result = authorizationSliceReducer(initialSliceState, loginAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should return correct state with "loginAction.rejected" action', () => {
    initialSliceState.loading = true;
    const errorMock = createHttpErrorMock(400);
    const authorizationDataMock = createAuthorizationDataMock();
    const expectedState: AuthorizationSliceState = {
      error: {
        code: errorMock.code,
        message: errorMock.message
      },
      status: AuthorizationStatusEnum.NoAuthorized,
      user: null,
      loading: false
    };

    const result = authorizationSliceReducer(initialSliceState, loginAction.rejected(errorMock, '', authorizationDataMock));

    expect(result).toEqual(expectedState);
  });

  it('should return correct state with "loginAction.fullfilled" action', () => {
    initialSliceState.loading = true;
    const authorizationDataMock = createAuthorizationDataMock();
    const userMock = createUserMock();
    const expectedState: AuthorizationSliceState = {
      error: null,
      status: AuthorizationStatusEnum.Authorized,
      user: userMock,
      loading: false
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
      user: userMock,
      loading: false
    };

    const expectedState: AuthorizationSliceState = {
      error: null,
      status: AuthorizationStatusEnum.Authorized,
      user: userMock,
      loading: true
    };

    const result = authorizationSliceReducer(initialSliceState, logoutAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should return correct state with "logoutAction.rejected" action', () => {
    const userMock = createUserMock();
    const errorMock = createHttpErrorMock(500);
    initialSliceState.user = userMock;
    initialSliceState.status = AuthorizationStatusEnum.Authorized;
    initialSliceState.loading = true;

    const expectedState: AuthorizationSliceState = {
      error: {
        code: errorMock.code,
        message: errorMock.message
      },
      status: AuthorizationStatusEnum.Authorized,
      user: userMock,
      loading: false
    };

    const result = authorizationSliceReducer(initialSliceState, logoutAction.rejected(errorMock, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should return correct state with "logoutAction.fullfilled" action', () => {
    const userMock = createUserMock();
    initialSliceState.user = userMock;
    initialSliceState.status = AuthorizationStatusEnum.Authorized;
    initialSliceState.loading = true;

    const expectedState: AuthorizationSliceState = {
      error: null,
      status: AuthorizationStatusEnum.NoAuthorized,
      user: null,
      loading: false,
    };

    const result = authorizationSliceReducer(initialSliceState, logoutAction.fulfilled);

    expect(result).toEqual(expectedState);
  });
});
