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
  const [errorMessage, setErrorMessage] = useState('');

  const hideMessage = () => {
    const timeout = setTimeout(() => setErrorMessage(''), TIMEOUT_MESSAGE);

    return () => {
      clearTimeout(timeout);
    };
  };

  const onLogin = async (userData: StringObject) => {
    try {
      await authApi.loginUser(userData);
      dispatch(setIsLogged(true));
      dispatch(getUserData());
    } catch (errorMessage) {
      if (errorMessage === AUTH_ERROR_MESSAGE_EN) {
        setErrorMessage(AUTH_ERROR_MESSAGE_RU);
      } else {
        if (typeof errorMessage === 'string') {
          setErrorMessage(errorMessage);
        }
        return;
      }
      hideMessage();
    }
  };

  const onRegister = async (userData: StringObject) => {
    try {
      await authApi.registerUser(userData);
      dispatch(setIsLogged(true));
      dispatch(getUserData());
    } catch (errorMessage) {
      if (errorMessage === CONFLICT_ERROR_EMAIL_EN) {
        setErrorMessage(CONFLICT_ERROR_EMAIL_RU);
      } else if (errorMessage === CONFLICT_ERROR_LOGIN_EN) {
        setErrorMessage(CONFLICT_ERROR_LOGIN_RU);
      } else {
        if (typeof errorMessage === 'string') {
          setErrorMessage(errorMessage);
        }
        return;
      }
      hideMessage();
    }
  };

  const onLogout = async () => {
    try {
      await authApi.logoutUser();
      dispatch(clearAuthStore());
    } catch (errorMessage) {
      setErrorMessage(errorMessage as string);
      hideMessage();
    }
  };

  return { onLogin, onRegister, onLogout, errorMessage };
};
