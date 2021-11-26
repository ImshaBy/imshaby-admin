import { createEffect, createEvent, createStore } from 'effector';
import { api } from '../app';
import { Mass, MassError, MassMode, Period } from './types';

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
  const res = await api?.get(`mass/${mass_id}`);
  if (!res?.data) return new Error('Getting Mass has been failed');
  return {
    ...res.data,
    id: mass_id,
  };
});

export const createMassFx = createEffect(async (mass: Mass | null) => {
  if (!mass) return;

  try {

    const { data } = await api?.post('mass', mass);
    return data
  }catch (e) {
    throw Error(e)
  }

});

export const updateMassFx = createEffect(async (mass: Mass | null) => {
  if (!mass) return;

  try {
    const { data } = await api?.put(`mass/${mass.id}`, mass);
    return data
  }catch (e) {
    throw Error(e)
  }
});

export const deleteMassFx = createEffect(async (params: { mass_id: string, period: Period }) => {
  const { mass_id, period } = params;
  const url = new URLSearchParams();
  if (period?.from) {
    url.append('from', period.from);
  }
  if (period?.to) {
    url.append('to', period.to);
  }

  const res = await api?.delete(`mass/${mass_id}?${url}`);
  if (!res?.data) return new Error('Deleting Mass has been failed');

  return res.data;
});
