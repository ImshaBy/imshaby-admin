import { useStore } from 'effector-react';
import moment from 'moment';
import React from 'react';
import { useCookies } from 'react-cookie';
import { Route, RouteComponentProps } from 'react-router-dom';

import { $app } from '../models/app';
import LoginPage from '../pages/login';

interface IPrivateRoute {
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>,
  path: string;
}

const PrivateRoute = ({ component, path }: IPrivateRoute) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { parish_id, city_id, expire_time } = useStore($app);
  const [cookies] = useCookies(['access_token']);

  const expired = moment(expire_time).toDate() <= moment().toDate();
  if (parish_id && !expired && cookies.access_token) {
    return <Route component={(component)} path={path} exact />;
  }
  return <LoginPage />;
};

export default PrivateRoute;
