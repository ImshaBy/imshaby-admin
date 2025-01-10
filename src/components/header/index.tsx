import './style.scss';

import { NavLink } from 'react-router-dom';

import { ClockIcon, HomeIcon, LogoIcon } from '../icons';
import NavMobile from './NavMobile';

interface HeaderProps {
  schedule?: boolean;
  parish?: boolean;
  select?: boolean;
  logo?: boolean;
}

const Header = ({ schedule = true, parish = true, select = true, logo = true }: HeaderProps) => (
  <>
    <div className="header__desktop">
      <header className="header">
        <section className="container header__container">
          {logo && (
            <section className="logo">
              <a href="https://imsha.by/" className="link">
                <LogoIcon className="icon" />
                <span className="logo__text">imsha.by</span>
              </a>
            </section>
          )}

          <section className="menu">
            {schedule && (
              <NavLink
                to="/schedule"
                className={({ isActive}) =>
                  isActive ? "link active" : "link"
                }
              >
                <ClockIcon className="icon" />
                <span>расклад</span>
              </NavLink>
            )}
            {parish && (
              <NavLink
                to="/parish"
                className={({ isActive}) =>
                  isActive ? "link active" : "link"
                }
              >
                <HomeIcon className="icon" />
                <span>парафія</span>
              </NavLink>
            )}
            {select && (
              <NavLink
                to="/select"
                className={({ isActive}) =>
                  isActive ? "link active" : "link"
                }
              >                <LogoIcon className="icon" />
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
    </div>
    <div className="header__mobile">
      <NavMobile />
    </div>
  </>
);

export default Header;
