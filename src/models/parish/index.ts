/* eslint-disable no-param-reassign */
import axios from 'axios';
import parse from 'date-fns/parse';
import {
  attach, combine, createEffect, createEvent, createStore, guard, sample,
} from 'effector';
import { createGate } from 'effector-react';
import moment from 'moment';
import Qs from 'qs';

import { $app, $user } from '../app';
import { Filters, Parish } from './types';

const { REACT_APP_API_URL } = process.env;

const DATE_MASK = 'dd-MM-yyyy HH:mm:ss';

export const ParishGate = createGate();
export const $parishes = createStore<Parish[]>([]);
export const $selectParishes = createStore<Parish[]>([]);
export const $parish = createStore<Parish | null>(null);
export const $userParishes = createStore<{ defaultParish: string, parishes: string[] }>({ defaultParish: '', parishes: [] });

export const changeParish = createEvent<string>();
export const updateParish = createEvent<Parish>();

export const fetchParishFx = createEffect(async (parish_id: string) => {
  const res = await axios.get(`${REACT_APP_API_URL}parish/${parish_id}`);

  if (!res?.data) throw new Error('Parish not found');

  const parish = { ...res.data };
  parish.lastMassActualDate = parse(parish.lastMassActualDate, DATE_MASK, new Date());
  parish.lastModifiedDate = parse(parish.lastModifiedDate, DATE_MASK, new Date());

  return parish;
});

export const fetchParishesFiltersFx = createEffect(async (filters: Filters) => {
  const res = await axios.get(`${REACT_APP_API_URL}parish`, {
    params: {
      filter: Object.entries(filters).map(([key, value]) => new Array<string | undefined>().concat(value).map((data) => `${key}==${data}`)),
    },
    paramsSerializer(params) {
      return Qs.stringify(params, { indices: false });
      // 'a=b&a=c&a=d'
    },
    data: {}, // bugfix: https://github.com/axios/axios/issues/86#issuecomment-405930811
  });

  if (!res?.data) throw new Error('Parishes not found by provided filters');
  const parishes: Parish[] = res.data.map((parish: any) => {
    parish.lastMassActualDate = parse(parish.lastMassActualDate, DATE_MASK, new Date());
    parish.lastModifiedDate = parse(parish.lastModifiedDate, DATE_MASK, new Date());
    return parish;
  });

  return parishes;
});

export const updateParishFx = createEffect(
  async (params: { parish_id: string, parish: Parish }) => {
    const { parish, parish_id } = params;
    const res = await axios.put(`${REACT_APP_API_URL}/parish/${parish_id}`, parish);

    if (!res?.data) throw new Error('Parish not updated');

    return res.data;
  },
);

export const getDefaultParishFx = guard({
  clock: $user,
  source: combine({
    app: $app,
    user: $user,
  }),
  filter: (sourceData) => (
    moment(sourceData.app.expire_time).toDate() <= moment().toDate()
     || !sourceData.app.parish_id
  ),
  target: attach({
    effect: fetchParishesFiltersFx,
    mapParams: (params) => ({ key: params.user.defaultParish }),
  }),
});

export const getUserParishesFx = guard({
  clock: $user,
  source: $user,
  filter: () => true,
  target: attach({
    effect: fetchParishesFiltersFx,
    mapParams: (params) => ({ key: [...params.parishes, params.defaultParish] || [] }),
  }),
});

sample({
  clock: getDefaultParishFx.doneData,
  fn: (clockData) => clockData[0].id,
  target: changeParish,
});
