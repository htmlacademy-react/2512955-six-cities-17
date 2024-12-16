import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { activeLocationReducer } from '@features/locations-filter-list';

const rootReducer = combineReducers({
  activeLocation: activeLocationReducer
});

const store = configureStore({
  reducer: rootReducer
});

export default store;
