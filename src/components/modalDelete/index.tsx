import React, {useState, useEffect} from 'react';
import DateTimePicker from './../datapicker';
import format from 'date-fns/format';
import be from 'date-fns/locale/be';
import {CloseIcon, InfinityIcon, YoutubeIcon} from './../icons';
import {IMassCreate, IMassHoursData} from "../../api/interfeces";
import Modal from "../modal";
import Repeat from "../repeat";
import parse from "date-fns/parse";

interface IProps {
  visible: boolean;
  onClose: Function;
  onSave: Function;
  mass: IMassHoursData | null;
  date: Date;
}

enum Radio {
  one,
  feature,
}

const DeleteModal = ({ visible, onClose, onSave, mass, date }: IProps) => {
  const [value, setValue] = useState<Radio>(Radio.one);
  const [title, setTitle] = useState<string>('');
  const [period, setPeriod] = useState<string>('');

  useEffect(() => {
    if (!mass) return;

    if (!mass.days) {
      setTitle(`Выдаліць адзінкавую Імшу?`);
    } else {
      setTitle(`Выдаліць сталую Імшу?`);
      setPeriod('');
      if (mass.endDate) {
        const endDate = parse(mass.endDate, 'MM/dd/yyyy', new Date());
        setPeriod(`да ${format(endDate, 'dd MMMM yyyy, eeeeee', {locale: be})}`);
      }
    }

  }, [mass])


  const handleChange = (type: Radio) => setValue(type)

  const handleSubmit = () => {
    if (!mass) {
      return;
    }
    if (!mass.days) {
      onSave(mass.id);
      return;
    }

    const period = {
      from: '',
      to: '',
    }
    switch (value) {
      case Radio.one:
        period.from = format(date, 'dd-MM-yyyy');
        period.to = format(date, 'dd-MM-yyyy');
        break;
      case Radio.feature:
        period.from = '';
        period.to = '';
        break;
    }

    onSave(mass.id, period);
  }

  if (!mass) return <></>;
  return <>
    <Modal visible={visible} onClose={() => onClose()}>
      <section className="modal__section">
      <header className="modal__header">
          <span className="modal__title">{title}</span>
          <button className="modal__header-close" onClick={() => onClose()}>
            <CloseIcon className="modal__header-closeIcon"/>
          </button>
        </header>

        <section className="modal__body">
          <section className="success">
            <ul className="success__list">
              {
                !mass.days?.length && <>
                  <li className="success__item">
                    <div className="success__title">Дата</div>
                    <div className="success__value">{format(date, 'dd MMMM yyyy, eeeeee', {locale: be})}</div>
                  </li>
                </>
              }
              <li className="success__item">
                <div className="success__title">Час</div>
                <div className="success__value">
                  {format(date, 'HH.mm')}
                  {mass.online && <YoutubeIcon className="success__youtube"/>}
                </div>
              </li>
              <li className="success__item">
                <div className="success__title">Мова</div>
                <div className="success__value">{mass.langCode}</div>
              </li>
              {
                mass.days && <>
                  <li className="success__item">
                    <div className="success__title">Тэрмін дзеяння</div>
                    <div className="success__value">
                      {
                        period ? period : <InfinityIcon className="success__infinity"/>
                      }
                    </div>
                  </li>
                  <li className="success__item">
                    <div className="success__title">Паўтор</div>
                    <div className="success__value">
                      <Repeat week={mass.days} />
                    </div>
                  </li>
                </>
              }
            </ul>
          </section>
          <section className="delete">


            {
              mass.days && <>
                <ul className="delete__list">
                  <li className="delete__item">
                <span className="delete__radio">
                  <label className="radio">
                    <input type="radio" className="radio__input" name="delete" onChange={() => handleChange(Radio.one)}
                           value={Radio.one} checked={value === Radio.one}/>
                    <span className="radio__text">толькі гэтую Імшу {format(date, 'dd.MM.yyyy')}</span>
                  </label>
                </span>
                  </li>
                  <li className="delete__item">
                <span className="delete__radio">
                  <label className="radio">
                    <input type="radio" className="radio__input" name="delete"
                           onChange={() => handleChange(Radio.feature)} value={Radio.feature}
                           checked={value === Radio.feature}/>
                    <span className="radio__text">цалкам выдаліць сталую Імшу з раскладу на ўсе дні</span>
                  </label>
                </span>
                  </li>
                </ul>
              </>
            }

          </section>
        </section>

        <footer className="modal__footer">
          <button className="btn btn-empty" onClick={() => onClose()}>Адмена</button>
          <button className="btn" onClick={handleSubmit}>Выдаліць</button>
        </footer>
      </section>
    </Modal>
  </>
};

export default DeleteModal
