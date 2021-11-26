import { forward } from 'effector';
import {
  AppGate, createApiClientFx, $apiClientReady, $auth0ClientReady, $tokenReady,
} from '.';
import { createAuthClientFx, fetchTokenFx, fetchUserFx } from '../auth';

$apiClientReady.on(createApiClientFx.doneData, () => true);
$auth0ClientReady.on(createAuthClientFx.doneData, () => true);
$tokenReady.on(fetchTokenFx.doneData, (state, token) => !!token?.length);

forward({
  from: AppGate.open,
  to: createAuthClientFx,
});

forward({
  from: createAuthClientFx.doneData,
  to: fetchTokenFx,
});

forward({
  from: fetchTokenFx.doneData,
  to: createApiClientFx,
});

forward({
  from: fetchTokenFx.doneData,
  to: fetchUserFx,
});