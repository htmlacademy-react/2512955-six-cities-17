import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { activeLocationReducer } from '@features/locations-filter-list';
import { sortingSliceReducer } from '@features/offer-sorting-select';
import { globalLoaderReducer } from '@shared/model/global-loader-slice';
import { offersListReducer } from '@entities/offer';
import { createApiInstance, responseErrorInterceptor } from './api';

const apiInstance = createApiInstance();
apiInstance.interceptors.response.use(...responseErrorInterceptor);

const rootReducer = combineReducers({
  activeLocation: activeLocationReducer,
  activeSorting: sortingSliceReducer,
  loading: globalLoaderReducer,
  offersList: offersListReducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      thunk: {
        extraArgument: apiInstance
      }
    });
  },
});

export default store;
