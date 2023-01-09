import axios from 'axios';
import { createEffect, createEvent, createStore } from 'effector';

import { City } from './types';

const { REACT_APP_API_URL } = process.env;

export const $cities = createStore<City[]>([]);
export const changeCity = createEvent<string>();

export const fetchCitiesFx = createEffect(async () => {
  const res = await axios.get(`${REACT_APP_API_URL}cities`);

  if (!res?.data) return new Error('Cities not found');

  return res.data.content;
});
