import { combine, createEffect, createStore } from 'effector';
import { createGate } from 'effector-react';
import axios, { AxiosInstance } from 'axios';

export const AppGate = createGate();

export const $apiClientReady = createStore<boolean>(false);
export const $auth0ClientReady = createStore<boolean>(false);
export const $tokenReady = createStore<boolean>(false);

export const $appInitialized = combine(
  $apiClientReady, $auth0ClientReady, $tokenReady,
  (apiClient, auth0Client, token) => apiClient && auth0Client && token,
);

export let api: AxiosInstance = axios.create();

export const createApiClientFx = createEffect(async (token: string): Promise<void> => {
  try {
    api = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    // return true;
  } catch (e) {
    console.error(e);
    // return false;
  }
});