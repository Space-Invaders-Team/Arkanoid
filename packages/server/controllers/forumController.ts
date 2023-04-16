import type { Request, Response } from 'express';
import { Sequelize } from 'sequelize-typescript';
import { Forum } from '../models/Forum';

export class ForumController {
  // @validation({/* rules */}) // Можно использовать декораторы, можно передавать в middlewares
  // список всех форумов
  public static index = async (
    _request: Request,
    response: Response,
  ) => {
    const forumsList = await Forum.findAll({
      attributes: {
        include: [
          [
            Sequelize.literal(`
              (SELECT Count(*)
               FROM   topics
               WHERE  topics.forum_id = "Forum"."id")`),
            'topicsCount',
          ],
          [
            Sequelize.literal(`
              (SELECT COUNT(*)
               FROM messages WHERE messages.forum_id = "Forum"."id")`),
            'messagesCount',
          ],
        ],
      },
    });

    response.json(forumsList);
  };

  // один форум по id
  public static show = async (
    request: Request,
    response: Response,
  ) => {
    const forum = await Forum.findByPk(request.params.id);

    response.json(forum);
  };
}
