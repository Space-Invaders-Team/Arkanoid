import { useState, useEffect } from 'react';
import { authApi } from '../api/AuthAPI';
import { StringObject } from '../typings';
import * as errorConstants from '../utils/errorConstants';

export const useAuth = () => {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('isLogged')) {
      authApi.checkToken()
        .then((data) => {
          if (data) {
            setIsLogged(true);
          } else localStorage.removeItem('isLogged');
        })
        .catch(() => alert(errorConstants.SERVER_ERROR_MESSAGE));
    }
  }, []);

  const onLogin = async (userData: StringObject) => {
    try {
      await authApi.loginUser(userData);
      localStorage.setItem('isLogged', 'true');
      setIsLogged(true);
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
      setIsLogged(true);
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
      setIsLogged(false);
    } catch {
      alert(errorConstants.SERVER_ERROR_MESSAGE);
    }
  };

  return { isLogged, onLogin, onRegister, onLogout };
};
