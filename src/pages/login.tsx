import { useGate } from 'effector-react';
import { useEffect, useState } from 'react';

import PasswordlessAPI from '../common/api/passwordlessAPI';
import Header from '../components/header';
import LoginForm from '../components/loginForm';
import Section from '../components/section';
import { LoginGate } from '../models/app';
import toast from 'react-hot-toast';

const LoginPage = () => {
  useGate(LoginGate);
  const [msg, setMsg] = useState('');

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
    if (msg) toast(msg);
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
