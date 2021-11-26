import React, { useEffect, useState } from 'react';
import fromUnixTime from 'date-fns/fromUnixTime';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import be from 'date-fns/locale/be';

import { InfinityIcon, YoutubeIcon, RoratyIcon } from '../icons';
import Repeat from '../repeat';
import Modal from '../modal';

import { useStore } from 'effector-react';
import {
  $mass, $massMode, $massUpdated, resetMassUpdated,
} from '../../models/mass';
import { MassMode } from '../../models/mass/types';

import './style.scss';

const CreateModalResult = () => {
  const [title, setTitle] = useState<string>('');
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [period, setPeriod] = useState<string>('');
  const [time, setTime] = useState<string>(''); // todo should be remove when backend will fill mass.time for single mass

  const visible = useStore($massUpdated);
  const mass = useStore($mass);
  const massMode = useStore($massMode);

  const handleClose = () => {
    resetMassUpdated(false);
  };

  useEffect(() => {
    if (!mass) return;

    const textStatus = massMode === MassMode.CREATE ? 'дададзена' : 'зменена';

    if (!mass.days && mass.singleStartTimestamp) {
      const startDate = fromUnixTime(mass.singleStartTimestamp);
      setStartDate(startDate);
      setTitle(`Адзінкавая Імша ${format(startDate, 'dd.MM.yyyy')} ${textStatus}!`);
      setPeriod('адзінкавая');
      setTime(format(fromUnixTime(mass.singleStartTimestamp), 'HH:mm'));
    } else {
      setTitle(`Сталая Імша ${textStatus}!`);

      let period = '';
      if (mass.startDate) {
        const startDate = parse(mass.startDate, 'MM/dd/yyyy', new Date());
        setStartDate(startDate);
        period = `з ${format(startDate, 'dd MMMM yyyy', { locale: be })} `;
      }
      if (mass.endDate) {
        const endDate = parse(mass.endDate, 'MM/dd/yyyy', new Date());
        period += `па ${format(endDate, 'dd MMMM yyyy', { locale: be })}`;
      }
      setPeriod(period);
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
                        ? <InfinityIcon className="success__infinity" />
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
            <button className="btn btn-small" onClick={handleClose}>Ok</button>
          </footer>
        </section>
      </Modal>

    </>
  );
};

export default CreateModalResult;
