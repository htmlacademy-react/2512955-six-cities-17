import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OfferSortType } from './types';
import { RootState } from '@shared/lib/store';

export type SortingSliceState = {
  priceSorting: OfferSortType;
}

const initialState: SortingSliceState = {
  priceSorting: OfferSortType.Default
};

const offerSortingSlice = createSlice({
  initialState,
  name: 'priceSorting',
  reducers: {
    changeSorting: (state, action: PayloadAction<OfferSortType>) => {
      state.priceSorting = action.payload;
    }
  }
});

export type OfferSortingPick = Pick<RootState, 'activeSorting'>

export const getOfferSortingType = (state: OfferSortingPick) => state.activeSorting.priceSorting;

export const { changeSorting } = offerSortingSlice.actions;

export default offerSortingSlice.reducer;
