import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import { Action, Middleware } from '@reduxjs/toolkit';
import { RootState } from '@shared/lib/store';
import { createAppThunkMiddlewareMock } from '@test-utills/mock/redux';
import type { AppThunkDispatch } from '@test-utills/mock/redux';
import { AxiosInstance } from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { MemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { withRouter } from './with-router';

type WithStoreReturn = {
  wrappedComponent: JSX.Element;
  store: MockStore;
  axiosAdapter: AxiosMockAdapter;
  axiosInstance: AxiosInstance;
};

export const withStore = (
  component: JSX.Element,
  initialState: Partial<RootState> = {},
  additionalMiddlewares: Middleware[] = [],
  history?: MemoryHistory,
  thunkMiddlewareInfo?: ReturnType<typeof createAppThunkMiddlewareMock>,
): WithStoreReturn => {
  const {
    axiosInstance,
    axiosMockAdapter,
    middleware: thunkMiddleware
  } = thunkMiddlewareInfo ?? createAppThunkMiddlewareMock();
  const storeCreator = configureMockStore<
    RootState,
    Action<string>,
    AppThunkDispatch
  >([thunkMiddleware].concat(additionalMiddlewares));

  const mockedStore = storeCreator(initialState);
  const connectedToStoreComponent = <Provider store={mockedStore}>{component}</Provider>;
  const wrappedComponent = history ? withRouter(connectedToStoreComponent) : connectedToStoreComponent;

  return {
    wrappedComponent,
    axiosAdapter: axiosMockAdapter,
    axiosInstance,
    store: mockedStore
  };
};
