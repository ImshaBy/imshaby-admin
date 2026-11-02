import { format, fromUnixTime, isValid } from 'date-fns';
import { attach, sample } from 'effector';

import { $parish } from '../parish';
import {
  $mass,
  $massDeleted,
  $massError,
  $massMode,
  $massUpdated,
  changeMassMode,
  createMassFx,
  deleteMass,
  deleteMassFx,
  editMass,
  getMassFx,
  resetMass,
  resetMassDeleted,
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
  [7, 'нядзелю'],
  [0, 'нядзелю'],
]);

$mass
  .on(createMassFx.doneData, (state, payload) => payload)
  .on(getMassFx.doneData, (state, payload) => payload)
  .on(updateMassStore, (state, payload) => payload || state)
  .reset([resetMass]);

$massError
  .on([createMassFx.doneData, changeMassMode], () => ({
    error: false,
    message: '',
    massLink: '',
    errorDay: null,
    existingMass: null,
  }))
  .on([createMassFx.fail, updateMassFx.fail], (_, { error }) => {
    let message = 'Не ўдалося захаваць Імшу. Паспрабуйце яшчэ раз.';
    let errorDay: number | null = null;
    let massLink = '';
    let existingMass = null;
    const errors = error?.response?.data?.errors;
    const conflict = Array.isArray(errors)
      ? errors.find((item) => item?.code === 'MASS.011' && item?.payload?.duplicateMass)
      : undefined;
    const duplicateMass = conflict?.payload?.duplicateMass;

    if (duplicateMass && typeof duplicateMass === 'object') {
      message = 'Імша на гэты час ужо ёсць у раскладзе. Абярыце іншы час ці дзень.';
      existingMass = typeof duplicateMass.id === 'string' ? duplicateMass.id : null;
      let schedule = '';
      const timestamp = duplicateMass.singleStartTimestamp;
      if (typeof timestamp === 'number' && Number.isFinite(timestamp) && timestamp > 0) {
        const date = fromUnixTime(timestamp);
        if (isValid(date)) {
          errorDay = date.getDay() || 7;
          schedule = `${format(date, 'dd.MM.yyyy')} на ${format(date, 'HH:mm')}`;
          message = `Адзінкавая Імша ${schedule} ужо ёсць у раскладзе. Абярыце іншы час ці дзень.`;
        }
      } else if (Array.isArray(duplicateMass.days)) {
        const weekDay = duplicateMass.days[0];
        const time = duplicateMass.time;
        if (days.has(weekDay) && typeof time === 'string' && /^([01]\d|2[0-3]):[0-5]\d$/.test(time)) {
          errorDay = weekDay || 7;
          schedule = `на ${time}`;
          message = `Імша ${schedule} ужо ёсць у раскладзе ў ${days.get(weekDay)}. Абярыце іншы час ці дзень.`;
        }
      }
      if (existingMass) {
        massLink = `Змяніць існуючую Імшу${schedule ? ` ${schedule}` : ''}`;
      }
    }
    return {
      error: true,
      message,
      massLink,
      errorDay,
      existingMass,
    };
  });

$massMode.on(changeMassMode, (state, payload) => payload).reset([resetMassMode]);

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
