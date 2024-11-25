import React from 'react';
import ReactDOM from 'react-dom/client';
import RouterProvider from './routers';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider />
  </React.StrictMode>
);