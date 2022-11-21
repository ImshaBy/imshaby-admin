import { UserResponse } from '@fusionauth/typescript-client';
import { createEvent, createStore } from 'effector';
import connectLocalStorage from 'effector-localstorage';
import { createGate } from 'effector-react';
import {App} from "./types";

export const AppGate = createGate();

export const $appLocalStorage = connectLocalStorage("appLocalStorage");

export const $app = createStore<App>($appLocalStorage.init({
  parish_id: '',
  city_id: '',
  user: null,
}));

export const changeUser = createEvent<UserResponse>();

export const logout = createEvent();
export const LoginGate = createGate();