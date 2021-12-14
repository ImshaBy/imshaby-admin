import { forward } from 'effector';
import {
  $token, $user,
  fetchTokenFx, fetchUserFx, handleRedirectCallbackFx,
  LoginGate,
  loginWithRedirect,
  loginWithRedirectFx,
  logout,
  logoutFx, LogoutGate,
} from '.';

// $user
//   .on(fetchUserFx.doneData, (state, { parish_id }) => {
//     ({ ...state, parish_id })
//   } );

  $user.on(fetchUserFx.doneData, (_, user) => user);

$token
  .on(fetchTokenFx.doneData, (state, token) => token);

forward({
  from: [loginWithRedirect, fetchTokenFx.failData],
  to: [loginWithRedirectFx],
});

forward({
  from: logout,
  to: logoutFx,
});

forward({
  from: LogoutGate.open,
  to: logoutFx,
});

forward({
  from: LoginGate.open,
  to: handleRedirectCallbackFx,
});

handleRedirectCallbackFx.watch(((payload) => window.location.replace('/')));
