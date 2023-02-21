import { StringObject } from '../typings';

class AuthApi {
  constructor(baseUrl: string) {
    this._baseUrl = baseUrl;
  }

  private _baseUrl: string;

  _handlingResponse(result: Response) {
    if (result.ok) return result;
    return Promise.reject(result.status);
  }

  async loginUser(userData: StringObject) {
    const res = await fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return this._handlingResponse(res);
  }

  async logoutUser() {
    const res = await fetch(`${this._baseUrl}/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });
    return this._handlingResponse(res);
  }

  async registerUser(userData: StringObject) {
    const res = await fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return this._handlingResponse(res);
  }

  async checkToken() {
    const res = await fetch(`${this._baseUrl}/user`, {
      credentials: 'include',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return this._handlingResponse(res);
  }
}

export const authApi = new AuthApi('https://ya-praktikum.tech/api/v2/auth');
