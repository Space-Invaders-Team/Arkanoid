import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ButtonTheme } from '../ButtonTheme';
import styles from './Navigation.module.css';
import { Paths, Titles } from '../../utils/routeConstants';
import { useAppSelector } from '../../store/hooks';
import { useAuth } from '../../hooks/useAuth';
import burger from '../../assets/icons/burger.svg';
import { selectIsLogged, selectNavLinksByIsLogged } from '../../store/selectors';

export function Navigation() {
  const links = useAppSelector(selectNavLinksByIsLogged);
  const activeLink = `${styles.navListLink} ${styles.linkActive}`;
  const normalLink = `${styles.navListLink}`;
  const [navIsOpen, setNavIsOpen] = useState<boolean>(false);

  const addClass = ({
    isActive,
  }: { isActive: boolean }): string => (isActive ? activeLink : normalLink);

  const isLogged = useAppSelector(selectIsLogged);
  const { onLogout } = useAuth();

  const toggleNav = () => {
    setNavIsOpen(!navIsOpen);
  };

  const hideNav = () => {
    setNavIsOpen(false);
  };

  return (
    <nav className={styles.nav} data-testid="navigation">
      <div className={styles.container}>
        <div className={styles.navRow}>

          <ButtonTheme />

          <ul className={styles.navList} data-open={navIsOpen}>
            <button className={styles.toggleNav} onClick={toggleNav}>
              <img src={burger} alt="Toggle menu" />
            </button>
            {links
              && links.map(({ url, title }) => (
                <li className={styles.navListItem} key={`id + ${Math.random().toString(16).slice(2)}`}>
                  <NavLink onClick={hideNav} to={url} className={addClass}>{title}</NavLink>
                </li>
              ))}
            {isLogged && (
              <li className={styles.navListItem}>
                <Link
                  to={Paths.HOME}
                  className={normalLink}
                  onClick={() => onLogout()}
                >
                  {Titles.LOGOUT}
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
