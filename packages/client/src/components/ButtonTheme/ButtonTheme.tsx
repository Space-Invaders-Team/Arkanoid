import { useEffect, useState } from 'react';
import classNames from 'classnames';
import sun from '../../assets/icons/sun.svg';
import moon from '../../assets/icons/moon.svg';
import styles from './ButtonTheme.module.css';
import { useTheme } from '../../hooks/useTheme';

export function ButtonTheme() {
  const { theme, setTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const btnClassName = classNames(
    styles.darkModeBtn,
    { [styles.darkModeBtnActive]: isDarkMode },
  );

  useEffect(() => {
    setIsDarkMode(theme === 'dark');
  }, [theme]);

  const handleThemeClick = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      type="button"
      className={btnClassName}
      onClick={handleThemeClick}
      data-testid="toggleThemeBtn"
    >
      <img src={sun} alt="Light mode" className={styles.darkModeBtnIcon} />
      <img src={moon} alt="Dark mode" className={styles.darkModeBtnIcon} />
    </button>
  );
}
