import { BASE_URL_API, USER } from '../../utils/apiConstans';
import { TUserNew } from './typings';

class UserAPI {
  constructor(private _baseUrl: string) {}

  async _handlingResponse(result: Response) {
    const data = await result.json();
    if (result.ok) return data;
    return Promise.reject(data.reason);
  }

  async create(data: TUserNew) {
    const response: Response = await fetch(`${this._baseUrl}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return this._handlingResponse(response);
  }
}

export const userAPI = new UserAPI(`${BASE_URL_API}${USER}`);
