import './style.scss';

import { useStore } from 'effector-react';
import React from 'react';
import { useToasts } from 'react-toast-notifications';

import { $parish } from '../../models/parish';
import { approveSchedule } from '../../models/schedule';
import formatDate from '../../utils/formatDate';
import LimitTimer from '../limitTimer';
import Loading from '../loading';

const Parish = () => {
  const parish = useStore($parish);
  const { addToast } = useToasts();

  const handleApprove = async () => {
    approveSchedule();
    addToast('Расклад падцверджаны');
  };

  if (!parish) return <Loading />;
  return (
    <section className="parish">
      <aside className="parish__photo">
        <img src={`https://imsha.by/${parish.imgPath}`} alt={parish.name} className="parish__img" />
      </aside>
      <section className="parish__content">
        <section className="parish__limitTimer">
          <div className="parish__txt">З моманту падцверджання актуальнасці раскладу прайшло</div>
          <div className="parishPeriod">
            <LimitTimer
              lastDate={parish.lastMassActualDate}
              limitDays={parish.updatePeriodInDays}
            />
          </div>

          <div className="parishApprovePeriod">
            <button type="button" className="btn" onClick={handleApprove}>
              Падцвердзіць актуальнасць раскладу
            </button>
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
