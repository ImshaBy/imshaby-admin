import moment from 'moment';
import { Cookies } from 'react-cookie';

const cleanCookie = () => {
  const cookies = new Cookies();
  cookies.remove('access_token');

  return {
    parish_id: '',
    city_id: '',
    expire_time: moment().subtract(10, 'seconds').toDate(),
    is_login: false,
  };
};

export default cleanCookie;
