/* eslint-disable jsx-a11y/no-static-element-interactions */
import './style.scss';

import format from 'date-fns/format';
import React, { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import { changeMassMode, editMass } from '../../../../models/mass';
import { MassMode } from '../../../../models/mass/types';
import { MassHours, MassHoursData } from '../../../../models/schedule/types';
import {
  DeleteIcon, EditIcon, InfinityIcon, RoratyIcon, YoutubeIcon,
} from '../../../icons';
import Repeat from '../../../repeat';

interface props {
  massHours: MassHours;
  onDelete: (item: MassHoursData) => void;
}

const mobileLayout = (massHours: MassHours, onDelete: (item: MassHoursData) => void) => {
  const [contentWidth, setContentWidth] = useState<number>(0);
  const [expand, setExpand] = useState<boolean>(false);
  const contentRef = useRef<HTMLTableCellElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setContentWidth(contentRef.current.clientWidth);
    }
  }, []);

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>, item: MassHoursData) => {
    e.stopPropagation();
    onDelete(item);
  };
  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>, item: MassHoursData) => {
    e.stopPropagation();
    changeMassMode(MassMode.EDIT);
    editMass(item.id);
  };

  return (
    <>
      {
        massHours.data.map((item, i) => (
          <>
            <tr className="timetableMobile__line" key={i}>
              <td ref={contentRef} className="timetableMobile__content">
                <div className="timetableMobile__col1">
                  <div className="timetableMobile__section">
                    <div className="timetableMobile__title">Час</div>
                    <div className={`timetable__online ${item.needUpdate ? 'timetable__needUpdate' : 'timetable__updated'}`}>
                      <span className="timetableMobile__time">{massHours.hour}</span>
                      {item.online && <YoutubeIcon className="timetable__icon timetableMobile__icon" />}
                      {item.rorate && <RoratyIcon className="timetable__icon timetableMobile__icon" />}
                    </div>

                  </div>
                  <div className="timetableMobile__section">
                    <div className="timetableMobile__title">Мова Імшы</div>
                    <span>{item.langCode}</span>
                  </div>
                </div>
                <div className="timetableMobile__col2">
                  <div className="timetableMobile__section">
                    <div className="timetableMobile__title">Тэрмін дзеяння</div>
                    <div className="period">
                      {
                        item.startDate && item.endDate && item.days && (
                          <>
                            <span className="period__start">з </span>
                            <span className="period__date">{format(new Date(item.startDate), 'dd.MM.yyyy')}</span>
                          </>
                        )
                      }
                      {
                        item.endDate && item.days && (
                          <>
                            <span className="period__end"> па </span>
                            <span className="period__date">{format(new Date(item.endDate), 'dd.MM.yyyy')}</span>
                          </>
                        )
                      }
                      {
                        !item.endDate && item.days && (
                          <>
                            <InfinityIcon className="timetable__icon" />
                          </>
                        )
                      }
                      {
                        !item.days && <span className="period__date">адзінкавая</span>
                      }
                    </div>
                  </div>
                  <div className="timetableMobile__section">
                    <div className="timetableMobile__title">Паўтор</div>
                    {
                      item.days && <Repeat week={item.days} />
                    }
                  </div>
                </div>
                <div className="timetableMobile__actions">
                  <button type="button" className="timetable__btnIcon" onClick={(e) => handleEdit(e, item)}>
                    <EditIcon className="timetable__icon" />
                  </button>
                  <button type="button" className="timetable__btnIcon" onClick={(e) => handleDelete(e, item)}>
                    <DeleteIcon className="timetable__icon " />
                  </button>
                </div>
              </td>
            </tr>
            {!!item.info && (
              <tr>
                <div className="timetableMobile__title">Каментарый</div>
                <div className={`timetableMobile__comment ${expand && 'timetableMobile__comment_expand'}`} style={{ width: `${contentWidth}px` }} onClick={() => setExpand((value) => !value)}>{item.info}</div>
              </tr>
            )}
          </>
        ))
      }
    </>
  );
};

const tabletLayout = (massHours: MassHours, onDelete: (item: MassHoursData) => void) => {
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>, item: MassHoursData) => {
    e.stopPropagation();
    onDelete(item);
  };
  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>, item: MassHoursData) => {
    e.stopPropagation();
    changeMassMode(MassMode.EDIT);
    editMass(item.id);
  };

  return (
    <>
      {
        massHours.data.map((item, i) => (
          <tr className="timetable__line" key={i}>
            <td className={`timetable__online ${item.needUpdate ? 'timetable__needUpdate' : 'timetable__updated'}`}>
              {item.online && <YoutubeIcon className="timetable__icon" />}
            </td>
            <td className="timetable__roraty">
              {item.rorate && <RoratyIcon className="timetable__icon timetableMobile__icon" />}
            </td>
            <td className="timetable__time">{massHours.hour}</td>
            <td className="timetable__lang">{item.langCode}</td>
            <td className="timetable__comments">{item.info}</td>
            <td className="timetable__period">
              <div className="period">
                {
                  item.startDate && item.endDate && item.days && (
                    <>
                      <span className="period__start">з </span>
                      <span className="period__date">{format(new Date(item.startDate), 'dd.MM.yyyy')}</span>
                      <br />
                    </>
                  )
                }
                {
                  item.endDate && item.days && (
                    <>
                      <span className="period__end">па </span>
                      <span className="period__date">{format(new Date(item.endDate), 'dd.MM.yyyy')}</span>
                    </>
                  )
                }
                {
                  !item.endDate && item.days && (
                    <>
                      <InfinityIcon className="timetable__icon" />
                    </>
                  )
                }
                {
                  !item.days && <span className="period__date">адзінкавая</span>
                }
              </div>
            </td>
            <td className="timetable__repeat">
              {
                item.days && <Repeat week={item.days} />
              }
            </td>
            <td className="timetable__btn">
              <div className="timetable__actions">
                <button type="button" className="timetable__btnIcon" onClick={(e) => handleEdit(e, item)}>
                  <EditIcon className="timetable__icon" />
                </button>
                <button type="button" className="timetable__btnIcon" onClick={(e) => handleDelete(e, item)}>
                  <DeleteIcon className="timetable__icon" />
                </button>
              </div>
            </td>
          </tr>
        ))
      }
    </>
  );
};

const TimeTableLine = ({ massHours, onDelete }: props) => {
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  return isMobile ? mobileLayout(massHours, onDelete) : tabletLayout(massHours, onDelete);
};

export default TimeTableLine;
