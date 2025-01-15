import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MainOfferInfo } from '../types';
import { fetchFavoritesOffersList } from './actions';
import { DEFAULT_LOADING_ERROR, STATE_TEMPLATE } from '@entities/offer/config/const';

const favoritesOffersSlice = createSlice({
  name: 'favoritesOffers',
  initialState: STATE_TEMPLATE,
  reducers: {
    updateOffer: (state, action: PayloadAction<MainOfferInfo>) => {
      const updatedOffer = action.payload;
      const newFavoritesOffers = state.value.filter((current) => current.id !== updatedOffer.id);
      if (updatedOffer.isFavorite) {
        newFavoritesOffers.push(updatedOffer);
      }

      state.value = newFavoritesOffers;
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchFavoritesOffersList.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.value = [];
    });
    builder.addCase(fetchFavoritesOffersList.fulfilled, (state, action) => {
      state.error = null;
      state.loading = false;
      state.value = action.payload;
    });
    builder.addCase(fetchFavoritesOffersList.rejected, (state, action) => {
      state.loading = false;
      state.value = [];
      state.error = {
        code: action.error.code ?? DEFAULT_LOADING_ERROR.code,
        message: action.error.message ?? DEFAULT_LOADING_ERROR.message
      };
    });
  },
});

const favoritesOffersReducer = favoritesOffersSlice.reducer;
const { updateOffer } = favoritesOffersSlice.actions;

export {
  favoritesOffersReducer,
  updateOffer
};
