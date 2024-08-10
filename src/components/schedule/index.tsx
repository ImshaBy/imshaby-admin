import './style.scss';

import { useUnit } from 'effector-react';
import React from 'react';
import { $schedule } from '../../models/schedule';
import Loading from '../loading';
import CreateModal from '../modalCreate';
import CreateModalResult from '../modalCreate/result';
import TimeTable from '../timetable';
import { AddIcon } from '../icons';

interface props {
  isMobile?: boolean;
  massCreateOpen: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  pagination: () => JSX.Element;
  currentWeek: () => JSX.Element;
}

const Schedule = ({ isMobile, massCreateOpen, pagination, currentWeek }: props) => {
  const weekSchedule = useUnit($schedule);
  if (!weekSchedule) return <Loading />;
  return (
    <>
      <section className="schedule">
        {!isMobile && (
          <header className="schedule__header">
            <div className="schedule__add">
              <button type="button" className="schedule__btn btn" onClick={massCreateOpen}>
                Дадаць Імшу
                <AddIcon className="addIcon" />
              </button>
            </div>
            <div className="schedule__pagination">{pagination()}</div>
            {currentWeek()}
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
