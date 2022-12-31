import './style.scss';

import React from 'react';

import { LogoutIcon } from '../icons';

interface props {
  title: string;
  action?: boolean;
  callback?: () => void;
}

const SectionHeader = ({ title, action = false, callback } : props) => (
  <section className="sectionHeader">
    <span className="sectionHeader__title">{ title }</span>
    {
      action && (
        <>
          <button type="button" className="sectionHeader__action" onClick={callback}>
            <LogoutIcon className="sectionHeader__icon" />
            <span className="sectionHeader__txt">Выйсці</span>
          </button>
        </>
      )
    }

  </section>
);

export default SectionHeader;
