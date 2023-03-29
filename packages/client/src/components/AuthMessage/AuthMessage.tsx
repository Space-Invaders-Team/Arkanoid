import styles from './AuthMessage.module.css';

export function AuthMessage({ message }: { message: string }) {
  return (
    <div className={styles.authMessage}>
      {message}
    </div>
  );
}
