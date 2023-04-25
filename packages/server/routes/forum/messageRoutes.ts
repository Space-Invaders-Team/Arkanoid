/* eslint-disable import/no-cycle */
import { Router } from 'express';
import { MessageController } from '../../controllers/messageController';

export const messageRoutes = (app: Router) => {
  const messageRouter: Router = Router();

  messageRouter
    .get('/topic/:id', MessageController.index)
    .post('/', MessageController.create)
    .post('/like', MessageController.addLike)
    .post('/dislike', MessageController.addDislike);

  app.use('/api/v1/messages', messageRouter);
};
