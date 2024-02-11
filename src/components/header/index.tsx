import './style.scss';

import React from 'react';
import { NavLink } from 'react-router-dom';

import {
  ClockIcon,
  HomeIcon,
  LogoIcon,
} from '../icons';

interface HeaderProps {
  schedule?: boolean,
  parish?: boolean,
  select?: boolean,
  logo?: boolean,
}

const Header = ({
  schedule = true,
  parish = true,
  select = true,
  logo = true,
}: HeaderProps) => (
  <header className="header">
    <section className="container header__container">

      {logo && (
        <section className="logo">
          <a href="https://imsha.by" className="link">
            <LogoIcon className="icon" />
            <span className="logo__text">imsha.by</span>
          </a>
        </section>
      )}

      <section className="menu">
        {schedule && (
          <NavLink to="/schedule" className="link" activeClassName="link__active">
            <ClockIcon className="icon" />
            <span>расклад</span>
          </NavLink>
        )}
        {parish && (
          <NavLink to="/parish" className="link" activeClassName="link__active">
            <HomeIcon className="icon" />
            <span>парафія</span>
          </NavLink>
        )}
        {select && (
          <NavLink to="/select" className="link" activeClassName="link__active">
            <LogoIcon className="icon" />
            <span>спіс парафій</span>
          </NavLink>
        )}
      </section>

      {/* <section className="help"> */}
      {/*  <NavLink to="/help" className="link" activeClassName="link__active"> */}
      {/*    <BulbIcon className="icon" /> */}
      {/*    <span>дапамога</span> */}
      {/*  </NavLink> */}
      {/* </section> */}

    </section>
  </header>
);

export default Header;
