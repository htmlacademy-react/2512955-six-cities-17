import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@shared/lib/store';

type LoaderSliceState = {
  loading: boolean;
}

const initialState: LoaderSliceState = {
  loading: false
};

const globalLoaderSlice = createSlice({
  initialState,
  name: 'globalLoader',
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    }
  }
});

export const globalLoaderReducer = globalLoaderSlice.reducer;
export const { setLoading } = globalLoaderSlice.actions;
export const getLoaderSelector = (state: RootState) => state.loading.loading;
