export enum Paths {
  HOME = '/',
  AUTH = '/authorization',
  REGISTER = '/registration',
  GAME = '/game',
  LEADERBOARD = '/leaderboard',
  FORUM = '/forum',
  TOPICLIST = '/forum/topicList/:id',
  TOPIC = '/forum/topicList/:id/topic/:id',
  PROFILE = '/profile',
  NOT_FOUND = '/*',
}

export enum Titles {
  HOME = 'Главная',
  AUTH = 'Вход',
  REGISTER = 'Регистрация',
  GAME = 'Игра',
  LEADERBOARD = 'Рейтинг игроков',
  FORUM = 'Форум',
  PROFILE = 'Профиль',
  LOGOUT = 'Выход',
}

export const navLinksData = [
  { url: Paths.HOME, title: Titles.HOME, protect: '' },
  { url: Paths.AUTH, title: Titles.AUTH, protect: false },
  { url: Paths.REGISTER, title: Titles.REGISTER, protect: false },
  { url: Paths.GAME, title: Titles.GAME, protect: true },
  { url: Paths.LEADERBOARD, title: Titles.LEADERBOARD, protect: true },
  { url: Paths.FORUM, title: Titles.FORUM, protect: true },
  { url: Paths.PROFILE, title: Titles.PROFILE, protect: true },
];
