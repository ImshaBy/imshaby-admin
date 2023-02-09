import { useGate } from 'effector-react';
import React, { useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';

import Header from '../components/header';
import LoginForm from '../components/loginForm';
import Section from '../components/section';
import { LoginGate } from '../models/app';
import Auth from '../utils/auth';

const LoginPage = () => {
  useGate(LoginGate);
  const auth = new Auth();
  const [msg, setMsg] = useState('');
  const { addToast } = useToasts();

  const handleSubmit = async (event: any) => {
    // Prevent page reload
    event.preventDefault();
    setMsg('');

    // Send magic link to the provided email
    try {
      await auth.sendMagicLink(event.target.email.value);
      setMsg('Спасылка на ўваход адпраўлена на электронную пошту');
    } catch (err) {
      if (err instanceof Error) {
        setMsg(err.message);
      } else {
        setMsg('Невядомая памылка');
      }
    }
  };

  useEffect(() => {
    if (msg) addToast(msg);
  }, [msg]);

  return (
    <>
      <Header
        schedule={false}
        parish={false}
        select={false}
      />
      <div style={{ marginTop: 50 }}>
        <Section
          header={<></>}
          content={(
            <>
              <LoginForm onSubmit={handleSubmit} />
            </>
          )}
        />
      </div>
    </>
  );
};

export default LoginPage;
