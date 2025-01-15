import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { OfferPageState } from './types';
import type { LoadableState } from '@shared/types';
import { fetchOfferPageAction, addNewReviewAction } from './actions';
import { DEFAULT_FETCH_OFFER_ERROR, DEFAULT_ADD_NEW_REVIEW_ERROR } from './consts';
import { MainOfferInfo } from '@entities/offer';

const initialState: LoadableState<OfferPageState> = {
  loading: false,
  error: null,
  value: {
    comments: [],
    nearOffers: [],
    offer: null,
  }
};

const offerPageSlice = createSlice({
  initialState,
  name: 'offerPage',
  reducers: {
    updateOffer: (state, action: PayloadAction<MainOfferInfo>) => {
      if (action.payload.id === state.value.offer?.id) {
        state.value.offer.isFavorite = action.payload.isFavorite;
      }

      if (state.value.nearOffers.find((current) => current.id === action.payload.id)) {
        for (let offerIndex = 0; offerIndex < state.value.nearOffers.length; offerIndex++) {
          if (action.payload.id === state.value.nearOffers[offerIndex].id) {
            state.value.nearOffers[offerIndex] = action.payload;
            break;
          }
        }
      }
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchOfferPageAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchOfferPageAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.value = action.payload;
    });
    builder.addCase(fetchOfferPageAction.rejected, (state, action) => {
      state.loading = false;
      state.value = initialState.value;
      state.error = {
        code: action.error?.code ?? DEFAULT_FETCH_OFFER_ERROR.code,
        message: action.error?.message ?? DEFAULT_FETCH_OFFER_ERROR.message
      };
    });

    builder.addCase(addNewReviewAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addNewReviewAction.fulfilled, (state, action) => {
      state.error = null;
      state.loading = false;
      state.value.comments.push(action.payload);
    });
    builder.addCase(addNewReviewAction.rejected, (state, action) => {
      state.loading = false;
      state.error = {
        code: action.error?.code ?? DEFAULT_ADD_NEW_REVIEW_ERROR.code,
        message: action.error?.message ?? DEFAULT_ADD_NEW_REVIEW_ERROR.message
      };
    });
  },
});

export const { updateOffer } = offerPageSlice.actions;

export const offerPageReducer = offerPageSlice.reducer;
