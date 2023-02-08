import { Link } from 'react-router-dom';
import styles from './header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerWrapper}>
        <h1 className={styles.headerTitle}>
          Arkanoid
        </h1>
        <div className={styles.headerText}>
          <h2>Испытай себя в лучшей версии классической игры!</h2>
        </div>
        <Link className={styles.linkBtn} to="/authorization">Войти</Link>
      </div>
    </header>
  );
}
