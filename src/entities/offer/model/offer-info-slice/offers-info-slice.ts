import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MainOfferInfo } from '../types';
import { fetchOffersList } from './actions';
import { DEFAULT_LOADING_ERROR, STATE_TEMPLATE } from '@entities/offer/config/const';

const offersInfoSlice = createSlice({
  initialState: STATE_TEMPLATE,
  reducers: {
    updateOffer: (state, action: PayloadAction<MainOfferInfo>) => {
      const offer = action.payload;
      for (let offerIndex = 0; offerIndex < state.value.length; offerIndex++) {
        if (state.value[offerIndex].id === offer.id) {
          state.value[offerIndex] = offer;
          break;
        }
      }
    }
  },
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
        code: action.error.code ?? DEFAULT_LOADING_ERROR.code,
        message: action.error.message ?? DEFAULT_LOADING_ERROR.message
      };
    });
  },
});

const offersListReducer = offersInfoSlice.reducer;
const { updateOffer } = offersInfoSlice.actions;

export {
  offersListReducer,
  updateOffer
};
