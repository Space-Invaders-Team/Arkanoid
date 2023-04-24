/* eslint-disable no-console */
import { ChangeEvent } from 'react';
import { userApi } from '../api/UserAPI';
import { userAPI as userDbAPI } from '../api/UserAPI/UserAPI';
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
      await userApi.updateAvatar(formData);
      dispatch(getUserData());

      if (userData) {
        const avatarNew = { avatar: userData.avatar };
        await userDbAPI.update(userData.id, avatarNew);
      }
    } catch (errorMessage) {
      console.log(errorMessage);
    }
  };

  const updateProfile = async (formData: StringObject) => {
    delete formData.avatar;
    try {
      await userApi.updateProfile(formData);
      console.log('Данные профиля изменены');
      dispatch(getUserData());
      if (userData) {
        await userDbAPI.update(userData.id, formData);
      }
    } catch (errorMessage) {
      console.log(errorMessage);
    }
  };

  return { updateAvatar, updateProfile };
};
