import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { UnionOfferInfo } from '../types';
import { fetchFavoritesOffersList } from './actions';
import { DEFAULT_LOADING_ERROR, STATE_TEMPLATE } from '@entities/offer/config/const';
import { unionToMainOfferInfoAdapter } from '@entities/offer/lib/adapters/union-offer-info-adapters';

const favoritesOffersSlice = createSlice({
  name: 'favoritesOffers',
  initialState: STATE_TEMPLATE,
  reducers: {
    updateOffer: (state, action: PayloadAction<UnionOfferInfo>) => {
      const updatedOffer = unionToMainOfferInfoAdapter(action.payload);
      const newFavoritesOffers = state.offers.filter((current) => current.id !== updatedOffer.id);
      if (updatedOffer.isFavorite) {
        newFavoritesOffers.push(updatedOffer);
      }

      state.offers = newFavoritesOffers;
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchFavoritesOffersList.pending, (state) => {
      state.error = null;
      state.offers = [];
    });
    builder.addCase(fetchFavoritesOffersList.fulfilled, (state, action) => {
      state.error = null;
      state.offers = action.payload;
    });
    builder.addCase(fetchFavoritesOffersList.rejected, (state, action) => {
      state.offers = [];
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
