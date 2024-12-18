import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OfferSortType } from './types';
import { RootState } from '@shared/lib/store';

type SliceState = {
  priceSorting: OfferSortType;
}

const initialState: SliceState = {
  priceSorting: OfferSortType.Default
};

const priceSortingSlice = createSlice({
  initialState,
  name: 'priceSorting',
  reducers: {
    changeSorting: (state, action: PayloadAction<OfferSortType>) => {
      state.priceSorting = action.payload;
    }
  }
});

export const getPriceSortingType = (state: RootState) => state.activeSorting.priceSorting;

export const { changeSorting } = priceSortingSlice.actions;

export default priceSortingSlice.reducer;
