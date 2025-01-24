import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { UnionOfferInfo } from '../types';
import { fetchOffersList } from './actions';
import { DEFAULT_LOADING_ERROR, STATE_TEMPLATE } from '@entities/offer/config/const';
import { unionToMainOfferInfoAdapter } from '@entities/offer/lib/adapters/union-offer-info-adapters';

const offersInfoSlice = createSlice({
  initialState: STATE_TEMPLATE,
  reducers: {
    updateOffer: (state, action: PayloadAction<UnionOfferInfo>) => {
      const offer = unionToMainOfferInfoAdapter(action.payload);
      for (let offerIndex = 0; offerIndex < state.offers.length; offerIndex++) {
        if (state.offers[offerIndex].id === offer.id) {
          state.offers[offerIndex] = offer;
          break;
        }
      }
    }
  },
  name: 'offersList',
  extraReducers: (builder) => {
    builder.addCase(fetchOffersList.pending, (state) => {
      state.offers = [];
      state.error = null;
      state.loading = true;
    });
    builder.addCase(fetchOffersList.fulfilled, (state, action) => {
      state.error = null;
      state.offers = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchOffersList.rejected, (state, action) => {
      state.offers = [];
      state.error = {
        code: action.error.code ?? DEFAULT_LOADING_ERROR.code,
        message: action.error.message ?? DEFAULT_LOADING_ERROR.message
      };
      state.loading = false;
    });
  },
});

const offersListReducer = offersInfoSlice.reducer;
const { updateOffer } = offersInfoSlice.actions;

export {
  offersListReducer,
  updateOffer
};
