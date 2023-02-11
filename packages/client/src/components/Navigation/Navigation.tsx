import { NavLink } from 'react-router-dom';
import { ButtonTheme } from '../ButtonTheme';
import styles from './navigation.module.css';

export function Navigation() {
  const activeLink = `${styles.navListLink} ${styles.linkActive}`;
  const normalLink = `${styles.navListLink}`;
  const addClass = ({
    isActive,
  }: { isActive: boolean }): string => (isActive ? activeLink : normalLink);

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.navRow}>

          <ButtonTheme />

          <ul className={styles.navList}>
            <li className={styles.navListItem}>
              <NavLink
                to="/"
                className={addClass}
                end
              >
                Главная
              </NavLink>
            </li>

            <li className={styles.navListItem}>
              <NavLink to="/authorization" className={addClass}>
                Вход
              </NavLink>
            </li>
            <li className={styles.navListItem}>
              <NavLink to="/registration" className={addClass}>
                Регистрация
              </NavLink>
            </li>
            <li className={styles.navListItem}>
              <NavLink to="/game" className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                Игра
              </NavLink>
            </li>
            <li className={styles.navListItem}>
              <NavLink to="/game" className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                Игра
              </NavLink>
            </li>
            <li className={styles.navListItem}>
              <NavLink to="/forum" className={addClass}>
                Форум
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
