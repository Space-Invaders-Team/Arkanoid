import { Link } from 'react-router-dom';
import { Paths } from '../../utils/routeConstants';
import styles from './LandingHeader.module.css';

export function LandingHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.headerWrapper}>
        <h1 className={styles.headerTitle}>
          Arkanoid
        </h1>
        <div className={styles.headerText}>
          <h2>Испытай себя в лучшей версии классической игры!</h2>
        </div>
        <Link className={styles.linkBtn} to={Paths.AUTH}>Войти</Link>
      </div>
    </header>
  );
}
