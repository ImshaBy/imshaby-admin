import React, { useState, useEffect } from 'react';
import { useStore } from 'effector-react';
import compareDesc from 'date-fns/compareDesc';
import { startOfWeek } from 'date-fns';

import Pagination from '../pagination';
import Loading from '../loading';
import TimeTable from '../timetable';
import CreateModal from '../modalCreate';
import CreateModalResult from '../modalCreate/result';

import { $schedule, fetchWeekSchedule, updateScheduleDate } from '../../models/schedule';
import { changeMassMode, resetMass } from '../../models/mass';
import { MassMode } from '../../models/mass/types';

import './style.scss';

const Schedule = () => {
  const [isCurrentWeek, setCurrentWeek] = useState<boolean>(false);
  const weekSchedule = useStore($schedule);

  useEffect(() => {
    fetchWeekSchedule();
  }, []);

  useEffect(() => {
    if (!weekSchedule) return;
    setCurrentWeek(compareDesc(new Date(), weekSchedule.startWeekDate) < 0);
  }, [weekSchedule]);

  const handleChangeDate = (date: Date) => {
    updateScheduleDate(date);
    fetchWeekSchedule();
  };

  const handleMassCreateOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    resetMass();
    changeMassMode(MassMode.CREATE);
  };

  if (!weekSchedule) return <Loading />;
  return (
    <>
      <section className="schedule">
        <header className="schedule__header">
          <div className="schedule__add">
            <button className="schedule__btn btn" onClick={handleMassCreateOpen}>Дадаць Імшу</button>
          </div>
          <div className="schedule__pagination">
            <Pagination schedule={weekSchedule} changeDate={handleChangeDate} isCurrentWeek={isCurrentWeek} />
          </div>
          <div className="schedule__currentWeek">
            <button className="btn btn-empty" onClick={() => handleChangeDate(startOfWeek(new Date(), { weekStartsOn: 1 }))} disabled={isCurrentWeek}>
              Бягучы тыдзень
            </button>
          </div>
        </header>

        <section className="schedule__content">
          <TimeTable schedule={weekSchedule.schedule} />
        </section>
      </section>

      <CreateModal />
      <CreateModalResult />
    </>
  );
};

export default Schedule;
