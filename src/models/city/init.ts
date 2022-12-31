import { forward } from 'effector';

import { LoginGate } from '../app';
import { $cities, fetchCitiesFx } from './index';

$cities
  .on(fetchCitiesFx.doneData, (_, cities) => cities);

forward({
  from: LoginGate.open,
  to: fetchCitiesFx,
});
