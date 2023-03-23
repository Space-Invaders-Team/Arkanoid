import { useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { authApi } from '../api/AuthAPI';
import { setIsLogged, getUserData, clearAuthStore } from '../store/features/authSlice';
import {
  AUTH_ERROR_MESSAGE_RU,
  AUTH_ERROR_MESSAGE_EN,
  CONFLICT_ERROR_EMAIL_RU,
  CONFLICT_ERROR_EMAIL_EN,
  CONFLICT_ERROR_LOGIN_RU,
  CONFLICT_ERROR_LOGIN_EN,
  TIMEOUT_MESSAGE,
} from '../utils/messageConstants';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const [isErrorMessage, setErrorMessage] = useState('');

  const hideMessage = () => {
    setTimeout(() => setErrorMessage(''), TIMEOUT_MESSAGE);
  };

  const onLogin = async (userData: StringObject) => {
    try {
      await authApi.loginUser(userData);
      localStorage.setItem('isLogged', 'true');
      dispatch(setIsLogged(true));
      dispatch(getUserData());
    } catch (errorMessage) {
      if (errorMessage === AUTH_ERROR_MESSAGE_EN) {
        setErrorMessage(AUTH_ERROR_MESSAGE_RU);
      } else setErrorMessage(errorMessage as string);
      hideMessage();
    }
  };

  const onRegister = async (userData: StringObject) => {
    try {
      await authApi.registerUser(userData);
      localStorage.setItem('isLogged', 'true');
      dispatch(setIsLogged(true));
      dispatch(getUserData());
    } catch (errorMessage) {
      if (errorMessage === CONFLICT_ERROR_EMAIL_EN) {
        setErrorMessage(CONFLICT_ERROR_EMAIL_RU);
      } else if (errorMessage === CONFLICT_ERROR_LOGIN_EN) {
        setErrorMessage(CONFLICT_ERROR_LOGIN_RU);
      } else setErrorMessage(errorMessage as string);
      hideMessage();
    }
  };

  const onLogout = async () => {
    try {
      await authApi.logoutUser();
      localStorage.removeItem('isLogged');
      dispatch(clearAuthStore());
    } catch (errorMessage) {
      setErrorMessage(errorMessage as string);
      hideMessage();
    }
  };

  return { onLogin, onRegister, onLogout, isErrorMessage };
};
