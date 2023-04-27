/* eslint-disable import/no-cycle */
import { Router } from 'express';
import { TopicController } from '../../controllers/topicController';
import { auth } from '../../middleware/auth';

export const topicRoutes = (app: Router) => {
  const topicRouter: Router = Router();

  topicRouter
    .get('/topicList/:id', auth, TopicController.index)
    .get('/:id', auth, TopicController.show)
    .post('/', auth, TopicController.create);

  app.use('/api/v1/topics', topicRouter);
};
