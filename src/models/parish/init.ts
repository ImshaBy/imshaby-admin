import { sample, forward } from 'effector';
import {
  $parish, $parishes, changeParish, fetchParishesByCityIdFx, fetchParishFx, ParishGate, updateParish, updateParishFx,
} from './index';
import { $app } from '../app';
import { approveScheduleFx } from '../schedule';
import { changeCity } from '../city';

$parishes
  .on(fetchParishesByCityIdFx.doneData, (_, parishes) => parishes);
$parish
  .on(fetchParishFx.doneData, (_, parish) => parish);

$app
  .on(changeParish, (app, parish_id) => ({...app, parish_id}));

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

forward({
  from: changeCity,
  to: fetchParishesByCityIdFx
})
