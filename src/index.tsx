import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router, Switch } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import { useGate, useStore } from 'effector-react';
import reportWebVitals from './reportWebVitals';
import history from './utils/history';

import LoginPage from './pages/login';
import LogoutPage from './pages/logout';
import SchedulePage from './pages/schedule';
import ParishPage from './pages/parish';

import { PrivateRoute } from './components/PrivateRoute';
import Snackbar from './components/snackbar';
import Loading from './components/loading';

import { $appInitialized, AppGate } from './models/app';
import './models/init';

import './styles/style.scss';

const App = () => {
  useGate(AppGate);
  const appInitialized = useStore($appInitialized);

  if (!appInitialized) return <Loading />;
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/logout" component={LogoutPage} />
        <PrivateRoute path="/schedule" component={SchedulePage} />
        <PrivateRoute path="/parish" component={ParishPage} />
        <PrivateRoute path="/" component={SchedulePage} />
      </Switch>
    </Router>
  );
};

ReactDOM.render(
  <ToastProvider
    autoDismiss
    autoDismissTimeout={6000}
    components={{ Toast: Snackbar }}
    placement="bottom-center"
  >
    <App />
  </ToastProvider>,
  document.querySelector('#root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
