/* eslint-disable @typescript-eslint/naming-convention */
import * as Sentry from '@sentry/react';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { Cookies } from 'react-cookie';

const { VITE_API_URL } = import.meta.env;
const apiInstance = axios.create({
  baseURL: VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-show-pending': 'true',
  },
});
axiosRetry(apiInstance, { retries: 3 });

apiInstance.interceptors.request.use((config) => {
  const defaultConfig = config;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const cookies = new Cookies();
  const token = cookies.get<string>('access_token') || '';
  if (token) {
    defaultConfig.headers.Authorization = `Bearer ${token}`;
  }
  return defaultConfig;
});

apiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Capture API error to Sentry
    Sentry.captureException(error);
    return Promise.reject(error);
  },
);

export default apiInstance;
