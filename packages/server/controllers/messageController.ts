import type { Request, Response } from 'express';
import { Message } from '../models/Message';
import { User } from '../models/User';

export class MessageController {
  // список всех сообщений
  public static index = async (
    request: Request,
    response: Response,
  ) => {
    const messageList = await Message.findAll({
      where: { topic_id: request.params.id },
      include: User,
      order: [
        ['createdAt', 'DESC'],
      ],
    });

    response.json(messageList);
  };

  public static create = async (
    request: Request,
    response: Response,
  ) => {
    const message = await Message.create(request.body);

    response.json(message);
  };
}
