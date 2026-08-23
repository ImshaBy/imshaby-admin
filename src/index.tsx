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

const { VITE_SENTRY_DSN, MODE } = import.meta.env;

// Куки с чувствительными значениями (токены, сессии) не отправляем в Sentry
const SENSITIVE_COOKIE = /token|session|auth|jwt|sid|secret|password/i;

const getCookieContext = () => {
  const cookies: Record<string, string> = {};
  for (const pair of document.cookie.split('; ')) {
    const eq = pair.indexOf('=');
    const name = eq === -1 ? pair : pair.slice(0, eq);
    const value = eq === -1 ? '' : pair.slice(eq + 1);
    cookies[name] = SENSITIVE_COOKIE.test(name) ? '[Filtered]' : value;
  }
  return cookies;
};

if (VITE_SENTRY_DSN) {
  Sentry.init({
    dsn: VITE_SENTRY_DSN,
    environment: MODE === 'production' ? 'production' : 'development',
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: true, // маскируем тексты полей (пароли, персданные)
        blockAllMedia: true,
      }),
    ],
    // Производительность
    tracesSampleRate: 0.6,
    // Session Replay: пишем 10% сессий + гарантированно записываем при ошибке
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    beforeSend(event) {
      // Параметры сети пользователя (Network Information API)
      const connection = (
        navigator as unknown as {
          connection?: { effectiveType?: string; downlink?: number; rtt?: number; saveData?: boolean };
        }
      ).connection;
      event.contexts = {
        ...event.contexts,
        network: connection
          ? {
              effectiveType: connection.effectiveType,
              downlink: connection.downlink,
              rtt: connection.rtt,
              saveData: connection.saveData,
            }
          : { available: false },
        cookies: getCookieContext(),
      };
      return event;
    },
  });
}

const App = () => {
  useGate(AppGate);

  return (
    <div>
      <Router>
        <Sentry.ErrorBoundary
          fallback={({ resetError }) => (
            <div style={{ padding: 40, textAlign: 'center' }}>
              <h2>Нешта пайшло не так</h2>
              <p>Памылка адпраўлена ў службу падтрымкі.</p>
              <button type="button" onClick={resetError}>
                Паўтарыць
              </button>
            </div>
          )}
        >
          <Routes>
            <Route path="/" element={ <Navigate to="/schedule" /> }/>
            <Route path="/select" element={<PrivateRoute path="/select" element={<SelectPage/>} />} />
            <Route path="/schedule" element={<PrivateRoute path="/schedule" element={<SchedulePage />} />} />
            <Route path="/parish" element={<PrivateRoute path="/parish" element={<ParishPage />} />} />
            <Route path="/callback" element={<CallbackPage />} />
          </Routes>
        </Sentry.ErrorBoundary>
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
