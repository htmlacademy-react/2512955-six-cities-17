import { RootState } from '@shared/lib/store';
import { initialState } from '../global-loader-slice';

export const createGlobalLoaderSliceState = (isLoading: boolean = false): Pick<RootState, 'loading'> => ({
  loading: {
    ...initialState,
    loading: isLoading
  }
});
