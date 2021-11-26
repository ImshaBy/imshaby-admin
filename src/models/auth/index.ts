import { createStore, createEffect, createEvent } from 'effector';
import createAuth0Client, { Auth0Client } from '@auth0/auth0-spa-js';
import { createGate } from 'effector-react';
import { User } from './types';
import { USER_PARISH_FIELD } from '../../utils/constans';

const { REACT_APP_AUTH_DOMAIN = '', REACT_APP_AUTH_CLIENT_ID = '', REACT_APP_AUTH_AUDIENCE = '' } = process.env;

export const LoginGate = createGate();
export const LogoutGate = createGate();

export const $token = createStore<string>('');
export const $user = createStore<User>({
  parish_id: '',
});

export const loginWithRedirect = createEvent();
export const logout = createEvent();

let client: Auth0Client | null = null;

export const createAuthClientFx = createEffect(async () => {
  if (!client) {
    client = await createAuth0Client({
      domain: REACT_APP_AUTH_DOMAIN,
      client_id: REACT_APP_AUTH_CLIENT_ID,
      redirect_uri: `${window.location.origin}/login`,
      audience: REACT_APP_AUTH_AUDIENCE,
    });
  }
  return client;
});

export const fetchTokenFx = createEffect(() => {
  try {
    // TODO need to ask Andrei to help solve more beatiful
    let token = client?.getTokenSilently();
    if(token){
      return token;
    }
    return "dummy"
  } catch (e) {
    return 'Error: ' + e;
  }
});

export const fetchUserFx = createEffect(async (): Promise<User> => {
  const user = await client?.getUser();
  return {
    parish_id: user ? user[USER_PARISH_FIELD] : '',
  };
});

export const isAuthenticatedFx = createEffect(async (): Promise<boolean> => {
  const isAuthenticated = await client?.isAuthenticated();
  return !!isAuthenticated;
});

export const loginWithRedirectFx = createEffect(async () => {
  await client?.loginWithRedirect();
});

export const logoutFx = createEffect(async () => {
  await client?.logout({
    returnTo: window.location.origin,
  });
});

export const handleRedirectCallbackFx = createEffect(async () => {
  await client?.handleRedirectCallback();
});


