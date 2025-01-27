import { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-toastify';
import { TOAST_CONTAINER_ID, TOAST_OPTIONS } from '@app/config/toast';
import { tokenServiceInstance } from '@shared/lib/token-service';

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true
};

type ResponseInterceptor = Parameters<AxiosInstance['interceptors']['response']['use']>

type RequestInterceptor = Parameters<AxiosInstance['interceptors']['request']['use']>

const handleErrorProcess = (errorMessage: string) => {
  toast.dismiss({containerId: TOAST_CONTAINER_ID});
  toast.error(errorMessage, TOAST_OPTIONS);
};

const addAuthorizationToken = (request: InternalAxiosRequestConfig<unknown>) => {
  const authorizationToken = tokenServiceInstance.authorizationToken.get();

  if (request.headers && authorizationToken) {
    request.headers['x-token'] = authorizationToken;
  }

  if (request?.timeoutErrorMessage) {
    handleErrorProcess(request.timeoutErrorMessage);
  }

  return request;
};

const handleResponseError = (error: AxiosError<{message: string}>) => {
  if (error?.response && !!StatusCodeMapping[error.response.status]) {
    handleErrorProcess(error.response.data.message);
  }

  throw error;
};

export const requestHeadersInterceptor: RequestInterceptor = [
  addAuthorizationToken,
];

export const responseErrorInterceptor: ResponseInterceptor = [
  (response) => response,
  handleResponseError
];
