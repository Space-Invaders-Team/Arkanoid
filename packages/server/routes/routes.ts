import { Router } from 'express';
import { forumRoutes } from './forum/forumRoutes';

const apiRouter: Router = Router();

forumRoutes(apiRouter);
