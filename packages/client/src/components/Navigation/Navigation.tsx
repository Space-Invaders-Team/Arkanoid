import { NavLink, Link } from 'react-router-dom';
import { ButtonTheme } from '../ButtonTheme';
import { NavigationProps } from './typings';
import styles from './Navigation.module.css';
import { Paths } from '../../utils/routeConstants';

export function Navigation({ isLogged, onLogout }: NavigationProps) {
  const links = [
    { url: Paths.HOME, title: 'Главная', protect: 'always' },
    { url: Paths.AUTH, title: 'Вход', protect: false },
    { url: Paths.REGISTER, title: 'Регистрация', protect: false },
    { url: Paths.GAME, title: 'Игра', protect: true },
    { url: Paths.LEADERBOARD, title: 'Рейтинг игроков', protect: true },
    { url: Paths.FORUM, title: 'Форум', protect: true },
    { url: Paths.PROFILE, title: 'Профиль', protect: true },
  ];

  const activeLink = `${styles.navListLink} ${styles.linkActive}`;
  const normalLink = `${styles.navListLink}`;
  const addClass = ({
    isActive,
  }: { isActive: boolean }): string => (isActive ? activeLink : normalLink);

  return (
    <nav className={styles.nav} data-testid="navigation">
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
                  to={Paths.HOME}
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
