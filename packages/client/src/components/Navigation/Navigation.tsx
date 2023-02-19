import { NavLink } from 'react-router-dom';
import { ButtonTheme } from '../ButtonTheme';
import { authApi } from '../../api/AuthAPI';
import styles from './Navigation.module.css';

export function Navigation() {
  const links = [
    { url: '/', title: 'Главная' },
    { url: '/authorization', title: 'Вход' },
    { url: '/registration', title: 'Регистрация' },
    { url: '/game', title: 'Игра' },
    { url: '/forum', title: 'Форум' },
  ];

  const activeLink = `${styles.navListLink} ${styles.linkActive}`;
  const normalLink = `${styles.navListLink}`;
  const addClass = ({
    isActive,
  }: { isActive: boolean }): string => (isActive ? activeLink : normalLink);

  function onLogout() {
    authApi.logoutUser()
      .then(() => {
        alert('Пользователь вышел из аккаунта');
      })
      .catch(() => alert('Что-то пошло не так!'));
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.navRow}>

          <ButtonTheme />

          <ul className={styles.navList}>
            {
              links.map(({ url, title }) => (
                <li className={styles.navListItem} key={url}>
                  <NavLink to={url} className={addClass}>{title}</NavLink>
                </li>
              ))
            }
            <li className={styles.navListItem}>
              <NavLink
                to="/"
                className={addClass}
                onClick={() => onLogout()}
              >
                Выход
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
