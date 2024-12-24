import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { activeLocationReducer } from '@features/locations-filter-list';
import { sortingSliceReducer } from '@features/offer-sorting-select';
import { globalLoaderReducer } from '@shared/model/global-loader-slice';
import { offersListReducer } from '@entities/offer';
import { createApiInstance, responseErrorInterceptor, requestHeadersInterceptor } from './api';
import { authorizationSliceReducer } from '@entities/user';
import { DEFAULT_API_SETTINGS } from './config/api';

const apiInstance = createApiInstance(DEFAULT_API_SETTINGS);
apiInstance.interceptors.request.use(...requestHeadersInterceptor);
apiInstance.interceptors.response.use(...responseErrorInterceptor);

const rootReducer = combineReducers({
  activeLocation: activeLocationReducer,
  activeSorting: sortingSliceReducer,
  loading: globalLoaderReducer,
  offersList: offersListReducer,
  authorization: authorizationSliceReducer
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
