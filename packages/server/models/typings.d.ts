export type TForum = {
  name: string
};

export type TTopic = {
  name: string
  forum_id: number
};

export type TMessage = {
  text: string
  forum_id: number
  topic_id: number
};

export type TUser = {
  user_id: number
  first_name?: string
  second_name?: string
  display_name?: string
  email?: string
  avatar?: string
  theme?: number
};

export type TTheme = {
  theme_id: number
  theme_name: string
  theme_icon: string
};
