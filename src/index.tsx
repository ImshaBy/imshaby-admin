import './models/init';
import './styles/style.scss';

import { useGate } from 'effector-react';
import React from 'react';
import { CookiesProvider } from 'react-cookie';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';

import PrivateRoute from './components/PrivateRoute';
import Snackbar from './components/snackbar';
import { AppGate } from './models/app';
import CallbackPage from './pages/callback';
import ParishPage from './pages/parish';
import SchedulePage from './pages/schedule';
import SelectPage from './pages/select';
import reportWebVitals from './reportWebVitals';

const App = () => {
  useGate(AppGate);

  return (
    <Router>
      <Switch>
        <Route path="/callback/:code" component={CallbackPage} />
        <PrivateRoute path="/select" component={SelectPage} />
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
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </ToastProvider>,
  document.querySelector('#root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
