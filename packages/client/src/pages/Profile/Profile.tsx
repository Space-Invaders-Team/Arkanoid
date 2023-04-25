import { useState } from 'react';
import styles from './Profile.module.css';
import { Avatar } from '../../components/Avatar';
import { useAppSelector } from '../../store/hooks';
import { selectUserData } from '../../store/selectors';
import { useProfile } from '../../hooks/useProfile';
import { Form } from '../../components/Form';
import { PageType } from '../../components/Form/typings';
import { Popup } from '../../components/Popup';

export function Profile() {
  const { updateAvatar, updateProfile } = useProfile();
  const userData = useAppSelector(selectUserData);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <>
      <div className={styles.container}>
        <label className={styles.avatar} htmlFor="avatar">
          <input
            className={styles.avatarEdit}
            type="file"
            id="avatar"
            name="avatar"
            accept="image/*"
            onChange={updateAvatar}
          />
          <Avatar
            path={userData?.avatar}
            userId={userData?.id}
            userName={`Аватар ${userData?.display_name}`}
            avatarSize="big"
          />
        </label>
        <Form
          pageType={PageType.Profile}
          title="Профиль"
          button="Сохранить изменения"
          text="Изменить пароль"
          onSubmitForm={updateProfile}
          userData={userData}
          btnId="btn-profile"
        />
        <div
          className={styles.passwordEdit}
          onClick={togglePopup}
          aria-hidden="true"
        >
          Изменить пароль
        </div>
      </div>
      <Popup
        isOpen={isPopupOpen}
        onClose={togglePopup}
      />
    </>
  );
}
