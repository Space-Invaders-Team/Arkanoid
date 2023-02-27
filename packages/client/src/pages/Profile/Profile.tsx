import React, { useCallback, useState } from 'react';
import styles from './Profile.module.css';
import { UserProfile as UserProfileType, UserProfileForm } from './typings';
import { Button } from '../../components/Button';
import { ProfileForm } from '../../components/ProfileForm';
import { Field } from '../../components/ProfileField/Field';
import { userProfileInputFields } from './data';

export function Profile() {
  const userProfile: UserProfileType = {
    id: 13441,
    firstName: 'Masha',
    second_name: 'TestTest',
    login: 'login_test',
    display_name: 'test',
    email: 'test@test.com',
    phone: '89012003040',
    avatar: 'https://ya-praktikum.tech/api/v2/resources',
  };

  const formData: UserProfileForm = {
    firstName: userProfile.firstName ?? '',
    second_name: userProfile.second_name ?? '',
    login: userProfile.login ?? '',
    display_name: userProfile.display_name ?? '',
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

  const avatarPath = userProfile.avatar;
  const { firstName } = userProfile;

  return (
    <div className={styles.container}>

      <img src={avatarPath} alt={`Аватар ${firstName}`} />

      <ProfileForm handlerSubmit={submitHandler} firstName={firstName}>
        <>
          {userProfileInputFields.map((field) => {
            const fieldKey = field.id as keyof UserProfileForm;

            return (
              <Field key={field.id} {...field} onChange={inputChangeHandler} value={requestBody[fieldKey] || ''} />
            );
          })}
        </>
        <Button type="submit" extraClassName={styles.button} />
      </ProfileForm>
    </div>
  );
}
