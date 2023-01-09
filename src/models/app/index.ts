import { createEffect, createEvent, createStore } from 'effector';
import connectLocalStorage from 'effector-localstorage';
import { createGate } from 'effector-react';
import { Cookies } from 'react-cookie';

import Auth from '../../utils/auth';
import { App } from './types';
// import { getUserParishesFx, getDefaultParishFx } from "./init";

export const AppGate = createGate();
export const LoginGate = createGate();
export const SelectGate = createGate();

// TODO: Replace with react-secure-localstorage
export const $appLocalStorage = connectLocalStorage('appLocalStorage');

export const $app = createStore<App>($appLocalStorage.init({
  parish_id: '',
  city_id: '',
  expire_time: new Date(),
}));
export const $user = createStore<{ defaultParish: string, parishes?: string[] }>({ defaultParish: '' });

export const setExpireTime = createEvent<Date>();

export const logout = createEvent();

export const fetchUserFx = createEffect(async () => {
  const cookies = new Cookies();
  const auth = new Auth();
  const user = await auth.getUserData(cookies.get<string>('access_token') || '');
  if (!user) throw new Error('User not found');

  return user;
});

// export { getUserParishesFx, getDefaultParishFx };
