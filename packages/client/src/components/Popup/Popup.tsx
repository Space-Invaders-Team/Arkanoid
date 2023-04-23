import classNames from 'classnames';
import { PopupProps } from './typings';
import { Form } from '../Form';
import { PageType } from '../Form/typings';
import { useProfile } from '../../hooks/useProfile';
import styles from './Popup.module.css';

export function Popup({ isOpen, onClose }: PopupProps) {
  const { changePassword } = useProfile();

  return (
    <article className={classNames(styles.popup, { [styles.popupOpened]: isOpen })}>
      <div onClick={onClose} className={styles.overlay} aria-hidden="true" />
      <div className={styles.container}>
        <Form
          btnId="btn-password"
          pageType={PageType.Password}
          title="Смена пароля"
          button="Изменить"
          text="Еще не зарегистрированы?"
          onSubmitForm={changePassword}
          isOpen={isOpen}
        />
        <button
          type="button"
          aria-label="Кнопка закрытия окна"
          className={styles.closeButton}
          onClick={onClose}
        />
      </div>
    </article>
  );
}
