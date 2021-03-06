import { sample } from 'effector';
import {
  $parish, fetchParishFx, ParishGate, updateParish, updateParishFx,
} from './index';
import { $user } from '../auth';
import { approveScheduleFx } from '../schedule';

$parish
  .on(fetchParishFx.doneData, (_, parish) => parish);

sample({
  clock: [ParishGate.open, approveScheduleFx.doneData],
  source: $user,
  fn: (params) => params.parish_id,
  target: fetchParishFx,
});

sample({
  clock: updateParish,
  source: $user,
  fn: (params, data) => ({ parish_id: params.parish_id, parish: data }),
  target: updateParishFx,
});
