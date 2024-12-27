import { offersListReducer } from '@entities/offer';
import { authorizationSliceReducer } from '@entities/user';
import { activeLocationReducer } from '@features/locations-filter-list';
import { sortingSliceReducer } from '@features/offer-sorting-select';
import { combineReducers } from '@reduxjs/toolkit';
import { globalLoaderReducer } from '@shared/model/global-loader-slice';
import { offerPageReducer } from '@pages/offer-page';

export const rootReducer = combineReducers({
  activeLocation: activeLocationReducer,
  activeSorting: sortingSliceReducer,
  loading: globalLoaderReducer,
  offersList: offersListReducer,
  authorization: authorizationSliceReducer,
  fullscreanOffer: offerPageReducer
});
