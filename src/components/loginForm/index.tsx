import './style.scss';

import { createTheme, TextField as MuiTextField, ThemeProvider } from '@mui/material';
import React, { useEffect, useState } from 'react';

import useWindowSize from '../../utils/useWindowSize';
import { validateEmail } from '../../utils/validateData';

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
  const [email, setEmail] = useState('');
  const [correctEmail, setCorrectEmail] = useState<boolean>(true);

  useEffect(() => {
    setCorrectEmail(true);
  }, [email]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const inputEmail = event.target.email.value;
    if (validateEmail(inputEmail)) {
      setCorrectEmail(true);
      onSubmit(inputEmail);
    } else {
      setCorrectEmail(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="login_form_container">
        <form spellCheck="false" className="login" data-bitwarden-watching="1" onSubmit={handleSubmit}>
          <span className="login__title">Уваход</span>
          <span className="login__subtitle">
            Уваход у панэль кіравання раскладам Імш парафіі адбываецца праз электронную пошту
          </span>
          <div className="email" data-validate="Valid email is required: ex@abc.xyz">
            <MuiTextField
              fullWidth
              className={`email__input ${!correctEmail && 'email__input_error'}`}
              variant="standard"
              name="email"
              placeholder="Электронная пошта"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value.trim());
              }}
            />
            {!correctEmail && (
              <div className="email__error">
                {/* eslint-disable-next-line max-len */}
                Няправільны фармат электроннай пошты. Уводзьце электронную пошту, якую падалі адміністратарам.
              </div>
            )}
          </div>
          <div className="login__signin">
            <button type="submit" disabled={!correctEmail} className="login__signin__btn btn">
              Выслаць спасылку на {isMobile ? 'эл. пошту' : 'электронную пошту'}
            </button>
            <span className="login__signin__help">
              Падтрымка:&nbsp;
              <a href="mailto:byimsha@gmail.com">byimsha@gmail.com</a>
            </span>
          </div>
        </form>
      </div>
    </ThemeProvider>
  );
};

export default LoginForm;
