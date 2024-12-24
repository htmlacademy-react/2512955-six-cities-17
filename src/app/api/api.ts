import axios, { type CreateAxiosDefaults } from 'axios';

export const createApiInstance = (config: CreateAxiosDefaults) => axios.create(config);
