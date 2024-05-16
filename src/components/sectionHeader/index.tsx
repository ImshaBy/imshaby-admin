import './style.scss';

import React from 'react';
import { LogoutIcon, AddIcon } from '../icons';

interface props {
  title: string;
  massCreateOpen?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  logout?: () => void;
  pagination?: () => JSX.Element;
}

const SectionHeader = ({ title, massCreateOpen, logout, pagination }: props) => (
  <section className="sectionHeader">
    <div>
      <div className="sectionHeader__title">{title}</div>
      {!!massCreateOpen && pagination && <div className="pagination__block">{pagination()}</div>}
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
);

export default SectionHeader;
