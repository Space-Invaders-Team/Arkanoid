import { TLeaderboard, TLider } from './typings';

class LeaderboardAPI {
  constructor(baseUrl: string) {
    this._baseUrl = baseUrl;
  }

  private _baseUrl: string;

  async getAllLiders(data: TLeaderboard) {
    const response = await fetch(`${this._baseUrl}/all`, {
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
    const response = await fetch(`${this._baseUrl}`, {
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

export const leaderboardAPI = new LeaderboardAPI('https://ya-praktikum.tech/api/v2/leaderboard');
