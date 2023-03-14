import format from 'date-fns/format';
import fromUnixTime from 'date-fns/fromUnixTime';
import getTime from 'date-fns/getTime';
import parse from 'date-fns/parse';
import set from 'date-fns/set';
import { useStore } from 'effector-react';
import React, { ChangeEvent, useEffect, useState } from 'react';

import {
  $mass, $massError,
  $massMode, $massUpdated, resetMassMode, saveMass, updateMassStore,
} from '../../models/mass';
import { Mass, MassMode } from '../../models/mass/types';
import DateTimePicker from '../datapicker';
import { CloseIcon, RoratyIcon, YoutubeIcon } from '../icons';
import Modal from '../modal';
import TimePicker from '../timepicker';

const NOTES_LIMIT = 300;
const DEFAULT_LANG = 'беларуская';

const CreateModal = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [hours, setHours] = useState<string>('');
  const [minutes, setMinutes] = useState<string>('');
  const [days, setDays] = useState<number[]>([]);
  const [daysValid, setDaysValid] = useState<boolean>(true);
  const [startDateValid, setStartDateValid] = useState<boolean>(true);
  const [isMassPeriodic, setMassPeriodic] = useState<boolean>(false);
  const [online, setOnline] = useState<boolean>(false);
  const [rorate, setRorate] = useState<boolean>(false);
  const [langCode, setLangCode] = useState<string>(DEFAULT_LANG);
  const [notes, setNotes] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const mass = useStore($mass);
  const massMode = useStore($massMode);
  const massUpdated = useStore($massUpdated);
  const massError = useStore($massError);
  const visible = massMode !== MassMode.HIDDEN && !massUpdated;

  const resetForm = () => {
    setStartDate(new Date());
    setEndDate(null);
    setHours('');
    setMinutes('');
    setDays([]);
    setMassPeriodic(false);
    setOnline(false);
    setRorate(false);
    setLangCode(DEFAULT_LANG);
    setNotes('');
    setSubmitted(false);
  };

  const validate = (): boolean => {
    const isDaysValid = isMassPeriodic ? !!days.length : true;
    const startDateForSingleMass = !isMassPeriodic ? !!startDate : true;

    setDaysValid(isDaysValid);
    setStartDateValid(startDateForSingleMass);

    return isDaysValid && startDateForSingleMass;
  };

  useEffect(() => {
    setSubmitted(false);
    if (!visible) resetForm();
  }, [visible]);

  useEffect(() => {
    if (!mass) {
      resetForm();
      return;
    }

    const time = mass.time ? mass.time.split(':') : ['00', '00'];

    if (mass.singleStartTimestamp) {
      setStartDate(fromUnixTime(mass.singleStartTimestamp));
      setHours(fromUnixTime(mass.singleStartTimestamp).getHours().toString());
      setMinutes(fromUnixTime(mass.singleStartTimestamp).getMinutes().toString());
    } else if (mass.startDate) {
      setStartDate(parse(mass.startDate, 'MM/dd/yyyy', new Date()));
      setHours(time[0]);
      setMinutes(time[1]);
    } else {
      setStartDate(new Date());
      setHours(time[0]);
      setMinutes(time[1]);
    }
    setEndDate(mass.endDate ? new Date(mass.endDate) : null);
    setDays(mass.days ? mass.days : []);
    setMassPeriodic(!!mass.days?.length);
    setOnline(!!mass.online);
    setRorate(!!mass.rorate);
    setLangCode(mass.langCode || '');
    setNotes(mass.notes || '');
  }, [mass]);

  useEffect(() => {
    validate();
  }, [days, hours, minutes, startDate]);

  const handleChangeStartDate = (date: Date | null) => {
    setStartDate(date || new Date());
  };
  const handleChangeEndDate = (date: Date | null) => {
    setEndDate(date);
  };
  const handleChangeTime = (hours: string, minutes: string) => {
    setHours(hours);
    setMinutes(minutes);
  };
  const handleSelectDay = (day: number) => () => {
    const index = days.findIndex((i) => i === day);
    if (index === -1) {
      setDays([...days, day]);
    } else {
      days.splice(index, 1);
      setDays([...days]);
    }
  };

  const handleChangeNotes = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (NOTES_LIMIT - e.target.value.length >= 0) {
      setNotes(e.target.value);
    }
  };

  const handleCreate = () => {
    setSubmitted(true);
    if (!validate()) return;

    if (!isMassPeriodic) {
      if (!startDate) return;

      const date = set(startDate, { hours: Number(hours), minutes: Number(minutes), seconds: 0 });

      const data = {
        singleStartTimestamp: getTime(date) / 1000,
        notes,
        langCode,
        online,
        rorate,
        id: mass?.id,
      };

      updateMassStore(data);
      saveMass();
      return;
    }

    // periodic mass
    const data : Mass = {
      langCode,
      days,
      notes,
      time: `${hours}:${minutes}`,
      online,
      rorate,
      id: mass?.id,
    };

    if (startDate) {
      data.startDate = format(startDate, 'MM/dd/yyyy');
    }
    if (endDate) {
      data.endDate = format(endDate, 'MM/dd/yyyy');
    }
    updateMassStore(data);
    saveMass();
  };

  return (
    <>
      <Modal visible={visible} onClose={() => resetMassMode()}>
        <section className="modal__section">
          <header className="modal__header">
            {
              massMode === MassMode.CREATE
                ? <span className="modal__title">Дадаць Імшу</span>
                : <span className="modal__title">Змяніць Імшу</span>
            }
            <button type="button" className="modal__header-close" onClick={() => resetMassMode()}>
              <CloseIcon className="modal__header-closeIcon" />
            </button>
          </header>

          <section className="modal__body">

            <section className="form">
              <section className="form__row form__row--column">
                <div className="form__col form__col--large">
                  <div className={`form__label ${!startDateValid && submitted ? 'form__label--invalid' : ''}`}>Iмша ў раскладзе з</div>
                  <div className="form__field">
                    <DateTimePicker
                      selected={startDate}
                      onChange={handleChangeStartDate}
                      minDate={new Date()}
                      maxDate={endDate}
                    />
                  </div>
                </div>
                <div className="form__col form__col--small">
                  <div className={`form__label`}>Час</div>
                  <div className="from__field">
                    <TimePicker hour={hours} minute={minutes} onChange={handleChangeTime} />
                  </div>
                </div>
                {
                  massError.error && (
                    <>
                      <section className="modal__error">
                        <span className="modal__error-text">{massError.message}</span>
                      </section>
                    </>
                  )
                }
              </section>

              <section className="form__row">
                <div className="form__col">
                  <div className="form__label">Мова</div>
                  <div className="form__field">
                    <select onChange={(e) => setLangCode(e.target.value)} value={langCode}>
                      <option value="беларуская">беларуская</option>
                      <option value="польская">польская</option>
                      <option value="англійская">англійская</option>
                      <option value="украінская">украінская</option>
                    </select>
                  </div>
                </div>
              </section>

              <section className="form__row form__row--no-margin">
                <div className="form__col">
                  <label className="form__label">Каментарый (неабавязковае поле)</label>
                  <div className="form__field">
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={handleChangeNotes}
                    />
                    <span className="form__hint form__hint--right">
                      Засталося
                      {' '}
                      {' '}
                      {NOTES_LIMIT - notes.length}
                      {' '}
                      знакаў
                    </span>
                  </div>
                </div>
              </section>

              <section className="form__row form__row--small-margin">
                <div className="form__col">
                  <div className="form__field">
                    <label className="checkbox">
                      <input type="checkbox" className="checkbox__input" checked={isMassPeriodic} onChange={() => setMassPeriodic(!isMassPeriodic)} />
                      <span className="checkbox__text">Паўтараць Імшу</span>
                    </label>
                  </div>
                </div>
              </section>

              {
                isMassPeriodic && (
                  <>
                    <section className="form__row form__row--small-margin">
                      <div className="form__col">
                        <div className={`form__label ${!daysValid && submitted ? 'form__label--invalid' : ''}`}>Дні</div>
                        <div className="form__field">
                          <div className="days">
                            <ul className="days__list">
                              <li
                                className={`days__item ${days.includes(1) ? 'days__item--active' : ''}`}
                                onClick={handleSelectDay(1)}
                              >
                                Пн
                              </li>
                              <li
                                className={`days__item ${days.includes(2) ? 'days__item--active' : ''}`}
                                onClick={handleSelectDay(2)}
                              >
                                Ат
                              </li>
                              <li
                                className={`days__item ${days.includes(3) ? 'days__item--active' : ''}`}
                                onClick={handleSelectDay(3)}
                              >
                                Ср
                              </li>
                              <li
                                className={`days__item ${days.includes(4) ? 'days__item--active' : ''}`}
                                onClick={handleSelectDay(4)}
                              >
                                Чц
                              </li>
                              <li
                                className={`days__item ${days.includes(5) ? 'days__item--active' : ''}`}
                                onClick={handleSelectDay(5)}
                              >
                                Пт
                              </li>
                              <li
                                className={`days__item ${days.includes(6) ? 'days__item--active' : ''}`}
                                onClick={handleSelectDay(6)}
                              >
                                Сб
                              </li>
                              <li
                                className={`days__item ${days.includes(7) ? 'days__item--active' : ''}`}
                                onClick={handleSelectDay(7)}
                              >
                                Нд
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </section>
                    <section className="form__row">
                      <div className="form__col">
                        <div className="form__label form__label--no-margin">Скончыць (неабавязковае поле)</div>
                        <span className="form__hint">Калі тэрмін дзеяння невядомы — пакіньце поле пустым</span>
                        <div className="form__field">
                          <DateTimePicker
                            selected={endDate}
                            onChange={handleChangeEndDate}
                            minDate={startDate || new Date()}
                          />
                        </div>
                      </div>
                    </section>
                  </>
                )
              }
              <section className="form__row form__row--small-margin">
                <div className="form__col">
                  <div className="form__field">
                    <label className="checkbox">
                      <input type="checkbox" className="checkbox__input" checked={rorate} onChange={() => setRorate(!rorate)} />
                      <span className="checkbox__text">
                        {' '}
                        Рараты
                        <RoratyIcon className="checkbox__roraty" />
                      </span>
                    </label>
                    <span className="form__hint form__hint--padding-left">Пазначыць Імшу як раратнюю</span>
                  </div>
                </div>
              </section>

              <section className="form__row form__row--small-margin">
                <div className="form__col">
                  <div className="form__field">
                    <label className="checkbox">
                      <input type="checkbox" className="checkbox__input" checked={online} onChange={() => setOnline(!online)} />
                      <span className="checkbox__text">
                        {' '}
                        Відэа трансляцыя
                        <YoutubeIcon className="checkbox__youtube" />
                      </span>
                    </label>
                    <span className="form__hint form__hint--padding-left">Спасылка на трансляцыю ў раздзеле «Парафія»</span>
                  </div>
                </div>
              </section>

            </section>

          </section>

          <footer className="modal__footer">
            <button type="button" className="btn btn-empty" onClick={() => resetMassMode()}>Адмена</button>
            {
              massMode === MassMode.CREATE
                ? <button type="button" className="btn" onClick={handleCreate}>Дадаць Імшу</button>
                : <button type="button" className="btn" onClick={handleCreate}>Змяніць Імшу</button>
            }

          </footer>
        </section>
      </Modal>
    </>
  );
};

export default CreateModal;
