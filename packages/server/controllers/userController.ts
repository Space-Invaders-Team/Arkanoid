import type { Request, Response } from 'express';
import { UniqueConstraintError } from 'sequelize';
import { User } from '../models/User';

export class UserController {
  // добавление  юзера в БД
  public static create = async (
    request: Request,
    response: Response,
  ) => {
    try {
      const user = await User.create(request.body);
      response.json(user);
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        response.json({ message: 'Пользователь не добавлен, т.к. уже существует в базе' });
      } else {
        response.json({ message: 'Ошибка при добавлении пользователя в БД' });
      }
    }
  };
}
