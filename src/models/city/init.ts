import { sample } from 'effector';

import { LoginGate } from '../app';
import { $cities, fetchCitiesFx } from './index';

$cities
  .on(fetchCitiesFx.doneData, (_, cities) => cities);

sample(
  LoginGate.open,
  fetchCitiesFx,
);
