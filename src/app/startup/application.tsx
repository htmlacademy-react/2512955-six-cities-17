import RouterProvider from '../routers';
import { GlobalLoader } from '@shared/ui/global-loader';
import { ToastContainer } from 'react-toastify';
import { TOAST_CONTAINER_ID } from '../config';
import { useStartup } from './use-startup';

export function App(): JSX.Element {
  useStartup();

  return (
    <>
      <ToastContainer
        limit={1}
        autoClose={3000}
        theme='colored'
        position='bottom-center'
        containerId={TOAST_CONTAINER_ID}
      />
      <RouterProvider />
      <GlobalLoader />
    </>
  );
}
