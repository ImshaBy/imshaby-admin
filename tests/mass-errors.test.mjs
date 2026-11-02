import assert from 'node:assert/strict';
import { createServer as createHttpServer } from 'node:http';
import { after, test } from 'node:test';
import { allSettled, fork } from 'effector';
import { createServer } from 'vite';

// Use Vite's existing TS loader to exercise the real store without a new test dependency.
const server = await createServer({
  server: { middlewareMode: true, hmr: { server: createHttpServer() } },
  appType: 'custom',
});
after(() => server.close());
await server.ssrLoadModule('/src/models/mass/init.ts');
const { $massError, createMassFx, updateMassFx, changeMassMode } =
  await server.ssrLoadModule('/src/models/mass/index.ts');

const single = {
  id: 'single-mass-id',
  cityId: 'city-id',
  parishId: 'parish-id',
  langCode: 'беларуская',
  duration: 3600,
  time: null,
  days: null,
  online: false,
  rorate: false,
  deleted: false,
  notes: '',
  localizedInfo: {},
  singleStartTimestamp: 1762270200,
  startDate: null,
  endDate: null,
  periodic: false,
};
const periodic = {
  id: 'periodic-mass-id',
  days: [2],
  time: '18:30',
  startDate: '04/30/2025',
  singleStartTimestamp: 0,
  periodic: true,
};
const conflictError = (duplicateMass) => ({
  response: {
    status: 400,
    data: {
      errors: [{
        field: 'time',
        code: 'MASS.011',
        payload: { duplicateMass },
        message: 'not unique mass (see payload for details)',
      }],
    },
  },
});

async function fail(effect, params, error) {
  const scope = fork({ handlers: [[effect, () => { throw error; }]] });
  await allSettled(effect, { scope, params });
  return { scope, result: scope.getState($massError) };
}

for (const [effectName, effect] of [['create', createMassFx], ['update', updateMassFx]]) {
  for (const [name, edited] of [['single', single], ['periodic', periodic]]) {
    test(`${effectName}: ${name} conflicts with a single mass (nullable API fields)`, async () => {
      const { result } = await fail(effect, edited, conflictError(single));
      assert.deepEqual(result, {
        error: true,
        message: 'Адзінкавая Імша 04.11.2025 на 18:30 ужо ёсць у раскладзе. Абярыце іншы час ці дзень.',
        massLink: 'Змяніць існуючую Імшу 04.11.2025 на 18:30',
        errorDay: 2,
        existingMass: single.id,
      });
    });

    test(`${effectName}: ${name} conflicts with a periodic mass without startDate`, async () => {
      const { result } = await fail(effect, edited, conflictError({ ...periodic, startDate: null }));
      assert.deepEqual(result, {
        error: true,
        message: 'Імша на 18:30 ужо ёсць у раскладзе ў аўторак. Абярыце іншы час ці дзень.',
        massLink: 'Змяніць існуючую Імшу на 18:30',
        errorDay: 2,
        existingMass: periodic.id,
      });
    });
  }
}

test('Sunday uses the form weekday value 7 for Unix timestamps in seconds', async () => {
  const { result } = await fail(updateMassFx, periodic, conflictError({
    ...single,
    singleStartTimestamp: 1762097400,
  }));
  assert.equal(result.errorDay, 7);
  assert.match(result.message, /02\.11\.2025 на 18:30/);
});

for (const error of [
  new Error('Network Error'),
  {},
  { response: {} },
  { response: { data: null } },
  { response: { data: { errors: [] } } },
  { response: { data: { errors: {} } } },
  { response: { data: { errors: [null] } } },
  { response: { data: { errors: [{ code: 'MASS.011' }] } } },
  { response: { data: { errors: [{ code: 'OTHER', payload: { duplicateMass: single } }] } } },
  conflictError(null),
]) {
  test(`unexpected API error has a generic message: ${JSON.stringify(error)}`, async () => {
    const { result } = await fail(createMassFx, periodic, error);
    assert.deepEqual(result, {
      error: true,
      message: 'Не ўдалося захаваць Імшу. Паспрабуйце яшчэ раз.',
      massLink: '',
      errorDay: null,
      existingMass: null,
    });
  });
}

for (const duplicate of [
  {},
  { days: [], time: null },
  { days: [2], time: 'invalid' },
  { days: [9], time: '18:30' },
  { singleStartTimestamp: 1e20 },
  { singleStartTimestamp: 'invalid' },
]) {
  test(`incomplete duplicate does not throw: ${JSON.stringify(duplicate)}`, async () => {
    const { result } = await fail(updateMassFx, periodic, conflictError(duplicate));
    assert.equal(result.error, true);
    assert.match(result.message, /ужо ёсць у раскладзе/);
    assert.equal(result.existingMass, null);
    assert.equal(result.massLink, '');
  });
}

test('changing mass mode clears the previous conflict and its link', async () => {
  const { scope } = await fail(updateMassFx, periodic, conflictError(single));
  await allSettled(changeMassMode, { scope, params: 1 });
  assert.equal(scope.getState($massError).error, false);
  assert.equal(scope.getState($massError).existingMass, null);
});
