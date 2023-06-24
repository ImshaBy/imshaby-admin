import { sample } from 'effector';

import { createMassFx, deleteMassFx, updateMassFx } from '../mass';
import { $parish, fetchParishFx } from '../parish';
import {
  $schedule,
  $scheduleDate,
  approveSchedule,
  approveScheduleFx,
  fetchWeekSchedule,
  fetchWeekScheduleFx, updateScheduleDate,
} from './index';

$schedule
  .on(fetchWeekScheduleFx.doneData, (_, schedule) => schedule);

$scheduleDate
  .on(updateScheduleDate, (_, payload) => payload);

sample({
  clock: [
    fetchParishFx.doneData,
    fetchWeekSchedule,
    updateMassFx.doneData,
    createMassFx.doneData,
    deleteMassFx.doneData,
    approveScheduleFx.doneData,
  ],
  source: {
    parish: $parish,
    scheduleDate: $scheduleDate,
  },
  fn: (params) => ({ parish_id: params.parish ? params.parish.id : '', date: params.scheduleDate }),
  target: fetchWeekScheduleFx,
});

sample({
  clock: approveSchedule,
  source: $parish,
  fn: (parish) => (parish ? parish.id : ''),
  target: approveScheduleFx,
});
