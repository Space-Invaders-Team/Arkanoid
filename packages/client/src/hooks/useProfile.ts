/* eslint-disable no-console */
import { ChangeEvent } from 'react';
import { profileApi } from '../api/ProfileAPI';
import { userAPI } from '../api/UserAPI/UserAPI';
import { useAppDispatch, useAppSelector } from '../store/hooks';

import { getUserData } from '../store/features/authSlice';
import { StringObject } from '../typings';
import { selectUserData } from '../store/selectors';

export const useProfile = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(selectUserData);

  const updateAvatar = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return;
    const formData = new FormData();
    formData.append('avatar', event.target.files[0]);
    try {
      await profileApi.updateAvatar(formData)
        .then((resp) => resp.json())
        .then(async (json) => {
          await userAPI.update(json.id, { avatar: json.avatar });
        });
      dispatch(getUserData());
    } catch (errorMessage) {
      console.log(errorMessage);
    }
  };

  const updateProfile = async (formData: StringObject) => {
    delete formData.avatar;
    try {
      await profileApi.updateProfile(formData);
      console.log('Данные профиля изменены');
      dispatch(getUserData());
      if (userData) {
        await userAPI.update(userData.id, formData);
      }
    } catch (errorMessage) {
      console.log(errorMessage);
    }
  };

  const changePassword = async (formData: StringObject) => {
    try {
      await profileApi.changePassword(formData);
      console.log('Пароль изменен');
      dispatch(getUserData());
    } catch (errorMessage) {
      console.log(errorMessage);
    }
  };

  return { updateAvatar, updateProfile, changePassword };
};
