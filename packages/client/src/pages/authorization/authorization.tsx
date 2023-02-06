import styles from './authorization.module.css';
import Form from '../../components/form';

export function Authorization() {
  return (
    <div className={styles.container}>
      <Form
        pageType={'signin'}
        title='Авторизация'
        button='Войти'
        text='Еще не зарегистрированы?'
      />
    </div>
  );
}
