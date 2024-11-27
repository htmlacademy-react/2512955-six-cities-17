import React from 'react';
import ReactDOM from 'react-dom/client';
import RouterProvider from './routers';
import { HelmetProvider } from 'react-helmet-async';
import { AuthorizationContextProvider } from '@entities/user';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <AuthorizationContextProvider>
      <HelmetProvider>
        <RouterProvider />
      </HelmetProvider>
    </AuthorizationContextProvider>
  </React.StrictMode>
);
