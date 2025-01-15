import { createAsyncThunk } from '@reduxjs/toolkit';
import type { MainOfferInfo } from '../types';
import type { AxiosInstance } from 'axios';
import { ServerRoutesEnum } from '@shared/types';

export const fetchFavoritesOffersList = createAsyncThunk<
  MainOfferInfo[],
  undefined,
  {
    extra: AxiosInstance;
  }
>(
  'data/fetchFavoritesOffersList',
  async (_arg, {extra: api}) => {
    const { data } = await api.get<MainOfferInfo[]>(ServerRoutesEnum.Favorite);
    return data;
  },
);
