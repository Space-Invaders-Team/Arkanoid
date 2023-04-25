import type { Request, Response } from 'express';
import { Message } from '../models/Message';
import { User } from '../models/User';
import { Like } from '../models/Like';

enum TLikeType {
  LIKE = 'like',
  DISLIKE = 'dislike',
}

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

  private static increaseLikeCount = async (messageId: number, type: string) => {
    const message = await Message.findOne({
      where: { id: messageId },
    });

    if (message) {
      if (type === TLikeType.LIKE) {
        await message.update({ likeCount: message.likeCount + 1 });
      } else {
        await message.update({ dislikeCount: message.dislikeCount + 1 });
      }
    }
  };

  private static decreaseLikeCount = async (messageId: number, type: string) => {
    const message = await Message.findOne({
      where: { id: messageId },
    });

    if (message) {
      if (type === TLikeType.LIKE) {
        if (message.likeCount > 0) {
          await message.update({ likeCount: message.likeCount - 1 });
        }
      } else if (message.dislikeCount > 0) {
        await message.update({ dislikeCount: message.dislikeCount - 1 });
      }
    }
  };

  private static addOrRemoveLike = async (
    user_id: number,
    message_id: number,
    isLiked: boolean,
  ) => {
    const type: string = isLiked ? TLikeType.LIKE : TLikeType.DISLIKE;

    // Создаем новый лайк или обновляем старый
    try {
      const [like, created] = await Like.findOrCreate({
        where: {
          message_id,
          user_id,
          type,
        },
        defaults: {
          type,
        },
      });

      // Удаляем лайк или дизлайк, если он уже существует
      if (!created) {
        await like.destroy()
          .then(() => {
            this.decreaseLikeCount(message_id, type);
          }).catch((err) => {
            console.log('Ошибка при удалении лайка: ', err);
          });
      } else {
        this.increaseLikeCount(message_id, type);
      }

      return like;
    } catch (error) {
      console.log('Ошибка в методе findOrCreate');
      return false;
    }
  };

  public static addLike = async (
    request: Request,
    response: Response,
  ) => {
    try {
      const { userId, messageId } = request.body;
      const like = await this.addOrRemoveLike(userId, messageId, true);
      return response.json({ success: true, data: like });
    } catch (error) {
      return response.status(500).json({ success: false, error: 'Ошибка при добавлении лайка' });
    }
  };

  public static addDislike = async (
    request: Request,
    response: Response,
  ) => {
    try {
      const { userId, messageId } = request.body;
      const like = await this.addOrRemoveLike(userId, messageId, false);
      return response.json({ success: true, data: like });
    } catch (error) {
      return response.status(500).json({ success: false, error: 'Ошибка при добавлении дизлайка' });
    }
  };
}
