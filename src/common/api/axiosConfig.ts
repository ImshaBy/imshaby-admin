import * as Sentry from '@sentry/react';
import axios from 'axios';
import { Cookies } from 'react-cookie';

const { REACT_APP_API_URL } = process.env;
const apiInstance = axios.create({
  baseURL: REACT_APP_API_URL,
  headers: {
    contentType: 'application/json',
  },
});

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
