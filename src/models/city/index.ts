import { createEffect, createEvent, createStore } from 'effector';

import CityAPI from '../../common/api/cityAPI';
import { City } from './types';

export const $cities = createStore<City[]>([]);
export const changeCity = createEvent<string>();

export const fetchCitiesFx = createEffect(async () => {
  const res = await CityAPI.getAll();

  if (!res?.data) return new Error('Cities not found');

  return res.data.content;
});
