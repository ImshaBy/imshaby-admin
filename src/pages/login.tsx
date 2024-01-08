import { useGate } from 'effector-react';
import React, { useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';

import PasswordlessAPI from '../common/api/passwordlessAPI';
import Header from '../components/header';
import LoginForm from '../components/loginForm';
import Section from '../components/section';
import { LoginGate } from '../models/app';

const LoginPage = () => {
  useGate(LoginGate);
  const [msg, setMsg] = useState('');
  const { addToast } = useToasts();

  const handleSubmit = async (email: string) => {
    setMsg('');

    // Send magic link to the provided email
    try {
      await PasswordlessAPI.start(email);
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
