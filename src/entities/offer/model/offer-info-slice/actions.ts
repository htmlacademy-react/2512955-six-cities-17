import { createAsyncThunk } from '@reduxjs/toolkit';
import type { MainOfferInfo } from '../types';
import type { AxiosInstance } from 'axios';
import { ServerRoutesEnum } from '@shared/types';

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
