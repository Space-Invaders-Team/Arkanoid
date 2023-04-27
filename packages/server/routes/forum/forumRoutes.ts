/* eslint-disable import/no-cycle */
import { Router } from 'express';
import { ForumController } from '../../controllers/forumController';
import { auth } from '../../middleware/auth';

export const forumRoutes = (app: Router) => {
  const forumRouter: Router = Router();

  forumRouter
    .get('/', auth, ForumController.index)
    .get('/:id', auth, ForumController.show);

  app.use('/api/v1/forums', forumRouter);
};
