import {
  globalLoaderReducer,
  initialState,
  setLoading as setLoadingAction
} from '../global-loader-slice';
import { emptyAction } from '@test-utills/mock/redux';
import { createGlobalLoaderSliceState } from './utills';

describe('Global loader slice reducer', () => {
  it('should return initial state with empty action', () => {
    const expectedState = { ...initialState };

    const result = globalLoaderReducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return initial state with empty action and undefined state', () => {
    const expectedState = { ...initialState };

    const result = globalLoaderReducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return correct state by "setLoading" action', () => {
    const notLoadingState = createGlobalLoaderSliceState(false).loading;
    const loadingState = createGlobalLoaderSliceState(true).loading;

    const result = globalLoaderReducer(notLoadingState, setLoadingAction(true));

    expect(result).toEqual(loadingState);
  });
});
