import './style.scss';

import { createTheme, TextField as MuiTextField, ThemeProvider } from '@mui/material';
import React from 'react';

import useWindowSize from '../../utils/useWindowSize';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(183, 32, 37)',
    },
  },
});

interface Props {
  onSubmit: (event: any) => void;
}

const LoginForm = ({ onSubmit }: Props) => {
  const [width] = useWindowSize();
  const isMobile = width <= 767;

  return (
    <ThemeProvider theme={theme}>
      <div className="login_form_container">
        <form spellCheck="false" className="login" data-bitwarden-watching="1" onSubmit={onSubmit}>
          <span className="login__title">Уваход</span>
          <span className="login__subtitle">
            Уваход у панэль кіравання раскладам Імш парафіі адбываецца праз электронную пошту
          </span>
          <div className="email" data-validate="Valid email is required: ex@abc.xyz">
            <MuiTextField
              fullWidth
              className="email__input"
              variant="standard"
              name="email"
              placeholder="Электронная пошта"
            />
          </div>
          <div className="login__signin">
            <button type="submit" className="login__signin__btn btn">
              Выслаць спасылку на
              {' '}
              {isMobile ? 'эл. пошту' : 'электронную пошту'}
            </button>
            <span className="login__signin__help">
              Падтрымка:&nbsp;
              <a href="mailto:byimsha@gmail.com">
                byimsha@gmail.com
              </a>
            </span>
          </div>
        </form>
      </div>
    </ThemeProvider>
  );
};

export default LoginForm;
