import moment from 'moment';

import { $app, logout, changeUser, $appLocalStorage, setExpireTime } from './index';
import { changeCity } from '../city';
import { changeParish } from '../parish';
import { Cookies } from 'react-cookie';

const cleanCookie = () => {
  const cookies = new Cookies();
  cookies.remove('access_token');
    
  return {
    parish_id: '',
    city_id: '',
    user: null,
    expire_time: moment().subtract(10, 'seconds').toDate(),
  }
}

$app
  .on(changeCity, (app, city_id) => ({ ...app, city_id }))
  .on(changeParish, (app, parish_id) => ({ ...app, parish_id }))
  .on(changeUser, (app, user) => ({...app, parish_id: user?.user?.data?.defaultParish, city_id: user?.user?.data?.city, user}))
  .on(setExpireTime, (app, expire_time) => ({...app, expire_time}))
  .on(logout, () => cleanCookie());

$app.watch($appLocalStorage);
