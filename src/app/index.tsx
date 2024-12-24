import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as ReduxStoreProvider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import store from './store';
import { App } from './application';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <ReduxStoreProvider store={store}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </ReduxStoreProvider>
  </StrictMode>
);
