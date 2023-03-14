import sun from '../../assets/icons/sun.svg';
import moon from '../../assets/icons/moon.svg';
import styles from './ButtonTheme.module.css';
import { useTheme } from '../../hooks/useTheme';

export function ButtonTheme() {
  const { theme, setTheme } = useTheme();

  const btnNormal = `${styles.darkModeBtn}`;
  const btnActive = `${styles.darkModeBtn} ${styles.darkModeBtnActive}`;

  const handleThemeClick = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  return (

    <button
      type="button"
      className={theme === 'dark' ? btnActive : btnNormal}
      onClick={handleThemeClick}
      data-testid="toggleThemeBtn"
    >

      <img src={sun} alt="Light mode" className={styles.darkModeBtnIcon} />

      <img src={moon} alt="Dark mode" className={styles.darkModeBtnIcon} />

    </button>

  );
}
