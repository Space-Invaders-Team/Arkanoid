import { NavLink } from 'react-router-dom';
import { ButtonTheme } from '../ButtonTheme';
import styles from './navigation.module.css';

export function Navigation() {
  const activeLink = `${styles.navListLink} ${styles.linkActive}`;
  const normalLink = `${styles.navListLink}`;

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.navRow}>

          <ButtonTheme />

          <ul className={styles.navList}>
            <li className={styles.navListItem}>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? activeLink : normalLink)}
                end
              >
                Главная
              </NavLink>
            </li>

            <li className={styles.navListItem}>
              <NavLink to="/authorization" className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                Вход
              </NavLink>
            </li>
            <li className={styles.navListItem}>
              <NavLink to="/registration" className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                Регистрация
              </NavLink>
            </li>
            <li className={styles.navListItem}>
              <NavLink to="/game" className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                Игра
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
