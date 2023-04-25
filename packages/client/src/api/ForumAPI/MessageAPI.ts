import { TLike, TMessageNew } from '../../pages/forum/Messages/typings';
import { BASE_URL_API, MESSAGE } from '../../utils/apiConstans';

class MessageAPI {
  constructor(private _baseUrl: string) {}

  async _handlingResponse(result: Response) {
    const data = await result.json();
    if (result.ok) return data;
    return Promise.reject(data.reason);
  }

  async getById(topic_id: number) {
    const response: Response = await fetch(`${this._baseUrl}/topic/${topic_id}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return this._handlingResponse(response);
  }

  async create(data: TMessageNew) {
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

  async like(data: TLike) {
    const response: Response = await fetch(`${this._baseUrl}/like`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return this._handlingResponse(response);
  }

  async dislike(data: TLike) {
    const response: Response = await fetch(`${this._baseUrl}/dislike`, {
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

export const messageAPI = new MessageAPI(`${BASE_URL_API}${MESSAGE}`);
