import React from 'react';
import { useStore } from 'effector-react';
import { Route } from 'react-router-dom';
import { $app } from '../models/app';
import LoginPage from '../pages/login';

interface IPrivateRoute {
  component: React.ComponentType,
  path: string;
}

const PrivateRoute = ({ component, path }: IPrivateRoute) => {
  const { parish_id, city_id } = useStore($app);

  if (parish_id && city_id) {
    return <Route component={(component)} path={path} exact />;
  }
  return <LoginPage />;
};

export default PrivateRoute;
