import { Router } from 'express';
import { addThemes, getThemes, getUserTheme, setActiveUserTheme } from '../../controllers/theme/themeController';

export const themeRoutes = (router: Router) => {
  const themeRouter: Router = Router();

  themeRouter
    .post('/', setActiveUserTheme)
    .post('/add', addThemes)
    .get('/:userId', getUserTheme)
    .get('/all', getThemes);

  router.use('/api/v1/theme', themeRouter);
};
