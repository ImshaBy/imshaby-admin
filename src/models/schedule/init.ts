import { sample } from 'effector';
import {
  $schedule,
  $scheduleDate,
  approveSchedule,
  approveScheduleFx,
  fetchWeekSchedule,
  fetchWeekScheduleFx, updateScheduleDate,
} from './index';

import { $app } from '../app';
import { createMassFx, deleteMassFx, updateMassFx } from '../mass';

$schedule
  .on(fetchWeekScheduleFx.doneData, (_, schedule) => schedule);

$scheduleDate
  .on(updateScheduleDate, (state, payload) => payload);

sample({
  clock: [fetchWeekSchedule, updateMassFx.doneData, createMassFx.doneData, deleteMassFx.doneData, approveScheduleFx.doneData],
  source: {
    user: $app,
    scheduleDate: $scheduleDate,
  },
  fn: (params) => ({ parish_id: params.user.parish_id, date: params.scheduleDate }),
  target: fetchWeekScheduleFx,
});

sample({
  clock: approveSchedule,
  source: $app,
  fn: (user) => user.parish_id,
  target: approveScheduleFx,
});
