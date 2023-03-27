import styles from './Loader.module.css';

export function Loader() {
  return (
    <div className={styles.loader} data-testid="loader">
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  );
}
