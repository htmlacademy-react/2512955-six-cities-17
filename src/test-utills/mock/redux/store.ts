import { RootState } from '@shared/lib/store';
import { Action } from '@reduxjs/toolkit';
import { ThunkDispatch } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { OfferSortType } from '@features/offer-sorting-select';
import { AuthorizationStatusEnum } from '@shared/types';

export type AppThunkDispatch = ThunkDispatch<RootState, AxiosInstance, Action>;

export const createFullInitialState = (): RootState => ({
  activeLocation: {
    location: 'Paris'
  },
  activeSorting: {
    priceSorting: OfferSortType.Default
  },
  authorization: {
    error: null,
    loading: false,
    status: AuthorizationStatusEnum.Unknown,
    user: null,
  },
  favoritesOffers: {
    error: null,
    loading: false,
    offers: []
  },
  fullScreanOffer: {
    comments: [],
    error: null,
    loading: false,
    nearOffers: [],
    offer: null,
  },
  loading: {
    loading: false,
  },
  offersList: {
    error: null,
    loading: false,
    offers: [],
  }
});
