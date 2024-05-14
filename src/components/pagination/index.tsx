import './style.scss';

import { endOfWeek, startOfWeek } from 'date-fns';
import { format, addDays, subDays } from 'date-fns';
import { be } from 'date-fns/locale';
import { useEffect, useState } from 'react';

import { WeekSchedule } from '../../models/schedule/types';
import { LeftArrowIcon, RightArrowIcon } from '../icons';
import Loading from '../loading';

interface props {
  schedule: WeekSchedule;
  changeDate: (date: Date) => void;
  isCurrentWeek: boolean;
}

const Pagination = ({ schedule, changeDate, isCurrentWeek }: props) => {
  const [startPeriod, setStartPeriod] = useState<Date>(new Date());
  const [endPeriod, setEndPeriod] = useState<Date>(new Date());

  useEffect(() => {
    setStartPeriod(startOfWeek(schedule.startWeekDate, { weekStartsOn: 1 }));
    setEndPeriod(endOfWeek(schedule.startWeekDate, { weekStartsOn: 1 }));
  }, [schedule]);

  const handlePrevWeek = () => changeDate(subDays(startPeriod, 7));
  const handleNextWeek = () => changeDate(addDays(endPeriod, 1));

  if (!schedule) return <Loading />;
  return (
    <section className="pagination">
      <button className="pagination__left" onClick={handlePrevWeek} type="button" disabled={isCurrentWeek}>
        <LeftArrowIcon className="pagination__icon" />
      </button>
      {!!schedule.startWeekDate && (
        <>
          <span className="pagination__date">
            {format(startPeriod, 'd')} - {format(endPeriod, 'dd MMMM', { locale: be })}
          </span>
        </>
      )}
      <button className="pagination__right" onClick={handleNextWeek} type="button">
        <RightArrowIcon className="pagination__icon" />
      </button>
    </section>
  );
};

export default Pagination;
