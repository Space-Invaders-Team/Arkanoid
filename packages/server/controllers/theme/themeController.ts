import type { Request, Response } from 'express';
import { Theme } from '../../models/Theme';
import { User } from '../../models/User';

export const setActiveUserTheme = async (req: Request, res: Response) => {
  try {
    const { userId, themeId } = req.body;

    User.findOne({
      where: { user_id: userId },
    })
      .then(async (user) => {
        if (user === null) {
          res.json({ message: `Пользователь ${userId} не найден` });
        } else {
          await User.update(
            {
              theme: themeId,
            },
            {
              where: { user_id: userId },
            },
          );
          res.json({ message: `Успешно Активировали тему с id=${themeId} для пользователя ${userId}` });
        }
      });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка активации темы' });
  }
};

export const getUserTheme = async (req: Request, res: Response) => {
  const { userId } = req.params;

  console.log(userId);

  try {
    User.findOne({
      where: { user_id: userId },
      include: [Theme],
    })
      .then((userTheme) => {
        if (userTheme === null) {
          res.json({ message: `Пользователь ${userId} или тема не найдены` });
        } else {
          res.status(200).json(userTheme.themes);
        }
      });
  } catch (error) {
    res.status(500).json({ message: `Не удалось получить тему для пользователя ${userId}` });
  }
};

export const getThemes = async (_req: Request, res: Response) => {
  try {
    const themes = await Theme.findAll();
    res.json(themes);
  } catch (error) {
    res.status(500).json({ message: 'Не удалось получить список тем' });
  }
};

export const addThemes = async (req: Request, res: Response) => {
  try {
    const themesArr = req.body;
    await Theme.bulkCreate(themesArr, {
      ignoreDuplicates: true,
    });
    res.json(themesArr);
  } catch (error) {
    res.status(500).json({ message: 'Не удалось добавить новые темы' });
  }
};
