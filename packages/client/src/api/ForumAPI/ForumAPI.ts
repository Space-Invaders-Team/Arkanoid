import { BASE_URL_API, FORUM } from '../../utils/apiConstans';

class ForumAPI {
  constructor(private _baseUrl: string) {}

  async _handlingResponse(result: Response) {
    const data = await result.json();
    if (result.ok) return data;
    return Promise.reject(data.reason);
  }

  async getAllForums() {
    const response: Response = await fetch(`${this._baseUrl}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return this._handlingResponse(response);
  }
}

export const forumAPI = new ForumAPI(`${BASE_URL_API}${FORUM}`);
