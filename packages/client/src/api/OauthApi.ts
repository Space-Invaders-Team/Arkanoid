import { BASE_URL_YANDEX } from '../utils/apiConstans';

class OauthApi {
  constructor(baseUrl: string) {
    this._baseUrl = baseUrl;
  }

  private _baseUrl: string;

  async _handlingResponse(result: Response) {
    if (result.ok) return result;
    const data = await result.json();
    return Promise.reject(data.reason);
  }

  async loginWithYandexId(userData: StringObject) {
    const res = await fetch(`${this._baseUrl}/yandex`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return this._handlingResponse(res);
  }

  async getServiceId() {
    const res = await fetch(`${this._baseUrl}/yandex/service-id`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return this._handlingResponse(res);
  }
}

export const oauthApi = new OauthApi(`${BASE_URL_YANDEX}/oauth`);
