import { startOfWeek, format, parse } from 'date-fns';
import { createEffect, createEvent, createStore } from 'effector';

import MassAPI from '../../common/api/massAPI';
import ParishAPI from '../../common/api/parishAPI';
import { ScheduleResponse, WeekSchedule } from './types';

export const $schedule = createStore<WeekSchedule | null>(null);
export const $scheduleDate = createStore<Date>(startOfWeek(new Date(), { weekStartsOn: 1 }));

export const updateScheduleDate = createEvent<Date>();
export const fetchWeekSchedule = createEvent();
export const approveSchedule = createEvent();

export const fetchWeekScheduleFx = createEffect(
  async (params: { parish_id: string, date: Date }) => {
    const date = format(params.date, 'dd-MM-yyyy');

    const res = await MassAPI.getWeekSchedule(params.parish_id, date);

    if (!res?.data) throw new Error('Week schedule not found');

    const weekSchedule = { ...res.data };
    weekSchedule.startWeekDate = parse(weekSchedule.startWeekDate || '', 'MM/dd/yyyy', new Date());
    weekSchedule.schedule = weekSchedule.schedule?.map((i: ScheduleResponse) => ({ ...i, date: parse(i.date || '', 'MM/dd/yyyy', new Date()) }));
    return weekSchedule;
  },
);

export const approveScheduleFx = createEffect(async (parish_id: string) => {
  const res = await ParishAPI.update(parish_id, {});

  if (!res?.data) throw new Error('Approve schedule has been failed');

  return res.data;
});
