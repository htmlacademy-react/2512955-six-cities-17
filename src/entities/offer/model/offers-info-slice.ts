import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ServerRoutesEnum, type LoadableState } from '@shared/types';
import type { MainOfferInfo } from './types';
import { AxiosInstance } from 'axios';
import { RootState } from '@shared/lib/store';
import { StatusCodes } from 'http-status-codes';

const initialState: LoadableState<MainOfferInfo[]> = {
  error: null,
  loading: false,
  value: []
};

const DEFAULT_ERROR: LoadableState<MainOfferInfo[]>['error'] = {
  code: StatusCodes.BAD_REQUEST,
  message: 'Load failed',
};

export const fetchOffersList = createAsyncThunk<
  MainOfferInfo[],
  undefined,
  {
    extra: AxiosInstance;
  }
>(
  'data/fetchOffersList',
  async (_arg, {extra: api}) => {
    const { data } = await api.get<MainOfferInfo[]>(ServerRoutesEnum.Offers);
    return data;
  },
);

export const offersListSelector = (state: RootState) => state.offersList;

const offersInfoSlice = createSlice({
  initialState,
  reducers: {},
  name: 'offersList',
  extraReducers: (builder) => {
    builder.addCase(fetchOffersList.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchOffersList.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.value = action.payload;
    });
    builder.addCase(fetchOffersList.rejected, (state, action) => {
      state.loading = false;
      state.value = [];
      state.error = {
        code: action.error.code ?? DEFAULT_ERROR.code,
        message: action.error.message ?? DEFAULT_ERROR.message
      };
    });
  },
});

export const offersListReducer = offersInfoSlice.reducer;
