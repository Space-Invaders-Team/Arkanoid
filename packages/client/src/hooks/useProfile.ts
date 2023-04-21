import { ChangeEvent } from 'react';
import { userApi } from '../api/UserAPI';
import { useAppDispatch } from '../store/hooks';
import { getUserData } from '../store/features/authSlice';

export const useProfile = () => {
  const dispatch = useAppDispatch();
  const updateAvatar = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return;
    const formData = new FormData();
    formData.append('avatar', event.target.files[0]);
    try {
      await userApi.updateAvatar(formData);
      dispatch(getUserData());
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
    } catch (errorMessage) {
      console.log(errorMessage);
    }
  };

  return { updateAvatar, updateProfile };
};
