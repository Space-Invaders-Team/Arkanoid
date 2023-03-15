import styles from './AuthMessage.module.css';

export function AuthMessage() {
  return (
    <div className={styles.authMessage}>
      Не верная почта или пароль
    </div>
  );
}
