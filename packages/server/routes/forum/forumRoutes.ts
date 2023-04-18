/* eslint-disable import/no-cycle */
import { Router } from 'express';
import { ForumController } from '../../controllers/forumController';

export const forumRoutes = (app: Router) => {
  const forumRouter: Router = Router();

  forumRouter
    .get('/', ForumController.index)
    .get('/:id', ForumController.show);

  app.use('/api/v1/forums', forumRouter);
};
