import React, { useEffect, useState } from 'react';
import { useGate, useStore } from 'effector-react';
import { changeUser, LoginGate, $app } from '../models/app';
import SectionHeader from '../components/sectionHeader';
import Section from '../components/section';
import Header from '../components/header';

import LoginForm from '../components/loginForm';
import {Auth} from '../utils/auth';
import { useCookies } from 'react-cookie';


const LoginPage = () => {
  const app = useStore($app);
  const [cookies, _] = useCookies();
  const [msg, setMsg] = useState('');
  const [isError, setIsError] = useState(false);
  
  useGate(LoginGate);
  
  const auth = new Auth();

  useEffect(() => {
    const getUserdata = async () => {
      const [user, error] =  await auth.getUserData(cookies.access_token || "");
      if (error)
        setIsError(true);
        setMsg(error);
        
      if (user) {
        changeUser(user);
      }
    }

    if (!app.user && cookies.access_token) {
      getUserdata();
    }
    
  }, [cookies])

  const handleSubmit = async (event: any) => {
    // Prevent page reload
    event.preventDefault();
    setIsError(false);
    setMsg('')
    // Send magic link to the provided email
    const [_, error] = await auth.sendMagicLink(event.target.email.value);
    if (error){
      setIsError(true);
      setMsg(error);
      return;
    }
    setMsg("Email sent successfully");
  };
  
  return (
    <>
      <Header />
      <Section
        header={
          <SectionHeader title={'Login Page'} />
        }
        content={
          <LoginForm onSubmit={handleSubmit} message={msg} isError={isError} />
        }
      />
    </>
  );
};

export default LoginPage;
