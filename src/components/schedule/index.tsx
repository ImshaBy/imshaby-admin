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

interface props {
  isMobile?: boolean;
  massCreateOpen: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  pagination: () => JSX.Element;
}

const Schedule = ({ isMobile, massCreateOpen, pagination }: props) => {
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

  if (!weekSchedule) return <Loading />;
  return (
    <>
      <section className="schedule">
        {!isMobile && (
          <header className="schedule__header">
            <div className="schedule__add">
              <button type="button" className="schedule__btn btn" onClick={massCreateOpen}>
                Дадаць Імшу
              </button>
            </div>
            <div className="schedule__pagination">{pagination()}</div>
            <div className="schedule__currentWeek">
              <button
                type="button"
                className="btn btn-empty"
                onClick={() => handleChangeDate(startOfWeek(new Date(), { weekStartsOn: 1 }))}
                disabled={isCurrentWeek}
              >
                Бягучы тыдзень
              </button>
            </div>
          </header>
        )}
        <section className="schedule__content">
          <TimeTable weekSchedule={weekSchedule} />
        </section>
      </section>

      <CreateModal />
      <CreateModalResult />
    </>
  );
};

export default Schedule;
