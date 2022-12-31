import './style.scss';

import { useStore } from 'effector-react';
import React, { useState } from 'react';

import { $parish, updateParish } from '../../models/parish';
import { Parish } from '../../models/parish/types';
import {
  LinkIcon, MarkerIcon,
} from '../icons';

const ParishEdit = () => {
  const parish = useStore($parish);
  const [phone, setPhone] = useState(parish?.phone || '');
  const [website, setWebsite] = useState(parish?.website || '');
  const [email, setEmail] = useState(parish?.email || '');
  const [broadcastUrl, setBroadcastUrl] = useState(parish?.broadcastUrl || '');
  const [editMode, setEditMode] = useState(false);

  const handleEdit = () => {
    if (!parish) return;
    if (!editMode) {
      setEditMode(true);
      return;
    }

    const data: Parish = {
      ...parish,
      phone,
      website,
      email,
      broadcastUrl,
    };
    updateParish(data);
    setEditMode(false);
  };
  const handleCloseEdit = () => {
    setPhone(parish?.phone || '');
    setWebsite(parish?.website || '');
    setEmail(parish?.email || '');
    setBroadcastUrl(parish?.broadcastUrl || '');
    setEditMode(false);
  };

  if (!parish) return <></>;
  return (
    <section className="parishEdit">
      <aside className="parishEdit__photo">
        <img src={`https://imsha.by/${parish.imgPath}`} alt={parish.name} className="parishEdit__img" />
      </aside>

      <section className="parishEdit__content">

        <section className={`parishInfo ${editMode ? 'parishInfo--editMode' : ''}`}>
          <ul className="parishInfo__list">
            <li className="parishInfo__item">
              <div className="parishInfo__name">
                <MarkerIcon className="parishInfo__icon" />
                {' '}
                Адрас
              </div>
              <div className="parishInfo__field">
                <span className="parishInfo__address">{parish.address}</span>
              </div>
            </li>
            {/* <li className="parishInfo__item"> */}
            {/*  <div className="parishInfo__name"> */}
            {/*    <PhoneIcon className="parishInfo__icon" /> */}
            {/*    {' '} */}
            {/*    Тэлефон */}
            {/*  </div> */}
            {/*  <div className="parishInfo__field"> */}
            {/*    <a href={`tel:${phone}`} className="parishInfo__value">{phone}</a> */}
            {/* eslint-disable-next-line max-len */}
            {/*    <input type="text" className="parishInfo__input" value={phone} onChange={(e) => setPhone(e.target.value)} /> */}
            {/*  </div> */}
            {/* </li> */}
            {/* <li className="parishInfo__item"> */}
            {/*  <div className="parishInfo__name"> */}
            {/*    <PhoneIcon className="parishInfo__icon" /> */}
            {/*    {' '} */}
            {/*    Вэбсайт */}
            {/*  </div> */}
            {/*  <div className="parishInfo__field"> */}
            {/* eslint-disable-next-line max-len */}
            {/*    <a href={`${website}`} className="parishInfo__value" target="_blank">{website}</a> */}
            {/* eslint-disable-next-line max-len */}
            {/*    <input type="text" className="parishInfo__input" value={website} onChange={(e) => setWebsite(e.target.value)} /> */}
            {/*  </div> */}
            {/* </li> */}
            {/* <li className="parishInfo__item"> */}
            {/*  <div className="parishInfo__name"> */}
            {/*    <EmailIcon className="parishInfo__icon" /> */}
            {/*    {' '} */}
            {/*    Эл. пошта */}
            {/*  </div> */}
            {/*  <div className="parishInfo__field"> */}
            {/*    <a href={`mailto:${email}`} className="parishInfo__value">{email}</a> */}
            {/* eslint-disable-next-line max-len */}
            {/*    <input type="text" className="parishInfo__input" value={email} onChange={(e) => setEmail(e.target.value)} /> */}
            {/*  </div> */}
            {/* </li> */}

            <li className="parishInfo__item">
              <div className="parishInfo__name">
                <LinkIcon className="parishInfo__icon" />
                {' '}
                Спасылка на анлайн-трансляцыю
              </div>
              <div className="parishInfo__field">
                <a href={`${broadcastUrl}`} className="parishInfo__value" target="_blank" rel="noreferrer">{broadcastUrl}</a>
                <input type="text" className="parishInfo__input" value={broadcastUrl} onChange={(e) => setBroadcastUrl(e.target.value)} />
              </div>
            </li>
          </ul>

          <section className="parishInfo__footer">
            { editMode && <button type="button" className="btn btn-empty" onClick={handleCloseEdit}>Адмена</button> }
            <button type="button" className="btn" onClick={handleEdit}>Змяніць</button>
          </section>

        </section>

      </section>
    </section>
  );
};

export default ParishEdit;
