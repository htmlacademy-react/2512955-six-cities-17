import axios from 'axios';

const INSTANCE_SETTINGS = {
  url: 'https://16.design.htmlacademy.pro/six-cities',
  timeout: 5000
};

export const createApiInstance = () => axios.create({
  baseURL: INSTANCE_SETTINGS.url,
  timeout: INSTANCE_SETTINGS.timeout,
});
