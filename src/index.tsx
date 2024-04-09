/* eslint-disable import/no-extraneous-dependencies */
import './models/init';
import './styles/style.scss';

import * as Sentry from '@sentry/react';
import { useGate } from 'effector-react';
import { createRoot } from 'react-dom/client';
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import AppToaster from './components/toaster';
import { AppGate } from './models/app';
import CallbackPage from './pages/callback';
import ParishPage from './pages/parish';
import SchedulePage from './pages/schedule';
import SelectPage from './pages/select';
import reportWebVitals from './reportWebVitals';

const { VITE_SENTRY_DSN } = import.meta.env;

if (VITE_SENTRY_DSN) {
  Sentry.init({
    dsn: VITE_SENTRY_DSN,
    integrations: [new Sentry.BrowserTracing()],
    // Performance Monitoring
    tracesSampleRate: 0.6, // Capture 100% of the transactions, reduce in production!
  });
}

const App = () => {
  useGate(AppGate);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={ <Navigate to="/schedule" /> }/>
          <Route path="/select" element={<PrivateRoute path="/select" element={<SelectPage/>} />} />
          <Route path="/schedule" element={<PrivateRoute path="/schedule" element={<SchedulePage />} />} />
          <Route path="/parish" element={<PrivateRoute path="/parish" element={<ParishPage />} />} />
          <Route path="/callback" element={<CallbackPage />} />
        </Routes>
      </Router>
      <AppToaster />
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!  );
root.render(
  <CookiesProvider>
    <App />
  </CookiesProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
