import classNames from 'classnames';
import styles from './ProfileForm.module.css';
import { FormProps } from './typings';

export function ProfileForm(props: FormProps) {
  const { handlerSubmit, title = '', children } = props;

  return (
    <form className={styles.form} onSubmit={handlerSubmit}>
      <h1 className={styles.title}>{title}</h1>
      <fieldset className={
          classNames(styles.fieldset, styles.fieldsetTwoColumns)
        }
      >
        {children}
      </fieldset>
    </form>
  );
}
