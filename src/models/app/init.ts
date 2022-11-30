import { $app, logout, changeUser } from './index';
import { changeCity } from '../city';
import { changeParish } from '../parish';
import { Cookies } from 'react-cookie';

$app
  .on(changeCity, (app, city_id) => ({ city_id, parish_id: app.parish_id }))
  .on(changeParish, (app, parish_id) => ({ parish_id, city_id: app.city_id }))
  .on(changeUser, (_, user) => ({parish_id: user?.user?.data?.parish, city_id: user?.user?.data?.city, user}))
  .on(logout, () => {  
    const cookies = new Cookies();
    cookies.remove('access_token');
    
    return {
      parish_id: '',
      city_id: '',
      user: null,
    }
  });

