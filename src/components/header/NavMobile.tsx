import './navmobile-style.scss';
import { useClickAway } from 'react-use';
import { AnimatePresence, motion } from 'framer-motion';
import { Squash as Hamburger } from 'hamburger-react';
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useUnit } from 'effector-react';
import { $parish } from '../../models/parish';
import { $app, logout } from '../../models/app';

import {
  ClockIcon,
  HomeIcon,
  LogoIcon,
  LogoutIcon,
} from '../icons';

const routes = [
  {
    title: 'Расклад',
    href: '/schedule',
    Icon: ClockIcon,
  },
  {
    title: 'Парафія',
    href: '/parish',
    Icon: HomeIcon,
  },
  {
    title: 'Спіс парафій',
    href: '/select',
    Icon: LogoIcon,
  },
];


const NavMobile = () => {
  const ref = useRef(null);
  const { is_login } = useUnit($app);
  const [isOpen, setOpen] = useState(false);
  const parish = useUnit($parish);

  let imgPath = '';
  if (parish && parish.imgPath) {
    imgPath = parish.imgPath.includes('storage.yandexcloud.net') ? parish.imgPath : `https://imsha.by/${parish?.imgPath}`;
  }

  const toggleOpen = () => {
    setOpen(!isOpen);
  };

  useEffect(() => {
    document.querySelector('body')?.classList.toggle('fixed', isOpen);
  }, [isOpen]);

  useClickAway(ref, () => setOpen(false));

  return (
    <div style={{marginBottom: 56}}>
      <div className={`navmobile ${!is_login && 'center'}`} ref={ref}>
        {is_login && <Hamburger  toggled={isOpen} size={20} toggle={toggleOpen} color='white' />}
        {!isOpen && <Link className="navmobile__main_link" to='https://imsha.by'>
          <LogoIcon className="navmobile__imsha_icon" />
          <p style={{color: 'white'}}>Imsha.by</p>
        </Link>}
        {!isOpen && is_login && parish && <Link to='/parish' className="navmobile__parish__photo" style={{width: 40, height: 40, minWidth: 40}}>
          <img src={imgPath} alt={parish.name} className="navmobile__parish__img" style={{width: 40, height: 40, minWidth: 40}}/>
        </Link>}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="navmobile__container"
            >
              <ul className="navmobile__spis">
                {routes.map((route, idx) => {
                  const { Icon } = route;

                  return (
                    <motion.li
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      key={route.title}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.1 + idx / 10,
                      }}
                      className="navmobile__spis__element"
                    >
                      <NavLink
                        onClick={() => setOpen((prev) => !prev)}
                        to={route.href}
                        className={({ isActive, isPending }) => 
                          isPending ? "navmobile__spis__element__link" : isActive ? "navmobile__spis__element__link__active": "navmobile__spis__element__link"
                        }
                      >
                        <Icon className="element__icon" />
                        <span className="">{route.title}</span>
                      </NavLink>
                    </motion.li>
                  );
                })}
              </ul>
              <hr/>
              {parish && 
                <motion.section
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  key='parish'
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.2,
                  }}
                  className="navmobile__parish"
                >
                  <aside className="navmobile__parish__photo">
                    <img src={imgPath} alt={parish.name} className="navmobile__parish__img" />
                  </aside>
                  <section className="navmobile__parish__content">
                    <span className="navmobile__parish__title">{parish.name}</span>
                    <button type="button" className="navmobile__parish__action" onClick={() =>logout()}>
                      <LogoutIcon className="navmobile__parish__exit_icon" />
                      <span className="navmobile__parish__txt">Выйсці</span>
                    </button>
                  </section>
                </motion.section>}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className={`navmobile__backdrop ${isOpen ? 'open' : ''}`}>
      </div> 
    </div>
  );
};

export default NavMobile;
