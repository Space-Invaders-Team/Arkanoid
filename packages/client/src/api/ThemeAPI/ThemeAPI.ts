import { TThemes } from '../../typings';
import { BASE_URL_API, THEME_API_URL } from '../../utils/apiConstans';
import { TUserTheme } from './typings';

class ThemeAPI {
  constructor(private _baseUrl: string) {}

  async getUserTheme(userId: number) {
    const response: Response = await fetch(`${this._baseUrl}/${userId}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    }

    return Promise.reject(response.status);
  }

  async addThemes(data: TThemes[]) {
    const response: Response = await fetch(`${this._baseUrl}/add`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    }

    return Promise.reject(response.status);
  }

  async setActiveUserTheme(data: TUserTheme) {
    const response: Response = await fetch(`${this._baseUrl}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    }

    return Promise.reject(response.status);
  }

  async getThemes() {
    const response: Response = await fetch(`${this._baseUrl}/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result);
      return result;
    }

    return Promise.reject(response.status);
  }
}

export const themeAPI = new ThemeAPI(`${BASE_URL_API}${THEME_API_URL}`);
