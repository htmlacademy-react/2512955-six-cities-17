import { Bounce, ToastOptions } from 'react-toastify';

export const TOAST_CONTAINER_ID = 'MAIN_TOAST_CONTAINER';

export const TOAST_OPTIONS: ToastOptions<unknown> = {
  position: 'bottom-center',
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
  transition: Bounce,
  containerId: TOAST_CONTAINER_ID
};
