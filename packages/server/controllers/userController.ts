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

  public static update = async (
    request: Request,
    response: Response,
  ) => {
    const user = await User.findByPk(request.params.id);

    if (user) {
      const result = await user.update(request.body);
      response.json(result);
    } else console.log('User is not found!');
  };

  public static get = async (
    request: Request,
    response: Response,
  ) => {
    try {
      const userId = request.params.id;
      const user = await User.findByPk(userId);
      if (user) {
        response.json(user);
      } else {
        response.json({ error: `User ${userId} is not found in DB!` });
      }
    } catch (error) {
      response.json({ error });
    }
  };
}
