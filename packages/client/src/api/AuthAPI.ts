import { StringObject } from './typings';

class AuthApi {
  constructor(baseUrl: string) {
    this._baseUrl = baseUrl;
  }

  private _baseUrl: string;

  // Обработка ответа сервера
  _handlingResponse(result: Response) {
    if (result.ok) return result;
    return Promise.reject(result.status);
  }

  // Вход пользователя
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

  // Выход пользователя
  async logoutUser() {
    const res = await fetch(`${this._baseUrl}/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });
    return this._handlingResponse(res);
  }

  // Регистрация пользователя
  async registerUser(userData: StringObject) {
    const res = await fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return this._handlingResponse(res);
  }
}

export const authApi = new AuthApi('https://ya-praktikum.tech/api/v2/auth');
