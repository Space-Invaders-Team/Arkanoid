/* eslint-disable import/no-cycle */
import { Router } from 'express';
import { UserController } from '../controllers/userController';

export const userRoutes = (app: Router) => {
  const userRouter: Router = Router();

  userRouter
    .post('/', UserController.create)
    .put('/:id', UserController.update);

  app.use('/api/v1/users', userRouter);
};
