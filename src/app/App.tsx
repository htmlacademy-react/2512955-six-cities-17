import React from 'react';
import ReactDOM from 'react-dom/client';
import RouterProvider from './routers';
import { HelmetProvider } from 'react-helmet-async';
import { AuthorizationContextProvider } from '@entities/user';
import { Provider as ReduxStoreProvider } from 'react-redux';
import store from './store';
import { GlobalLoader } from '@shared/ui/global-loader';
import { ToastContainer } from 'react-toastify';
import { TOAST_CONTAINER_ID } from './config';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ReduxStoreProvider store={store}>
      <AuthorizationContextProvider>
        <ToastContainer
          limit={1}
          autoClose={3000}
          theme='colored'
          position='bottom-center'
          containerId={TOAST_CONTAINER_ID}
        />
        <GlobalLoader />
        <HelmetProvider>
          <RouterProvider />
        </HelmetProvider>
      </AuthorizationContextProvider>
    </ReduxStoreProvider>
  </React.StrictMode>
);
