import { useEvent } from 'effector-react';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { RouteComponentProps, useLocation } from 'react-router-dom';

import PasswordlessAPI from '../common/api/passwordlessAPI';
import Header from '../components/header';
import Section from '../components/section';
import { setExpireTime as _setExpireTime } from '../models/app';

const CallbackPage = ({ history }: RouteComponentProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setCookie] = useCookies();
  const setExpireTime = useEvent(_setExpireTime);
  const { search } = useLocation();
  const code = new URLSearchParams(search).get('code');
  const [error, setError] = useState(false);

  const setAccessToken = async (email_code: string) => {
    // Receive access token from FusionAuth
    // and set expire_time for cookie and local_storage
    const access_token = await PasswordlessAPI.login(email_code);
    if (access_token) {
      const expire_time = moment().add(3600, 'second').toDate();
      setExpireTime(expire_time);
      setCookie('access_token', access_token, {
        path: '/',
        expires: expire_time,
      });
    }
  };

  useEffect(() => {
    if (code) {
      setAccessToken(code)
        .then(() => history.push('/'))
        .catch(() => {
          setError(true);
        });
    }
  }, [code]);

  return (
    <>
      <Header schedule={false} parish={false} select={false} />
      {error && (
        <div style={{ marginTop: 50 }}>
          <Section
            header={<></>}
            content={(
              <>
                <div>
                  Спасылка з пісьма пражыла 3 хвіліны і больш не працуе. Паўтарыце ўваход у сістэму.
                </div>
                <button style={{ marginTop: 25 }} type="submit" onClick={() => history.push('/')} className="btn">
                  Уваход
                </button>
              </>
            )}
          />
        </div>
      )}
    </>
  );
};

export default CallbackPage;
