import { useEvent } from 'effector-react';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { RouteComponentProps, useParams } from 'react-router-dom';

import {
  setExpireTime as _setExpireTime,
} from '../models/app';
import Auth from '../utils/auth';

const CallbackPage = ({ history }: RouteComponentProps) => {
  const auth = new Auth();
  // hooks
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setCookie] = useCookies();
  const setExpireTime = useEvent(_setExpireTime);
  const { code } = useParams<{ code: string }>();

  const setAccessToken = async (email_code: string) => {
    // Receive access token from FusionAuth
    // and set expire_time for cookie and local_storage
    const access_token = await auth.getAccessToken(
      email_code,
    );
    if (access_token && access_token.token) {
      const expire_time = moment().add(3600, 'second').toDate();
      setExpireTime(expire_time);
      setCookie(
        'access_token',
        access_token.token,
        {
          path: '/',
          expires: expire_time,
        },
      );
    }
  };

  useEffect(() => {
    if (code) {
      setAccessToken(code).then(() => history.push('/'));
    }
  }, [code]);

  return (
    <></>
  );
};

export default CallbackPage;
