import { BASE_URL_YANDEX, LEADERBOARD } from '../../utils/apiConstans';
import { TLeaderboard, TLider } from './typings';

class LeaderboardAPI {
  constructor(private _baseUrl: string) {}

  async getAllLiders(data: TLeaderboard) {
    const response: Response = await fetch(`${this._baseUrl}/all`, {
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

  async addLider(data: TLider) {
    const response: Response = await fetch(`${this._baseUrl}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) return response;

    return Promise.reject(response.status);
  }
}

export const leaderboardAPI = new LeaderboardAPI(`${BASE_URL_YANDEX}${LEADERBOARD}`);
