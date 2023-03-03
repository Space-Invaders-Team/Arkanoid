import styles from './ErrorPage.module.css';
import logo from '../../assets/img/logo.webp';
import { SERVER_ERROR_CODE, SERVER_ERROR_MESSAGE } from '../../utils/errorConstants';
import { Button } from '../../components/Button';
import { ErrorPageProps } from './typings';

export function ErrorPage({
  status = SERVER_ERROR_CODE,
  message = SERVER_ERROR_MESSAGE,
}: ErrorPageProps) {
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <main className={styles.container}>
      <img src={logo} alt="logo" className={styles.logo} />

      <h1>
        {status}
      </h1>

      <h2>
        {message}
      </h2>

      <Button
        mode="primary"
        shape="icon"
        extraClassName={styles.linkButton}
        onClick={refreshPage}
      >
        Обновить страницу
      </Button>
    </main>
  );
}
