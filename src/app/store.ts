import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { activeLocationReducer } from '@features/locations-filter-list';
import { sortingSliceReducer } from '@features/price-sorting-select';

const rootReducer = combineReducers({
  activeLocation: activeLocationReducer,
  activeSorting: sortingSliceReducer
});

const store = configureStore({
  reducer: rootReducer
});

export default store;
