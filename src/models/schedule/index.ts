import axios from 'axios';
import { startOfWeek } from 'date-fns';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import { createEffect, createEvent, createStore } from 'effector';

import { ScheduleResponse, WeekSchedule } from './types';

const { REACT_APP_API_URL } = process.env;

export const $schedule = createStore<WeekSchedule | null>(null);
export const $scheduleDate = createStore<Date>(startOfWeek(new Date(), { weekStartsOn: 1 }));

export const updateScheduleDate = createEvent<Date>();
export const fetchWeekSchedule = createEvent();
export const approveSchedule = createEvent();

export const fetchWeekScheduleFx = createEffect(
  async (params: { parish_id: string, date: Date }) => {
    const date = format(params.date, 'dd-MM-yyyy');

    const res = await axios.get(`${REACT_APP_API_URL}mass/week?parishId=${params.parish_id}&date=${date}`);

    if (!res?.data) throw new Error('Week schedule not found');

    const weekSchedule = { ...res.data };
    weekSchedule.startWeekDate = parse(weekSchedule.startWeekDate, 'MM/dd/yyyy', new Date());
    weekSchedule.schedule = weekSchedule.schedule?.map((i: ScheduleResponse) => ({ ...i, date: parse(i.date, 'MM/dd/yyyy', new Date()) }));
    return weekSchedule;
  },
);

export const approveScheduleFx = createEffect(async (parish_id: string) => {
  const res = await axios.put(`${REACT_APP_API_URL}mass?parishId=${parish_id}`, {});

  if (!res?.data) throw new Error('Approve schedule has been failed');

  return res.data;
});
