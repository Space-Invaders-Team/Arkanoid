/* eslint-disable import/no-cycle */
import { Router } from 'express';
import { MessageController } from '../../controllers/messageController';
import { auth } from '../../middleware/auth';

export const messageRoutes = (app: Router) => {
  const messageRouter: Router = Router();

  messageRouter
    .get('/topic/:id', auth, MessageController.index)
    .post('/', auth, MessageController.create)
    .post('/like', auth, MessageController.addLike)
    .post('/dislike', auth, MessageController.addDislike);

  app.use('/api/v1/messages', messageRouter);
};
