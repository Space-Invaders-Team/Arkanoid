import { NavLink } from 'react-router-dom';
import { ButtonTheme } from '../ButtonTheme/ButtonTheme';
import styles from './navbar.module.css';

export function Navbar() {
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
          </ul>
        </div>
      </div>
    </nav>
  );
}
