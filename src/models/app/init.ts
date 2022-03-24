import { $app, $appLocalStorage, logout } from './index';
import { changeCity } from '../city';
import { changeParish } from '../parish';

$app
  .on(changeCity, (app, city_id) => ({ city_id, parish_id: app.parish_id }))
  .on(changeParish, (app, parish_id) => ({ parish_id, city_id: app.city_id }))
  .on(logout, (app, params) => ({ city_id: '', parish_id: '' }));
  // .reset(logout); => problem with updating $appLocalStorage

$app.watch($appLocalStorage);
