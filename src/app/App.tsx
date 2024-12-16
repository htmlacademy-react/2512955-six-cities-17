import React from 'react';
import ReactDOM from 'react-dom/client';
import RouterProvider from './routers';
import { HelmetProvider } from 'react-helmet-async';
import { AuthorizationContextProvider } from '@entities/user';
import { Provider as ReduxStoreProvider } from 'react-redux';
import store from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ReduxStoreProvider store={store}>
      <AuthorizationContextProvider>
        <HelmetProvider>
          <RouterProvider />
        </HelmetProvider>
      </AuthorizationContextProvider>
    </ReduxStoreProvider>
  </React.StrictMode>
);
