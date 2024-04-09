import './style.scss';

import { differenceInSeconds } from 'date-fns';
import React, { useEffect, useState } from 'react';

interface props {
  lastDate: Date;
  limitDays: number;
}

interface IDisplayDuration {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

const padLeft = (num: number): string => (num <= 9 ? `0${num}` : `${num}`);

const LimitTimer = ({ lastDate, limitDays } : props) => {
  const [duration, setDuration] = useState<IDisplayDuration | null>(null);
  const [attention, setAttention] = useState(false);

  const calculate = () => {
    // Т.к. дата актуальности указывается наперед, то для расчета
    // времени, которое прошло с момента последнего подтверждения,
    // надо использовать формулу
    // now() - lastDate
    const secondsBetween = Math.abs(differenceInSeconds(new Date(), lastDate));

    const days = Math.floor(secondsBetween / 3600 / 24);
    const hours = Math.floor((secondsBetween % (3600 * 24)) / 3600);
    const minutes = Math.floor((secondsBetween % 3600) / 60);
    const seconds = Math.floor(secondsBetween % 60);

    setDuration({
      days: padLeft(days),
      hours: padLeft(hours),
      minutes: padLeft(minutes),
      seconds: padLeft(seconds),
    });
    setAttention(days >= limitDays);
  };

  useEffect(() => {
    const timer = setInterval(calculate, 1000);
    return () => clearInterval(timer);
  }, [lastDate, limitDays]);

  // if (!duration) return <></>;
  return (
    <section className={`limitTimer ${attention ? 'limitTimer__attention' : ''}`}>
      <div className="limitTimer__item">
        <div className="limitTimer__header">{duration?.days || '--'}</div>
        <span className="limitTimer__content">дні</span>
      </div>
      <div className="limitTimer__item">
        <div className="limitTimer__header">{duration?.hours || '--'}</div>
        <span className="limitTimer__content">гадзіны</span>
      </div>
      <div className="limitTimer__item">
        <div className="limitTimer__header">{duration?.minutes || '--'}</div>
        <span className="limitTimer__content">хвіліны</span>
      </div>
      <div className="limitTimer__item">
        <div className="limitTimer__header">{duration?.seconds || '--'}</div>
        <span className="limitTimer__content">секунды</span>
      </div>

      {/* eslint-disable-next-line max-len */}
      {/* {`${duration?.days} : ${duration?.hours} : ${duration?.minutes} : ${duration?.seconds}`} */}
    </section>
  );
};

export default LimitTimer;
