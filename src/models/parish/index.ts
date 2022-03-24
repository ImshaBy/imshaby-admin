import axios from 'axios';
import { createStore, createEffect, createEvent } from 'effector';
import { createGate } from 'effector-react';
import parse from 'date-fns/parse';
import { Parish } from './types';

const { REACT_APP_API_URL } = process.env;

const DATE_MASK = 'dd-MM-yyyy HH:mm:ss';

export const ParishGate = createGate();
export const $parish = createStore<Parish | null>(null);
export const $parishes = createStore<Parish[]>([]);

export const changeParish = createEvent<string>();
export const updateParish = createEvent<Parish>();

export const fetchParishFx = createEffect(async (parish_id: string) => {
  console.log('fetchParishFxfetchParishFxfetchParishFx');
  const res = await axios.get(`${REACT_APP_API_URL}parish/${parish_id}`);

  if (!res?.data) return new Error('Parish not found');

  const parish = { ...res.data };
  parish.lastMassActualDate = parse(parish.lastMassActualDate, DATE_MASK, new Date());
  parish.lastModifiedDate = parse(parish.lastModifiedDate, DATE_MASK, new Date());

  return parish;
});

export const fetchParishesByCityIdFx = createEffect(async (city_id: string) => {
  const res = await axios.get(`https://api2.qa.imsha.by/api/parish`, {
    params: {
      filter: `cityId==${city_id}`
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
