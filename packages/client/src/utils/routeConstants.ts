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
  OAUTH_BASE_URL = 'https://oauth.yandex.ru/authorize?response_type=code&client_id=',
  OAUTH_ADD_URL = '&redirect_uri=',
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

export enum NavLinkStatus {
  ALL = 'allways',
  NO = 'no',
  YES = 'yes',
}

export const navLinksData = [
  { url: Paths.HOME, title: Titles.HOME, protect: NavLinkStatus.ALL },
  { url: Paths.AUTH, title: Titles.AUTH, protect: NavLinkStatus.NO },
  { url: Paths.REGISTER, title: Titles.REGISTER, protect: NavLinkStatus.NO },
  { url: Paths.GAME, title: Titles.GAME, protect: NavLinkStatus.YES },
  { url: Paths.LEADERBOARD, title: Titles.LEADERBOARD, protect: NavLinkStatus.YES },
  { url: Paths.FORUM, title: Titles.FORUM, protect: NavLinkStatus.YES },
  { url: Paths.PROFILE, title: Titles.PROFILE, protect: NavLinkStatus.YES },
];
