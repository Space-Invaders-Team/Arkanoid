import { TTopicNew } from '../../pages/forum/topicList/typings';
import { BASE_URL_API, TOPIC } from '../../utils/apiConstans';

class TopicAPI {
  constructor(private _baseUrl: string) {}

  async _handlingResponse(result: Response) {
    const data = await result.json();
    if (result.ok) return data;
    return Promise.reject(data.reason);
  }

  async getAllTopics(forum_id: number) {
    const response: Response = await fetch(`${this._baseUrl}/topicList/${forum_id}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return this._handlingResponse(response);
  }

  async getById(id: number) {
    const response: Response = await fetch(`${this._baseUrl}/${id}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return this._handlingResponse(response);
  }

  async create(data: TTopicNew) {
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

export const topicAPI = new TopicAPI(`${BASE_URL_API}${TOPIC}`);
