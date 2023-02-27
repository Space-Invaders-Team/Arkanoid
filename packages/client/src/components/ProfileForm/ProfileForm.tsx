import styles from './ProfileForm.module.css';
import { FormProps } from './typings';

export function ProfileForm(props: FormProps) {
  const { handlerSubmit, firstName = '', children } = props;

  return (
    <form className={styles.form} onSubmit={handlerSubmit}>
      <h1 className={styles.first_name}>{firstName}</h1>
      {children}
    </form>
  );
}
