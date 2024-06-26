import './style.scss';

import { startOfWeek } from 'date-fns';
import { compareDesc } from 'date-fns';
import { useUnit } from 'effector-react';
import React, { useEffect, useState } from 'react';

import { changeMassMode, resetMass } from '../../models/mass';
import { MassMode } from '../../models/mass/types';
import { $schedule, fetchWeekSchedule, updateScheduleDate } from '../../models/schedule';
import Loading from '../loading';
import CreateModal from '../modalCreate';
import CreateModalResult from '../modalCreate/result';
import Pagination from '../pagination';
import TimeTable from '../timetable';

const Schedule = () => {
  const [isCurrentWeek, setCurrentWeek] = useState<boolean>(false);
  const weekSchedule = useUnit($schedule);

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
            <button type="button" className="schedule__btn btn" onClick={handleMassCreateOpen}>Дадаць Імшу</button>
          </div>
          <div className="schedule__pagination">
            <Pagination
              schedule={weekSchedule}
              changeDate={handleChangeDate}
              isCurrentWeek={isCurrentWeek}
            />
          </div>
          <div className="schedule__currentWeek">
            <button type="button" className="btn btn-empty" onClick={() => handleChangeDate(startOfWeek(new Date(), { weekStartsOn: 1 }))} disabled={isCurrentWeek}>
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
