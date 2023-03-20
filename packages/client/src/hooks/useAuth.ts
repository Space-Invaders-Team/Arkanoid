import { useAppDispatch } from '../store/hooks';
import { authApi } from '../api/AuthAPI';
import * as errorConstants from '../utils/messageConstants';
import { setIsLogged, getUserData, clearAuthStore } from '../store/features/authSlice';

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const onLogin = async (userData: StringObject) => {
    try {
      await authApi.loginUser(userData);
      dispatch(setIsLogged(true));
      dispatch(getUserData());
    } catch (errorMessage) {
      alert(errorMessage);
    }
  };

  const onRegister = async (userData: StringObject) => {
    try {
      await authApi.registerUser(userData);
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
      dispatch(clearAuthStore());
    } catch (errorMessage) {
      alert(errorMessage);
    }
  };

  return { onLogin, onRegister, onLogout };
};
