import { useAppDispatch } from '../store/hooks';
import { authApi } from '../api/AuthAPI';
import { StringObject } from '../typings';
import * as errorConstants from '../utils/errorConstants';
import { setIsLogged, getUserData, clearAuthStore } from '../store/authSlice';

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const onLogin = async (userData: StringObject) => {
    try {
      await authApi.loginUser(userData);
      localStorage.setItem('isLogged', 'true');
      dispatch(setIsLogged(true));
      dispatch(getUserData());
    } catch (errorMessage) {
      alert(errorMessage);
    }
  };

  const onRegister = async (userData: StringObject) => {
    try {
      await authApi.registerUser(userData);
      localStorage.setItem('isLogged', 'true');
      dispatch(setIsLogged(true));
      dispatch(getUserData());
      alert(errorConstants.SUCCESSFUL_REGISTRATION_MESSAGE);
    } catch (errorMessage) {
      alert(errorMessage);
    }
  };

  const onLogout = async () => {
    try {
      await authApi.logoutUser();
      localStorage.removeItem('isLogged');
      dispatch(clearAuthStore());
    } catch (errorMessage) {
      alert(errorMessage);
    }
  };

  return { onLogin, onRegister, onLogout };
};
