import {
  sample,
} from 'effector';

import { changeCity } from '../city';
import { changeParish, ParishGate } from '../parish';
import {
  $app, $appLocalStorage, $user, AppGate, fetchUserFx, LoginGate, logout, SelectGate, setExpireTime,
} from './index';
import cleanCookie from './utils';
import { App } from './types';

$app
  .on(changeCity, (app: App, city_id) => ({ ...app, city_id }))
  .on(changeParish, (app, parish_id) => ({ ...app, parish_id }))
  .on(setExpireTime, (app, expire_time) => ({ ...app, expire_time }))
  .on(fetchUserFx.doneData, (app) => ({...app, is_login: true}))
  .on(fetchUserFx.failData, (app) => ({...app, is_login: false}))
  .on(logout, () => cleanCookie());

$app.watch($appLocalStorage);

$user
  .on(fetchUserFx.doneData, (state, payload) => {
    const defaultParish = payload.user?.data?.defaultParish;
    const parishes = Object.values<string>(payload.user?.data?.parishes || {});

    return { ...state, defaultParish, parishes };
  });

sample({
  clock: [AppGate.open, LoginGate.open, SelectGate.open, ParishGate.open],
  target: fetchUserFx,
});
