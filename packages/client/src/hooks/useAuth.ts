import { useEffect } from 'react';
import { useAppDispatch } from '../store/hooks';
import { authApi } from '../api/AuthAPI';
import { StringObject } from '../typings';
import * as errorConstants from '../utils/errorConstants';
import { setIsLogged } from '../store/authSlice';

export const useAuth = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem('isLogged')) {
      authApi.checkToken()
        .then((data) => {
          if (data) {
            dispatch(setIsLogged(true));
          } else localStorage.removeItem('isLogged');
        })
        .catch(() => alert(errorConstants.SERVER_ERROR_MESSAGE));
    }
  }, []);

  const onLogin = async (userData: StringObject) => {
    try {
      await authApi.loginUser(userData);
      localStorage.setItem('isLogged', 'true');
      dispatch(setIsLogged(true));
    } catch (error) {
      if (error === errorConstants.AUTH_ERROR_CODE) {
        alert(errorConstants.AUTH_ERROR_MESSAGE);
      } else {
        alert(errorConstants.SERVER_ERROR_MESSAGE);
      }
    }
  };

  const onRegister = async (userData: StringObject) => {
    try {
      await authApi.registerUser(userData);
      localStorage.setItem('isLogged', 'true');
      dispatch(setIsLogged(true));
      alert(errorConstants.SUCCESSFUL_REGISTRATION_MESSAGE);
    } catch (error) {
      if (error === errorConstants.CONFLICT_ERROR_CODE) {
        alert(errorConstants.CONFLICT_ERROR_MESSAGE);
      } else {
        alert(errorConstants.SERVER_ERROR_MESSAGE);
      }
    }
  };

  const onLogout = async () => {
    try {
      await authApi.logoutUser();
      localStorage.removeItem('isLogged');
      dispatch(setIsLogged(false));
    } catch {
      alert(errorConstants.SERVER_ERROR_MESSAGE);
    }
  };

  return { onLogin, onRegister, onLogout };
};
