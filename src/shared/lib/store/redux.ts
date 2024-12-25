import { ReduxStore } from '@app/types';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { createRedirectMiddleware } from './redirect-middleware';

export type AppDispatch = ReduxStore.AppDispatch;
export type RootState = ReduxStore.RootState;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export {
  createRedirectMiddleware
};
