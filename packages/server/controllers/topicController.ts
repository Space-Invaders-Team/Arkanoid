import type { Request, Response } from 'express';
import { Sequelize } from 'sequelize-typescript';
import { Topic } from '../models/Topic';

export class TopicController {
  // список всех тем (+ дата последнего сообщения в теме)
  public static index = async (
    request: Request,
    response: Response,
  ) => {
    const topicsList = await Topic.findAll({
      where: { forum_id: request.params.id },
      attributes: {
        include: [
          [
            Sequelize.literal(`
              (SELECT Count(*)
               FROM   messages
               WHERE  messages.topic_id = "Topic"."id")`),
            'messagesCount',
          ],
          [
            Sequelize.literal(`
              (SELECT Max("createdAt")
               FROM   messages
               WHERE  messages.topic_id = "Topic"."id")`),
            'dateLastMessage',
          ],
        ],
      },
    });

    response.json(topicsList);
  };

  // одина тема по id
  public static show = async (
    request: Request,
    response: Response,
  ) => {
    const topic = await Topic.findByPk(request.params.id);

    response.json(topic);
  };

  // создание темы
  public static create = async (
    request: Request,
    response: Response,
  ) => {
    const topic = await Topic.create(request.body);

    response.json(topic);
  };
}
