import { createEffect, createEvent, createStore } from 'effector';

import MassAPI from '../../common/api/massAPI';
import {
  Mass, MassError, MassMode, Period,
} from './types';

export const $mass = createStore<Mass | null>(null);
export const $massError = createStore<MassError>({ error: false });
export const $massMode = createStore<MassMode>(MassMode.HIDDEN);
export const $massUpdated = createStore<boolean>(false);
export const $massDeleted = createStore<boolean>(false);

export const saveMass = createEvent();
export const editMass = createEvent<string>();
export const deleteMass = createEvent<{ mass_id: string, period: Period }>();
export const changeMassMode = createEvent<MassMode>();
export const updateMassStore = createEvent<Mass>();
export const resetMass = createEvent();
export const resetMassUpdated = createEvent<boolean>();
export const resetMassDeleted = createEvent<boolean>();
export const resetMassMode = createEvent();

export const getMassFx = createEffect(async (mass_id: string) => {
  const res = await MassAPI.get(mass_id);
  if (!res?.data) return new Error('Getting Mass has been failed');
  return {
    ...res.data,
    id: mass_id,
  };
});

export const createMassFx = createEffect(async (mass: Mass | null) => {
  if (!mass) return {};

  try {
    const { data } = await MassAPI.create(mass);
    return data;
  } catch (e) {
    throw Error('not possible to create mass due to server error!');
  }
});

export const updateMassFx = createEffect(async (mass: Mass | null) => {
  if (!mass) return {};

  try {
    const { data } = await MassAPI.update(mass);
    return data;
  } catch (e) {
    throw Error('Not possible to update mass due to server error');
  }
});

export const deleteMassFx = createEffect(async (params: { mass_id: string, period: Period }) => {
  const { mass_id, period } = params;

  const res = await MassAPI.delete(mass_id, period);
  if (!res?.data) return new Error('Deleting Mass has been failed');

  return res.data;
});
