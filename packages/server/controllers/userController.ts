import type { Request, Response } from 'express';
import { User } from '../models/User';

export class UserController {
  // добавление  юзера в БД
  public static create = async (
    request: Request,
    response: Response,
  ) => {
    const user = await User.create(request.body);

    response.json(user);
  };
}
