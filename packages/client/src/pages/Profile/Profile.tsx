import React, { useCallback, useState } from 'react';
import styles from './Profile.module.css';
import { UserProfile as UserProfileType, UserProfileForm } from './typings';
import { Button } from '../../components/Button';
import { ProfileForm } from '../../components/ProfileForm';
import { Field } from '../../components/ProfileField/Field';
import { Avatar } from '../../components/Avatar';
import { userProfileInputFields } from './data';
import { useAppSelector } from '../../store/hooks';
import { selectUserData } from '../../store/selectors';
import { useProfile } from '../../hooks/useProfile';

export function Profile() {
  const userProfile: UserProfileType = {
    id: 13441,
    title: 'fdhdz',
    firstName: 'Masha',
    secondName: 'TestTest',
    login: 'login_test',
    displayName: 'test',
    email: 'test@test.com',
    phone: '89012003040',
    avatar: '',
  };

  const formData: UserProfileForm = {
    title: userProfile.firstName ?? '',
    firstName: userProfile.firstName ?? '',
    secondName: userProfile.secondName ?? '',
    login: userProfile.login ?? '',
    displayName: userProfile.displayName ?? '',
    email: userProfile.email ?? '',
    phone: userProfile.phone ?? '',
    oldPassword: '',
    newPassword: '',
  };
  const [requestBody, setRequestBody] = useState<UserProfileForm>(formData);

  const inputChangeHandler: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      const { name, value } = event.target;

      setRequestBody({ ...requestBody, [name]: value });
    },
    [requestBody],
  );

  const submitHandler: React.FormEventHandler<HTMLFormElement> = useCallback(
    (event) => {
      event.preventDefault();
    },
    [],
  );

  const { updateAvatar } = useProfile();
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

      <ProfileForm handlerSubmit={submitHandler} title={userData?.display_name}>
        {userProfileInputFields.map((field) => {
          const fieldKey = field.id as keyof UserProfileForm;
          return (
            <Field key={field.id} {...field} onChange={inputChangeHandler} value={requestBody[fieldKey] || ''} />
          );
        })}
      </ProfileForm>
      <Button type="submit" extraClassName={styles.button} text="Сохранить изменения" />
    </div>
  );
}
