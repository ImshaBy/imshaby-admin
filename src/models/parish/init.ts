import { sample } from 'effector';

import { $app } from '../app';
import { changeCity } from '../city';
import { approveScheduleFx } from '../schedule';
import {
  $parish,
  $parishes,
  $selectParishes,
  changeParish,
  fetchParishesFiltersFx,
  fetchParishFx,
  getUserParishesFx,
  ParishGate,
  updateParish,
  updateParishFx,
} from './index';

$parishes
  .on(fetchParishesFiltersFx.doneData, (_, parishes) => parishes);
$parish
  .on(fetchParishFx.doneData, (_, parish) => parish);
$selectParishes
  .on(getUserParishesFx.doneData, (_, state) => state);

sample({
  clock: [changeParish, approveScheduleFx.doneData, ParishGate.open],
  source: $app,
  fn: (params) => params.parish_id,
  target: fetchParishFx,
});

sample({
  clock: updateParish,
  source: $parish,
  fn: (params, data) => ({ parish_id: params ? params.key : '', parish: data }),
  target: updateParishFx,
});

sample({
  clock: changeCity,
  fn: (cityId) => ({ cityId }),
  target: fetchParishesFiltersFx,
});
