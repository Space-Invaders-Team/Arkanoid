import styles from './header.module.css';
import stylesApp from '../../App.module.css';

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
        <a href="#!" className={stylesApp.btn}>
          Вход
        </a>
      </div>
    </header>
  );
}
