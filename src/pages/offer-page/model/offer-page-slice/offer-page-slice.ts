import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { OfferPageState } from './types';
import { fetchOfferPageAction, addNewReviewAction } from './actions';
import { DEFAULT_FETCH_OFFER_ERROR, DEFAULT_ADD_NEW_REVIEW_ERROR } from './consts';
import { UnionOfferInfo, unionToFullOfferInfoAdapter, unionToMainOfferInfoAdapter } from '@entities/offer';

const initialState: OfferPageState = {
  error: null,
  comments: [],
  nearOffers: [],
  offer: null,
  loading: false,
};

const offerPageSlice = createSlice({
  initialState,
  name: 'offerPage',
  reducers: {
    updateOffer: (state, action: PayloadAction<UnionOfferInfo>) => {
      if (action.payload.id === state.offer?.id) {
        state.offer = unionToFullOfferInfoAdapter(action.payload);
      }

      if (state.nearOffers.find((current) => current.id === action.payload.id)) {
        for (let offerIndex = 0; offerIndex < state.nearOffers.length; offerIndex++) {
          if (action.payload.id === state.nearOffers[offerIndex].id) {
            state.nearOffers[offerIndex] = unionToMainOfferInfoAdapter(action.payload);
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
      state.error = null;
      state.comments = action.payload.comments;
      state.nearOffers = action.payload.nearOffers;
      state.offer = action.payload.offer;
      state.loading = false;
    });
    builder.addCase(fetchOfferPageAction.rejected, (state, action) => {
      state.offer = initialState.offer;
      state.comments = initialState.comments;
      state.nearOffers = initialState.nearOffers;
      state.error = {
        code: action.error?.code ?? DEFAULT_FETCH_OFFER_ERROR.code,
        message: action.error?.message ?? DEFAULT_FETCH_OFFER_ERROR.message
      };
      state.loading = false;
    });

    builder.addCase(addNewReviewAction.pending, (state) => {
      state.error = null;
      state.loading = true;
    });
    builder.addCase(addNewReviewAction.fulfilled, (state, action) => {
      state.error = null;
      state.comments.push(action.payload);
      state.loading = false;
    });
    builder.addCase(addNewReviewAction.rejected, (state, action) => {
      state.error = {
        code: action.error?.code ?? DEFAULT_ADD_NEW_REVIEW_ERROR.code,
        message: action.error?.message ?? DEFAULT_ADD_NEW_REVIEW_ERROR.message
      };
      state.loading = false;
    });
  },
});

export const { updateOffer } = offerPageSlice.actions;

export const offerPageReducer = offerPageSlice.reducer;
