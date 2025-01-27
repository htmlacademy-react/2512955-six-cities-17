import RouterProvider from '../routers';
import { GlobalLoader } from '@shared/ui/global-loader';
import { ToastContainer } from 'react-toastify';
import {
  TOAST_CONTAINER_ID,
  AUTO_CLOSE_TIME,
  TOAST_PUSHES_LIMIT,
  TOAST_THEME,
  TOAST_POSITION
} from '../config/toast';
import { useStartup } from './use-startup';
import { offersLoadingSelector, favoritesLoadingSelector } from '@entities/offer';
import { authorizationLoadingSelector } from '@entities/user';
import { offerPageLoadingSelector } from '@pages/offer-page';

export function App(): JSX.Element {
  useStartup();

  return (
    <>
      <ToastContainer
        limit={TOAST_PUSHES_LIMIT}
        autoClose={AUTO_CLOSE_TIME}
        theme={TOAST_THEME}
        position={TOAST_POSITION}
        containerId={TOAST_CONTAINER_ID}
      />
      <RouterProvider />
      <GlobalLoader
        offerPageLoadingSelector={offerPageLoadingSelector}
        authorizationLoadingSelector={authorizationLoadingSelector}
        favoritesOffersLoadingSelector={favoritesLoadingSelector}
        mainOffersLoadingSelector={offersLoadingSelector}
      />
    </>
  );
}
