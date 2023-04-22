/* eslint-disable import/no-cycle */
import { Router } from 'express';
import { TopicController } from '../../controllers/topicController';

export const topicRoutes = (app: Router) => {
  const topicRouter: Router = Router();

  topicRouter
    .get('/topicList/:id', TopicController.index)
    .get('/:id', TopicController.show)
    .post('/', TopicController.create);

  app.use('/api/v1/topics', topicRouter);
};
