import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';
import thunk from 'redux-thunk';
import AxiosMockAdapter from 'axios-mock-adapter';
import { RootState } from '@shared/lib/store';
import { Action } from '@reduxjs/toolkit';

type ThunkMiddlewareInfo = {
  middleware: ReturnType<typeof thunk.withExtraArgument<AxiosInstance, RootState, Action<string>>>;
  axiosInstance: AxiosInstance;
  axiosMockAdapter: AxiosMockAdapter;
};

export const createAppThunkMiddlewareMock = (axiosConfig?: CreateAxiosDefaults): ThunkMiddlewareInfo => {
  const axiosInstance = axios.create(axiosConfig);
  const axiosMockAdapter = new AxiosMockAdapter(axiosInstance);
  const middleware = thunk.withExtraArgument<AxiosInstance, RootState, Action<string>>(axiosInstance);

  return {
    axiosInstance,
    axiosMockAdapter,
    middleware
  };
};
