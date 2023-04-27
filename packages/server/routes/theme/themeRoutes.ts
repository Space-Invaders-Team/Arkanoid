import { Router } from 'express';
import { addThemes, getThemes, getUserTheme, setActiveUserTheme } from '../../controllers/theme/themeController';
import { auth } from '../../middleware/auth';

export const themeRoutes = (router: Router) => {
  const themeRouter: Router = Router();

  themeRouter
    .post('/', auth, setActiveUserTheme)
    .post('/add', auth, addThemes)
    .get('/:userId', auth, getUserTheme)
    .get('/all', auth, getThemes);

  router.use('/api/v1/theme', themeRouter);
};
