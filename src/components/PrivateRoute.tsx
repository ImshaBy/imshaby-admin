import { useUnit } from 'effector-react';
import moment from 'moment';
import React from 'react';
import { useCookies } from 'react-cookie';

import { $app } from '../models/app';
import LoginPage from '../pages/login';

interface IPrivateRoute {
  element: React.ReactNode,
  path: string;
}

const PrivateRoute = ({ element, path }: IPrivateRoute) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { parish_id, city_id, expire_time } = useUnit($app);
  const [cookies] = useCookies(['access_token']);

  const expired = moment(expire_time).toDate() <= moment().toDate();
  if (parish_id && !expired && cookies.access_token) {
    return element;
  }
  return <LoginPage />;
};

export default PrivateRoute;
