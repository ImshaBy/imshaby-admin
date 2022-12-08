import React, { useEffect } from 'react';

import moment from 'moment';
import { Auth } from '../utils/auth';
import {
  setExpireTime as _setExpireTime,
  $app,
} from '../models/app';

import { useCookies } from 'react-cookie';
import { useEvent, useStore } from 'effector-react';
import { useParams, RouteComponentProps } from 'react-router-dom';

const CallbackPage = ({history}: RouteComponentProps) => {
  const auth = new Auth();
  // hooks
  const [_, setCookie] = useCookies();
  const setExpireTime = useEvent(_setExpireTime);
  const { code } = useParams<{code: string}>();
  const app = useStore($app);

  useEffect(() => {
    const setAccessToken = async (email_code: string) => {
      const [access_token, error] = await auth.getAccessToken(
        email_code,
      );
      if (error) return;
      if (access_token && access_token.token) {
        const expire_time = moment().add(3600, 'second').toDate();
        setExpireTime(expire_time);
        setCookie(
          'access_token',
          access_token.token,
          {
            path: '/',
            expires: expire_time,
          }
        );
      }
    }

    if (code) {
      setAccessToken(code)
    }
    history.push('/')
  }, [code])

  return (
    <></>
  )
}

export default CallbackPage;
