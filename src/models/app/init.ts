import {
  forward,
} from 'effector';

import { changeCity } from '../city';
import { changeParish } from '../parish';
import {
  $app, $appLocalStorage, $user, AppGate, fetchUserFx, LoginGate, logout, SelectGate, setExpireTime,
} from './index';
import cleanCookie from './utils';

$app
  .on(changeCity, (app, city_id) => ({ ...app, city_id }))
  .on(changeParish, (app, parish_id) => ({ ...app, parish_id }))
  .on(setExpireTime, (app, expire_time) => ({ ...app, expire_time }))
  .on(logout, () => cleanCookie());

$app.watch($appLocalStorage);

$user
  .on(fetchUserFx.doneData, (state, payload) => {
    const defaultParish = payload.user?.data?.defaultParish;
    const parishes = Object.values<string>(payload.user?.data?.parishes || {});

    return { ...state, defaultParish, parishes };
  });

forward({
  from: [AppGate.open, LoginGate.open, SelectGate.open],
  to: fetchUserFx,
});
