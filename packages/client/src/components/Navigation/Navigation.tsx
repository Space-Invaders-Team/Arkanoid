import { NavLink, Link } from 'react-router-dom';
import { ButtonTheme } from '../ButtonTheme';
import { NavigationProps } from './typings';
import styles from './Navigation.module.css';

export function Navigation({ isLogged, onLogout }: NavigationProps) {
  const links = [
    { url: '/', title: 'Главная', protect: 'always' },
    { url: '/authorization', title: 'Вход', protect: false },
    { url: '/registration', title: 'Регистрация', protect: false },
    { url: '/game', title: 'Игра', protect: true },
    { url: '/leaderboard', title: 'Рейтинг игроков', protect: true },
    { url: '/forum', title: 'Форум', protect: true },
    { url: '/profile', title: 'Профиль', protect: true },
  ];

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
            {isLogged
              ? (links.map(({ url, title, protect }) => (
                (protect || protect === 'always')
                && (
                  <li className={styles.navListItem} key={url}>
                    <NavLink to={url} className={addClass}>{title}</NavLink>
                  </li>
                )
              )))
              : (links.map(({ url, title, protect }) => (
                (!protect || protect === 'always')
                && (
                  <li className={styles.navListItem} key={url}>
                    <NavLink to={url} className={addClass}>{title}</NavLink>
                  </li>
                )
              )))}
            {isLogged && (
              <li className={styles.navListItem}>
                <Link
                  to="/"
                  className={normalLink}
                  onClick={() => onLogout()}
                >
                  Выход
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
