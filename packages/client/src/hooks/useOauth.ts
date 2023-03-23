import { useAppDispatch } from '../store/hooks';
import { oauthApi } from '../api/OauthApi';
import { setServiceId } from '../store/features/oauthSlice';
import { getUserData } from '../store/features/authSlice';

export const useOauth = () => {
  const dispatch = useAppDispatch();

  const getServiceId = async () => {
    try {
      const response = await oauthApi.getServiceId();
      const data = await response.json();
      dispatch(setServiceId(data.service_id));
    } catch (error) {
      console.log(error);
    }
  };

  const loginWithYandexId = async (code: string) => {
    try {
      const response = await oauthApi.loginWithYandexId({ code });
      if (response.ok) {
        localStorage.setItem('isLogged', 'true');
        dispatch(getUserData());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { loginWithYandexId, getServiceId };
};
