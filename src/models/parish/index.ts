import axios from 'axios';
import { createStore, createEffect, createEvent } from 'effector';
import { createGate } from 'effector-react';
import parse from 'date-fns/parse';
import { Parish } from './types';
import Qs from 'qs';

const { REACT_APP_API_URL } = process.env;

const DATE_MASK = 'dd-MM-yyyy HH:mm:ss';
const LIMIT = 50;

export const ParishGate = createGate();
export const $parish = createStore<Parish | null>(null);
export const $parishes = createStore<Parish[]>([]);
export const $users_parishes = createStore<Parish[]>([]);

export const changeParish = createEvent<string>();
export const updateParish = createEvent<Parish>();

export const fetchParishFx = createEffect(async (keys: string[] | string) => {
  console.log('fetchParishFxfetchParishFxfetchParishFx');
  if (typeof(keys)==='string') keys = [keys];
  const res = await axios.get(`${REACT_APP_API_URL}parish`, {
    params: {
      filter: keys.map(key => `key==${key}`),
      limit: 1
    },
    paramsSerializer(params) {
        return Qs.stringify(params, {indices: false});
        // 'a=b&a=c&a=d'
    },
    data: {}, // bugfix: https://github.com/axios/axios/issues/86#issuecomment-405930811
  });

  if (!res?.data) return new Error('Parish not found');

  const parish = { ...res.data[0] };
  parish.lastMassActualDate = parse(parish.lastMassActualDate, DATE_MASK, new Date());
  parish.lastModifiedDate = parse(parish.lastModifiedDate, DATE_MASK, new Date());

  return parish;
});

export const fetchParishesByCityIdFx = createEffect(async (city_id: string) => {
  const res = await axios.get(`${REACT_APP_API_URL}parish`, {
    params: {
      filter: `cityId==${city_id}`,
      limit: LIMIT
    },
    data: {}, // bugfix: https://github.com/axios/axios/issues/86#issuecomment-405930811
  });

  if (!res?.data) return new Error('Parishes not found');

  return res.data;
});

export const updateParishFx = createEffect(async (params: { parish_id: string, parish: Parish }) => {
  const { parish, parish_id } = params;
  const res = await axios.put(`${REACT_APP_API_URL}/parish/${parish_id}`, parish);

  if (!res?.data) return new Error('Parish not updated');

  return res.data;
});
