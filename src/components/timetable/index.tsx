import './style.scss';

import { setHours, setMinutes, setSeconds } from 'date-fns';
import { format, isToday, startOfWeek, startOfDay, addDays, isEqual, compareAsc } from 'date-fns';
import { be } from 'date-fns/locale';
import { useUnit } from 'effector-react';
import { useEffect, useMemo, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import { $massDeleted, deleteMass } from '../../models/mass';
import { Period } from '../../models/mass/types';
import { MassHours, MassHoursData, Schedule, WeekSchedule } from '../../models/schedule/types';
import DeleteModal from '../modalDelete';
import TimeTableLine from './components/timetableLine';
import toast from 'react-hot-toast';

interface props {
  weekSchedule: WeekSchedule;
}

const toastHelper = (mass: MassHoursData, period: Period | undefined, date: Date): string => {
  if (!mass.days?.length) {
    return `Адзінкавая Імша ${format(date, 'dd.MM.yyyy, eeeeee', { locale: be })}, ${
      mass.langCode
    }, выдалена з раскладу!`;
  }
  if (mass.days?.length && period?.from && period.to) {
    return `Сталая Імша ${format(date, 'HH:mm, eeeeee', { locale: be })}, ${
      mass.langCode
    }, выдалена з раскладу ${format(date, 'dd.MM.yyyy')}`;
  }
  if (mass.days?.length && !period?.from && !period?.to) {
    return `Сталая Імша ${format(date, 'HH:mm, eeeeee', { locale: be })}, ${mass.langCode}, выдалена з раскладу цалкам`;
  }
  return '';
};

const TimeTable = ({ weekSchedule }: props) => {
  const [selectedMass, setSelectedMass] = useState<MassHoursData | null>(null);
  const [period, setPeriod] = useState<Period>();
  const [visibleDelete, setVisibleDelete] = useState<boolean>(false);
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());
  const [tab, setTab] = useState<number>(0);
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const isTablet = useMediaQuery({ query: '(max-width: 812px)' });

  const isDeletedMass = useUnit($massDeleted);

  const mobileSchedule = useMemo(() => {
    if (isMobile || isTablet) {
      const startPeriod = startOfWeek(weekSchedule.startWeekDate, { weekStartsOn: 1 });
      let weekDays = [];
      for (let i = 0; i < 7; i++) {
        weekDays.push(addDays(startPeriod, i));
      }
      return weekDays.map((calendarDay) => {
        const foundDay = weekSchedule.schedule.find((existDay) => isEqual(existDay.date, calendarDay));
        return !foundDay || compareAsc(calendarDay, startOfDay(new Date())) < 0
          ? { date: calendarDay, isInaccessible: true }
          : foundDay;
      });
    }
    return [];
  }, [weekSchedule]);

  useEffect(() => {
    if (!selectedMass || !isDeletedMass) return;

    toast(toastHelper(selectedMass, period, selectedDay));
  }, [isDeletedMass]);

  useEffect(() => {
    if (isMobile || isTablet) {
      setTab(mobileSchedule.findIndex((day) => !day.isInaccessible));
    }
  }, [mobileSchedule]);

  const handleDeleteModalOpen = (massHoursData: MassHoursData, day: Schedule, massHours: MassHours) => {
    const [hour, minute] = massHours.hour.split(':');
    let date = setHours(day.date, Number(hour));
    date = setMinutes(date, Number(minute));
    date = setSeconds(date, 0);
    setSelectedDay(date);
    setSelectedMass(massHoursData);
    setVisibleDelete(true);
  };

  const handleDelete = (mass_id: string, periodData: Period) => {
    if (!selectedMass) return;

    setVisibleDelete(false);
    setPeriod(periodData);
    deleteMass({ mass_id, period: periodData });
  };

  return (
    <>
      <section className="timetable">
        {!isTablet && ( // desktop
          <>
            <header className="timetable__header">
              <table className="timetable__head">
                <tbody>
                  <tr>
                    <td className="timetable__date">Дзень тыдня</td>
                    <td className="timetable__online" />
                    <td className="timetable__roraty" />
                    <td className="timetable__time">Час</td>
                    <td className="timetable__lang">Мова Імшы</td>
                    <td className="timetable__comments">Каментарый</td>
                    <td className="timetable__period">Тэрмін дзеяння</td>
                    <td className="timetable__repeat">Паўтор</td>
                    <td className="timetable__btn" />
                  </tr>
                </tbody>
              </table>
            </header>

            <section className="timetable__main">
              {weekSchedule.schedule.map((day: Schedule, i) => {
                const lineCount = day.massHours?.reduce((count: number, current) => count + current.data.length, 1);

                return (
                  <section className="timetable__section" key={i}>
                    <table className="timetable__body">
                      <tbody>
                        <tr className="timetable__lineDate">
                          <td className="timetable__date" rowSpan={lineCount}>
                            <div className="timetable__weekday">{format(day.date, 'eeee', { locale: be })}</div>
                            <div className="timetable__day">{format(day.date, 'dd MMMM', { locale: be })}</div>
                          </td>
                        </tr>
                        {day.massHours?.map((massHours, k) => (
                          <TimeTableLine
                            massHours={massHours}
                            key={k}
                            onDelete={(data) => handleDeleteModalOpen(data, day, massHours)}
                          />
                        ))}
                      </tbody>
                    </table>
                  </section>
                );
              })}
            </section>
          </>
        )}
        {isTablet && !isMobile && (
          <>
            <ul className="tabs">
              {mobileSchedule.map((day: Schedule, i) => (
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                <li
                  key={i}
                  className={`tabs__item ${
                    day.isInaccessible ? 'tabs__item--disabled' : tab === i ? 'tabs__item--selected' : ''
                  }`}
                  onClick={() => !day.isInaccessible && setTab(i)}
                >
                  {isToday(day.date) && <div className="tabs__today">сёння</div>}
                  <div className="tabs__weekDate">{format(day.date, 'EEEE', { locale: be })}</div>
                  <div className="tabs__date">{format(day.date, 'dd.MM', { locale: be })}</div>
                </li>
              ))}
            </ul>

            <header className="timetable__header">
              <table className="timetable__head">
                <tbody>
                  <tr>
                    <td className="timetable__online" />
                    <td className="timetable__time">Час</td>
                    <td className="timetable__lang">Мова Імшы</td>
                    <td className="timetable__comments">Каментарый</td>
                    <td className="timetable__period">Тэрмін дзеяння</td>
                    <td className="timetable__repeat">Паўтор</td>
                    <td className="timetable__btn" />
                  </tr>
                </tbody>
              </table>
            </header>

            <section className="timetable__main">
              <section className="timetable__section">
                <table className="timetable__body">
                  <tbody>
                    {mobileSchedule[tab].massHours?.map((massHours, k) => (
                      <TimeTableLine
                        massHours={massHours}
                        // eslint-disable-next-line react/no-array-index-key
                        key={k}
                        onDelete={(data) => handleDeleteModalOpen(data, mobileSchedule[tab], massHours)}
                      />
                    ))}
                  </tbody>
                </table>
              </section>
            </section>
          </>
        )}

        {isMobile && (
          <>
            <ul className="tabs">
              {mobileSchedule.map((day: Schedule, i) => (
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                <li
                  key={i}
                  className={`tabs__item ${
                    day.isInaccessible ? 'tabs__item--disabled' : tab === i ? 'tabs__item--selected' : ''
                  }`}
                  onClick={() => !day.isInaccessible && setTab(i)}
                >
                  {isToday(day.date) && <div className="tabs__today">сёння</div>}
                  <div className="tabs__weekDate">{format(day.date, 'EEEEEE', { locale: be })}</div>
                  <div className="tabs__date">{format(day.date, 'dd.MM', { locale: be })}</div>
                </li>
              ))}
            </ul>

            <section className="timetable__main">
              <section className="timetable__section">
                <table className="timetable__body">
                  <tbody>
                    {mobileSchedule[tab] &&
                      mobileSchedule[tab].massHours?.map((massHours, k) => (
                        <TimeTableLine
                          massHours={massHours}
                          key={k}
                          onDelete={(data) => handleDeleteModalOpen(data, mobileSchedule[tab], massHours)}
                        />
                      ))}
                  </tbody>
                </table>
              </section>
            </section>
          </>
        )}
      </section>
      <DeleteModal
        visible={visibleDelete}
        onSave={handleDelete}
        onClose={() => setVisibleDelete(false)}
        mass={selectedMass}
        date={selectedDay}
      />
    </>
  );
};

export default TimeTable;
