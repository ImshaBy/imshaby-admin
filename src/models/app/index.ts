import { App } from "./types";
import { UserResponse } from '@fusionauth/typescript-client';
import { createEvent, createStore } from 'effector';
import { createGate } from 'effector-react';
import connectLocalStorage from 'effector-localstorage';

export const AppGate = createGate();

export const $appLocalStorage = connectLocalStorage("appLocalStorage");

export const $app = createStore<App>($appLocalStorage.init({
  parish_id: '',
  city_id: '',
  expire_time: new Date(),
  user: null,
}));
export const $user = $app.map((state) => state.user?.user);

export const changeUser = createEvent<UserResponse>();
export const setExpireTime = createEvent<Date>();

export const logout = createEvent();
export const LoginGate = createGate();