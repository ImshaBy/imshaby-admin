import React, { useEffect, useState } from 'react';
import { useGate, useStore } from 'effector-react';
import { changeUser, LoginGate, $app } from '../models/app';
import SectionHeader from '../components/sectionHeader';
import Section from '../components/section';
import Header from '../components/header';

import {Auth} from '../utils/auth';

type QueryParams = {
  code?: string,
}

import qs from "qs";
import { useCookies } from 'react-cookie';

const LoginPage = () => {
  const app = useStore($app);
  const [cookies, setCookie] = useCookies();
  
  useGate(LoginGate);
  
  const auth = new Auth();
  const query: QueryParams = qs.parse(
    location.search, { ignoreQueryPrefix: true }
  );

  useEffect(() => {
    const setAccessToken = async (email_code: string) => {
      const access_token = await auth.getAccessToken(
        email_code,
      );
      if (access_token && access_token.token) {
        setCookie(
          'access_token',
          access_token.token,
          {
            path: '/',
            maxAge: 3600,
          }
        )
      }
    }

    if (query.code && !app.user) {
      setAccessToken(query.code);
    }

  }, [query.code])

  useEffect(() => {
    const getUserdata = async () => {
      const user =  await auth.getUserData(cookies.access_token || "");
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
    // Send magic link to the provided email
    await auth.sendMagicLink(event.target.email.value);
  };

  return (
    <>
      <Header />
      <Section
        header={
          <SectionHeader title={'Login Page'} />
        }
        content={
          <>
            <form onSubmit={handleSubmit}>
              <div className="input-container">
                <label>Email </label>
                <input type="text" name="email" required />
              </div>
              <div className="button-container">
                <input type="submit" />
              </div>
            </form>
          </>
        }
      />
    </>
  );
};

export default LoginPage;
