import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LogoIcon, BulbIcon, ClockIcon, HomeIcon,
} from '../icons';

import './style.scss';

const Header = () => (
  <header className="header">
    <section className="container header__container">

      <section className="logo">
        <a href="https://qa.imsha.by" className="link">
          <LogoIcon className="icon" />
          <span className="logo__text">imsha.by</span>
        </a>
      </section>

      <section className="menu">
        <NavLink to="/schedule" className="link" activeClassName="link__active">
          <ClockIcon className="icon" />
          <span>расклад</span>
        </NavLink>
        <NavLink to="/parish" className="link" activeClassName="link__active">
          <HomeIcon className="icon" />
          <span>парафія</span>
        </NavLink>
        <NavLink to="/login" className="link" activeClassName="link__active">
          <LogoIcon className="icon" />
          <span>admin</span>
        </NavLink>
      </section>

      {/*<section className="help">*/}
      {/*  <NavLink to="/help" className="link" activeClassName="link__active">*/}
      {/*    <BulbIcon className="icon" />*/}
      {/*    <span>дапамога</span>*/}
      {/*  </NavLink>*/}
      {/*</section>*/}

    </section>
  </header>
);

export default Header;
