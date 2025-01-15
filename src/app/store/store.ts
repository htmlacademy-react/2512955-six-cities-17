import { configureStore } from '@reduxjs/toolkit';
import { createApiInstance, responseErrorInterceptor, requestHeadersInterceptor } from '../api';
import { DEFAULT_API_SETTINGS } from '../config/api';
import { rootReducer } from './reducer';
import { createRedirectMiddleware } from '@shared/lib/store';
import { browserHistory } from '@app/routers';
import { createAddToFavoriteMiddleware } from '@features/add-offer-to-favorites';
import { setLoading as setLoadingAction } from '@shared/model/global-loader-slice';
import { updateFavoriteOffer, updateMainOffer } from '@entities/offer';
import { updatePageOffer } from '@pages/offer-page';

const apiInstance = createApiInstance(DEFAULT_API_SETTINGS);
apiInstance.interceptors.request.use(...requestHeadersInterceptor);
apiInstance.interceptors.response.use(...responseErrorInterceptor);

const redirectMiddleware = createRedirectMiddleware(browserHistory);
const addToFavoriteMiddleware = createAddToFavoriteMiddleware(
  apiInstance,
  setLoadingAction,
  [updateMainOffer, updateFavoriteOffer, updatePageOffer]
);

const store = configureStore({
  reducer: rootReducer,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      thunk: {
        extraArgument: apiInstance
      }
    }).concat(redirectMiddleware, addToFavoriteMiddleware);
  },
});

export default store;
