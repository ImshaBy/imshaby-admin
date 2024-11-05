import './style.scss';

import { useUnit } from 'effector-react';

import { $parish } from '../../models/parish';
import { approveSchedule } from '../../models/schedule';
import { formatDate, formatDateWithoutCount } from '../../utils/formatDate';
import LimitTimer from '../limitTimer';
import Loading from '../loading';
import toast from 'react-hot-toast';

const Parish = () => {
  const parish = useUnit($parish);

  const handleApprove = async () => {
    approveSchedule();
    toast('Расклад падцверджаны');
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
              lastDate={parish.lastConfirmRelevance}
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
