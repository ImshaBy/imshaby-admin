import { createEffect, createEvent, createStore } from 'effector';
import connectLocalStorage from 'effector-localstorage';
import { createGate } from 'effector-react';

import IdentityAPI from '../../common/api/identityAPI';
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
  is_login: false,
}));
export const $user = createStore<{ defaultParish: string, parishes?: string[] }>({ defaultParish: '' });

export const setExpireTime = createEvent<Date>();

export const logout = createEvent();

export const fetchUserFx = createEffect(async () => {
  const user = await IdentityAPI.getUser();
  if (!user) throw new Error('User not found');

  return user;
});

// export { getUserParishesFx, getDefaultParishFx };
