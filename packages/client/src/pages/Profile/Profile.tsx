import styles from './Profile.module.css';
import { Avatar } from '../../components/Avatar';
import { useAppSelector } from '../../store/hooks';
import { selectUserData } from '../../store/selectors';
import { useProfile } from '../../hooks/useProfile';
import { Form } from '../../components/Form';
import { PageType } from '../../components/Form/typings';

export function Profile() {
  const { updateAvatar, updateProfile } = useProfile();
  const userData = useAppSelector(selectUserData);

  return (
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
      />
    </div>
  );
}
