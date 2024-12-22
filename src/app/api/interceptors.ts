import { AxiosError, AxiosInstance } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-toastify';
import { TOAST_CONTAINER_ID, TOAST_OPTIONS } from '@app/config';

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true
};

type ResponseInterceptor = Parameters<AxiosInstance['interceptors']['response']['use']>
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type RequestInterceptor = Parameters<AxiosInstance['interceptors']['request']['use']>

const handleResponseError = (error: AxiosError<{message: string}>) => {
  if (error?.response && !!StatusCodeMapping[error.response.status]) {
    toast.dismiss({containerId: TOAST_CONTAINER_ID});
    toast.error(error.response.data.message, TOAST_OPTIONS);
  }

  throw error;
};

export const responseErrorInterceptor: ResponseInterceptor = [
  (response) => response,
  handleResponseError
];
