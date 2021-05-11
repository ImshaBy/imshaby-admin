import { attach, forward, guard } from 'effector';
import {
  $mass, $massDeleted,
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
import { $user } from '../auth';
import { $parish } from '../parish';

$mass
  .on(createMassFx.doneData, (state, payload) => payload)
  .on(getMassFx.doneData, (state, payload) => payload)
  .on(updateMassStore, (state, payload) => (payload || state))
  .reset([resetMass]);

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
      user: $user,
      parish: $parish,
    },
    mapParams: (params, data) => ({
      ...data.mass,
      parishId: data.user.parish_id,
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
      user: $user,
      parish: $parish,
    },
    mapParams: (params, data) => ({
      ...data.mass,
      parishId: data.user.parish_id,
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
