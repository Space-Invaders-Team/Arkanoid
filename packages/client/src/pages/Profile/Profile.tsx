import React, { useCallback, useState } from 'react';
import styles from './Profile.module.css';
import { UserProfile as UserProfileType, UserProfileForm } from './typings';
import { Button } from '../../components/Button';
import { ProfileForm } from '../../components/ProfileForm';
import { Field } from '../../components/ProfileField/Field';
import { Avatar } from '../../components/Avatar';
import { userProfileInputFields } from './data';

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
    [requestBody],
  );

  const { firstName } = userProfile;

  return (
    <div className={styles.container}>
      <Avatar userId={0} userName={`Аватар ${firstName}`} />

      <ProfileForm handlerSubmit={submitHandler} title={firstName}>
        <>
          {userProfileInputFields.map((field) => {
            const fieldKey = field.id as keyof UserProfileForm;
            return (
              <Field key={field.id} {...field} onChange={inputChangeHandler} value={requestBody[fieldKey] || ''} />
            );
          })}
        </>
      </ProfileForm>
      <Button type="submit" extraClassName={styles.button} text="Сохранить изменения" />
    </div>
  );
}
