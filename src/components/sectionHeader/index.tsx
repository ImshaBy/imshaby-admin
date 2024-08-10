import './style.scss';

import React from 'react';
import { LogoutIcon, AddIcon } from '../icons';

interface props {
  title: string;
  massCreateOpen?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  logout?: () => void;
  pagination?: () => JSX.Element;
  currentWeek?: () => JSX.Element;
}

const SectionHeader = ({ title, massCreateOpen, logout, pagination, currentWeek }: props) => (
  <>
    <section className="sectionHeader">
      <div>
        <div className="sectionHeader__title">{title}</div>
      </div>
      {!!logout && (
        <button type="button" className="sectionHeader__action" onClick={logout}>
          <LogoutIcon className="sectionHeader__icon" />
          <span className="sectionHeader__txt">Выйсці</span>
        </button>
      )}
      {!!massCreateOpen && (
        <button type="button" className="sectionHeader__action sectionHeader__addAction" onClick={massCreateOpen}>
          <span className="sectionHeader__txt">Дадаць Імшу</span>
          <AddIcon className="sectionHeader__addIcon" />
        </button>
      )}
    </section>
    {!!massCreateOpen && (
      <section className="sectionHeader">
        <div className="pagination__block">{!!pagination && pagination()}</div>
        <div className="pagination__block">{!!currentWeek && currentWeek()}</div>
      </section>
    )}
  </>
);

export default SectionHeader;
