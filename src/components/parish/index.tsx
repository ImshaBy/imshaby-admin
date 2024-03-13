import './style.scss';

import { useStore } from 'effector-react';
import React from 'react';
import { useToasts } from 'react-toast-notifications';

import { $parish } from '../../models/parish';
import { approveSchedule } from '../../models/schedule';
import { formatDate, formatDateWithoutCount } from '../../utils/formatDate';
import LimitTimer from '../limitTimer';
import Loading from '../loading';

const Parish = () => {
  const parish = useStore($parish);
  const { addToast } = useToasts();

  const handleApprove = async () => {
    approveSchedule();
    addToast('Расклад падцверджаны');
  };
  let imgPath = '';
  if (parish && parish.imgPath) {
    imgPath = parish.imgPath.includes('storage.yandexcloud.net') ? parish.imgPath : `https://imsha.by/${parish?.imgPath}`;
  }
  if (!parish) return <Loading />;
  return (
    <section className="parish">
      <aside className="parish__photo">
        <img src={imgPath} alt={parish.name} className="parish__img" />
      </aside>
      <section className="parish__content">
        <section className="parish__limitTimer">
          <div className="parish__txt">З моманту падцверджання актуальнасці раскладу прайшло</div>
          <div className="parishPeriod">
            <LimitTimer
              lastDate={parish.lastModifiedDate}
              limitDays={parish.updatePeriodInDays}
            />
          </div>

          <div className="parishApprovePeriod">
            <button type="button" className="btn" onClick={handleApprove}>
              Падцвердзіць актуальнасць раскладу
            </button>
          </div>
          <div className="parish__mobileActualPeriod">
            <div className="parish__txt">
              Перыяд актуальнасці раскладу
              {' '}
              <span className="parish__value">{parish.updatePeriodInDays}</span>
              {' '}
              {formatDateWithoutCount(parish.updatePeriodInDays)}
            </div>
          </div>
        </section>
        <section className="parish__actualPeriod">
          <div className="parish__txt">Перыяд актуальнасці Імшаў</div>
          <div className="parish__value">{formatDate(parish.updatePeriodInDays)}</div>
        </section>

      </section>
    </section>
  );
};

export default Parish;
