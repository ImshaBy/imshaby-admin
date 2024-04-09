/* eslint-disable no-param-reassign */
import { parse } from 'date-fns';
import {
  attach, combine, createEffect, createEvent, createStore, sample,
} from 'effector';
import { createGate } from 'effector-react';
import moment from 'moment';

import ParishAPI from '../../common/api/parishAPI';
import { $app, $user } from '../app';
import { Filters, Parish } from './types';

const DATE_MASK = 'dd-MM-yyyy HH:mm:ss';

export const ParishGate = createGate();
export const $parishes = createStore<Parish[]>([]);
export const $selectParishes = createStore<Parish[]>([]);
export const $parish = createStore<Parish | null>(null);
export const $userParishes = createStore<{ defaultParish: string, parishes: string[] }>({ defaultParish: '', parishes: [] });

export const changeParish = createEvent<string>();
export const updateParish = createEvent<Parish>();

export const fetchParishFx = createEffect(async (parish_id: string) => {
  const res = await ParishAPI.get(parish_id);

  if (!res?.data) throw new Error('Parish not found');

  const parish = { ...res.data };
  console.log(parish)
  parish.lastMassActualDate = parse(parish.lastMassActualDate || '', DATE_MASK, new Date());
  parish.lastModifiedDate = parse(parish.lastModifiedDate || '', DATE_MASK, new Date());
  return parish;
});

export const fetchParishesFiltersFx = createEffect(async (filters: Filters) => {
  const res = await ParishAPI.getAll(filters);

  if (!res?.data) throw new Error('Parishes not found by provided filters');
  const parishes: Parish[] = res.data.map((parish: any) => {
    parish.lastMassActualDate = parse(parish.lastMassActualDate || '', DATE_MASK, new Date());
    parish.lastModifiedDate = parse(parish.lastModifiedDate || '', DATE_MASK, new Date());
    return parish;
  });

  return parishes;
});

export const updateParishFx = createEffect(
  async (params: { parish_id: string, parish: Parish }) => {
    const { parish, parish_id } = params;
    const res = await ParishAPI.update(parish_id, parish);

    if (!res?.data) throw new Error('Parish not updated');

    return res.data;
  },
);

export const getDefaultParishFx = sample({
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

export const getUserParishesFx = sample({
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
