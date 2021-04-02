import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";

import reportWebVitals from './reportWebVitals';
import history from "./utils/history";
import Loading from "./components/loading";
import PrivateRoute from "./components/PrivateRoute";
import Snackbar from "./components/snackbar";
import MainPage from "./pages/index";
import ParishPage from "./pages/parish";
import "./styles/style.scss"

import { useGate } from 'effector-react';
import { AppGate } from './models/app';
import './models/init';

const component = () => {
  return <>component</>
}

const App = () => {
  useGate(AppGate);

  return (
    <Router history={history}>
      <Switch>

        <PrivateRoute path="/schedule" component={ MainPage } />
        <PrivateRoute path="/parish" component={ ParishPage } />
        <PrivateRoute path="/" component={ MainPage } />
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
  document.querySelector('#root')
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
