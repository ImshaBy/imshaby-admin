import { forward } from 'effector';
import { fetchCitiesFx, $cities, changeCity } from './index';
import { LoginGate } from '../app';

$cities
  .on(fetchCitiesFx.doneData, (_, cities) => cities);

forward({
  from: LoginGate.open,
  to: fetchCitiesFx,
});

