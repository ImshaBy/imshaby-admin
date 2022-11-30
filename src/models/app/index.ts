import { UserResponse } from '@fusionauth/typescript-client';
import { createEvent, createStore } from 'effector';
import { createGate } from 'effector-react';
import {App} from "./types";

export const AppGate = createGate();

export const $app = createStore<App>({
  parish_id: '',
  city_id: '',
  user: null,
});

export const changeUser = createEvent<UserResponse>();

export const logout = createEvent();
export const LoginGate = createGate();