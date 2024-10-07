import './style.scss';

import { format, fromUnixTime, parse } from 'date-fns';
import { be } from 'date-fns/locale';
import { useUnit } from 'effector-react';
import { useEffect, useState } from 'react';

import {
  $mass, $massMode, $massUpdated, resetMassUpdated, resetMassMode,
} from '../../models/mass';
import { MassMode } from '../../models/mass/types';
import { InfinityIcon, RoratyIcon, YoutubeIcon } from '../icons';
import Modal from '../modal';
import Repeat from '../repeat';

const CreateModalResult = () => {
  const [title, setTitle] = useState<string>('');
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [period, setPeriod] = useState<string>('');
  const [time, setTime] = useState<string>(''); // todo should be remove when backend will fill mass.time for single mass

  const visible = useUnit($massUpdated);
  const mass = useUnit($mass);
  const massMode = useUnit($massMode);

  const handleClose = () => {
    resetMassUpdated(false);
    resetMassMode();
  };

  useEffect(() => {
    if (!mass) return;

    const textStatus = massMode === MassMode.CREATE ? 'дададзена' : 'зменена';

    if (!mass.days && mass.singleStartTimestamp) {
      const startDateMass = fromUnixTime(mass.singleStartTimestamp);
      setStartDate(startDateMass);
      setTitle(`Адзінкавая Імша ${format(startDateMass, 'dd.MM.yyyy')} ${textStatus}!`);
      setPeriod('адзінкавая');
      setTime(format(fromUnixTime(mass.singleStartTimestamp), 'HH:mm'));
    } else {
      setTitle(`Сталая Імша ${textStatus}!`);

      let periodLabel = '';
      if (mass.startDate) {
        const startDateMass = parse(mass.startDate || '', 'MM/dd/yyyy', new Date());
        setStartDate(startDateMass);
        periodLabel = `з ${format(startDateMass, 'dd MMMM yyyy', { locale: be })} `;
      }
      if (mass.endDate) {
        const endDate = parse(mass.endDate || '', 'MM/dd/yyyy', new Date());
        periodLabel += `па ${format(endDate, 'dd MMMM yyyy', { locale: be })}`;
      }
      setPeriod(periodLabel);
      setTime(mass.time || '');
    }
  }, [mass]);

  if (!mass) return <></>;
  return (
    <>
      <Modal visible={visible} onClose={() => handleClose()}>
        <section className="modal__section">
          <header className="modal__header">
            <span className="modal__title">{title}</span>
          </header>

          <section className="modal__body">
            <section className="success">
              <ul className="success__list">
                {
                  !mass.days
                && (
                  <li className="success__item">
                    <div className="success__title">Дата</div>
                    <div className="success__value">{format(startDate, 'dd MMMM yyyy, eeeeee', { locale: be })}</div>
                  </li>
                )
                }

                <li className="success__item">
                  <div className="success__title">Час</div>
                  <div className="success__value">
                    {time}
                    {mass.online && <YoutubeIcon className="success__youtube" />}
                    {mass.rorate && <RoratyIcon className="success__roraty" />}
                  </div>
                </li>
                <li className="success__item">
                  <div className="success__title">Мова</div>
                  <div className="success__value">{mass.langCode}</div>
                </li>
                <li className="success__item">
                  <div className="success__title">Каментарый</div>
                  <div className="success__value">{mass.notes}</div>
                </li>
                <li className="success__item">
                  <div className="success__title">Тэрмін дзеяння</div>
                  <div className="success__value">
                    {
                      !mass.endDate && mass.days
                        ? (
                          <span>
                            {period}
                            {' '}
                            па
                            {' '}
                            <InfinityIcon className="success__infinity" />
                          </span>
                        )
                        : <span>{period}</span>
                    }
                  </div>
                </li>
                {
                  mass.days && (
                    <>
                      <li className="success__item">
                        <div className="success__title">Паўтор</div>
                        <div className="success__value">
                          <Repeat week={mass.days} />
                        </div>
                      </li>
                    </>
                  )
                }
              </ul>
            </section>
          </section>

          <footer className="modal__footer modal__footer--center">
            <button type="button" className="btn btn-small" onClick={handleClose}>Ok</button>
          </footer>
        </section>
      </Modal>

    </>
  );
};

export default CreateModalResult;
