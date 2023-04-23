export type TForum = {
  name: string
};

export type TTopic = {
  name: string
  forum_id: number
};

export type TMessage = {
  text: string
  forumId: number
};

export type TUser = {
  user_id: number
  user_name: string
  user_game_name?: string
  avatar?: string
  theme?: number
};

export type TTheme = {
  theme_id: number
  theme_name: string
  theme_icon: string
};
