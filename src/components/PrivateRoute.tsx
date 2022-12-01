import React from 'react';
import moment from 'moment';

import { useStore } from 'effector-react';
import { Route } from 'react-router-dom';
import { $app } from '../models/app';
import LoginPage from '../pages/login';

interface IPrivateRoute {
  component: React.ComponentType,
  path: string;
}

const PrivateRoute = ({ component, path }: IPrivateRoute) => {
  const { parish_id, city_id, expire_time } = useStore($app);
  const expired = moment(expire_time).toDate() <= moment().toDate();
  if (parish_id && city_id && !expired) {
    return <Route component={(component)} path={path} exact />;
  }
  return <LoginPage />;
};

export default PrivateRoute;
