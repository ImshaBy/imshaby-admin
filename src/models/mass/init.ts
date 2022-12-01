import { attach, forward, guard } from 'effector';
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
import { $parish } from '../parish';

$mass
  .on(createMassFx.doneData, (state, payload) => payload)
  .on(getMassFx.doneData, (state, payload) => payload)
  .on(updateMassStore, (state, payload) => (payload || state))
  .reset([resetMass]);

$massError
  .on([createMassFx.doneData, changeMassMode], (state, payload) => ({
    error: false,
    message: '',
  }))
  .on([createMassFx.fail, updateMassFx.fail], (state,payload) => ({
    error: true,
    message: 'Імша на гэты час ужо ёсць у раскладзе.'
  }));

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
guard({
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
guard({
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

forward({
  from: editMass,
  to: getMassFx,
});

forward({
  from: deleteMass,
  to: deleteMassFx,
});
