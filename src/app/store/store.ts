import { configureStore } from '@reduxjs/toolkit';
import { createApiInstance, responseErrorInterceptor, requestHeadersInterceptor } from '../api';
import { DEFAULT_API_SETTINGS } from '../config/api';
import { rootReducer } from './reducer';
import { createRedirectMiddleware } from '@shared/lib/store';
import { browserHistory } from '@app/routers';

const apiInstance = createApiInstance(DEFAULT_API_SETTINGS);
apiInstance.interceptors.request.use(...requestHeadersInterceptor);
apiInstance.interceptors.response.use(...responseErrorInterceptor);

const redirectMiddleware = createRedirectMiddleware(browserHistory);

const store = configureStore({
  reducer: rootReducer,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      thunk: {
        extraArgument: apiInstance
      }
    }).concat(redirectMiddleware);
  },
});

export default store;
