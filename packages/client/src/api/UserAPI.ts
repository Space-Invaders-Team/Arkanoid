import { BASE_URL_YANDEX } from '../utils/apiConstans';

class UserApi {
  constructor(baseUrl: string) {
    this._baseUrl = baseUrl;
  }

  private _baseUrl: string;

  async _handlingResponse(result: Response) {
    if (result.ok) return result;
    const data = await result.json();
    return Promise.reject(data.reason);
  }

  async updateAvatar(data: FormData) {
    const res = await fetch(`${this._baseUrl}/profile/avatar`, {
      method: 'PUT',
      credentials: 'include',
      body: data,
    });
    return this._handlingResponse(res);
  }

  async updateProfile(data: StringObject) {
    const res = await fetch(`${this._baseUrl}/profile`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return this._handlingResponse(res);
  }
}

export const userApi = new UserApi(`${BASE_URL_YANDEX}/user`);
