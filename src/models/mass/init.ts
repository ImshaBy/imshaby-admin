import { format, fromUnixTime, parse } from 'date-fns';
import { be } from 'date-fns/locale';
import { attach, sample } from 'effector';

import { $parish } from '../parish';
import {
  $mass, $massDeleted, $massError,
  $massMode,
  $massUpdated,
  changeMassMode,
  createMassFx, deleteMass, deleteMassFx, editMass,
  getMassFx,
  resetMass, resetMassDeleted,
  resetMassMode,
  resetMassUpdated,
  saveMass,
  updateMassFx,
  updateMassStore,
} from './index';
import { MassMode } from './types';

const days = new Map([
  [1, 'панядзелак'],
  [2, 'аўторак'],
  [3, 'сераду'],
  [4, 'чацвер'],
  [5, 'пятніцу'],
  [6, 'суботу'],
  [0, 'нядзелю'],
]);

$mass
  .on(createMassFx.doneData, (state, payload) => payload)
  .on(getMassFx.doneData, (state, payload) => payload)
  .on(updateMassStore, (state, payload) => (payload || state))
  .reset([resetMass]);

$massError
  .on([createMassFx.doneData, changeMassMode], () => ({
    error: false,
    message: '',
  }))
  .on([createMassFx.fail, updateMassFx.fail], (_, { params, error }) => {
    let message = 'Імша на гэты час ужо ёсць у раскладзе.';
    if (error && error.response) {
      const { data } = error.response;
      const { payload } = data.errors[0];
      let day = new Date();
      if (payload.duplicateMass && params && !params.days) {
        day = fromUnixTime(params.singleStartTimestamp || 0);
      } else if (payload.duplicateMass && params && params.days) {
        day = parse(`${payload.duplicateMass.startDate} ${payload.duplicateMass.time}` || '', 'MM/dd/yyyy HH:mm', new Date());
        day = (day >= new Date()) ? day : new Date();
        const distance = (payload.duplicateMass.days[0] + 7 - day.getDay()) % 7;
        day.setDate(day.getDate() + distance);
      }
      message = `Імша на ${format(day, 'H:mm', { locale: be })} ужо ёсць у раскладзе ў ${days.get(day.getDay())} ${format(day, 'dd MMMM yyyy года', { locale: be })}. Абярыце іншы час ці дзень.`;
    }
    return {
      error: true,
      message,
    };
  });

$massMode
  .on(changeMassMode, (state, payload) => payload)
  .reset([resetMassMode]);

$massUpdated
  .on(createMassFx.doneData, () => true)
  .on(updateMassFx.doneData, () => true)
  .on(resetMassUpdated, () => false);

$massDeleted
  .on(deleteMassFx.doneData, () => true)
  .on(resetMassDeleted, () => false)
  .reset([deleteMass]);

// create mass
sample({
  source: saveMass,
  filter: $massMode.map((mode) => mode === MassMode.CREATE),
  target: attach({
    source: {
      mass: $mass,
      parish: $parish,
    },
    mapParams: (_, data) => ({
      ...data.mass,
      parishId: data.parish?.id,
      cityId: data.parish?.cityId,
    }),
    effect: createMassFx,
  }),
});

// edit mass
sample({
  source: saveMass,
  filter: $massMode.map((x) => x === MassMode.EDIT),
  target: attach({
    source: {
      mass: $mass,
      parish: $parish,
    },
    mapParams: (_, data) => ({
      ...data.mass,
      parishId: data.parish?.id,
      cityId: data.parish?.cityId,
    }),
    effect: updateMassFx,
  }),
});

sample({
  source: editMass,
  target: getMassFx,
});

sample({
  source: deleteMass,
  target: deleteMassFx,
});
