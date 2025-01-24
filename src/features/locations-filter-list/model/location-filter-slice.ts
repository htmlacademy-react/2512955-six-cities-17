import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { OfferCityName } from '@entities/offer';

export type SliceState = {
  location: OfferCityName;
}

const initialState: SliceState = {
  location: 'Paris'
};

const activeLocationSlice = createSlice({
  initialState,
  name: 'activeLocation',
  reducers: {
    changeLocation: (state, action: PayloadAction<OfferCityName>) => {
      state.location = action.payload;
    }
  },
});


export const { changeLocation } = activeLocationSlice.actions;
export default activeLocationSlice.reducer;
