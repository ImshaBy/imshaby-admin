import React, { useEffect, useState } from 'react';
import { useGate, useUnit } from 'effector-react';

import { compareDesc, startOfWeek } from 'date-fns';
import Header from '../components/header';
import Loading from '../components/loading';
import Parish from '../components/parish';
import Schedule from '../components/schedule';
import Section from '../components/section';
import SectionHeader from '../components/sectionHeader';
import Pagination from '../components/pagination';
import { $parish, ParishGate } from '../models/parish';
import { $schedule, fetchWeekSchedule, updateScheduleDate } from '../models/schedule';
import { logout } from '../models/app';
import { changeMassMode, resetMass } from '../models/mass';
import { MassMode } from '../models/mass/types';
import useWindowSize from '../utils/useWindowSize';

const SchedulePage = () => {
  const parish = useUnit($parish);
  const weekSchedule = useUnit($schedule);
  const [width] = useWindowSize();
  const isMobile = width <= 767;
  useGate(ParishGate);

  const [isCurrentWeek, setCurrentWeek] = useState<boolean>(false);

  useEffect(() => {
    fetchWeekSchedule();
  }, []);

  useEffect(() => {
    if (!weekSchedule) return;
    setCurrentWeek(compareDesc(new Date(), weekSchedule.startWeekDate) < 0);
  }, [weekSchedule]);

  const handleMassCreateOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    resetMass();
    changeMassMode(MassMode.CREATE);
  };

  const handleChangeDate = (date: Date) => {
    updateScheduleDate(date);
    fetchWeekSchedule();
  };

  if (!parish || !weekSchedule) return <Loading />;

  const WeekPagination = (): JSX.Element => (
    <Pagination
      schedule={weekSchedule}
      changeDate={handleChangeDate}
      isCurrentWeek={isCurrentWeek}
    />
  );

  const CurrentWeek = (isMobile?: boolean): JSX.Element => (
    <div className="current__week">
      <button
        type="button"
        className="btn btn-empty"
        onClick={() => handleChangeDate(startOfWeek(new Date(), { weekStartsOn: 1 }))}
        disabled={isCurrentWeek}
      >
        Бягучы {!isMobile && 'тыдзень'}
      </button>
    </div>
  );

  return (
    <>
      <Header />
      <Section
        header={<SectionHeader title={parish.name} logout={logout} />}
        content={<Parish />}
        config={{
          mobileHeader: false,
        }}
      />
      <Section
        header={
          <SectionHeader
            title="Расклад на тыдзень"
            massCreateOpen={isMobile ? handleMassCreateOpen : undefined}
            pagination={WeekPagination}
            currentWeek={() => CurrentWeek(true)}
          />
        }
        content={
          <Schedule
            isMobile={!!isMobile}
            massCreateOpen={handleMassCreateOpen}
            pagination={WeekPagination}
            currentWeek={CurrentWeek}
          />
        }
      />
    </>
  );
};

export default SchedulePage;
