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
  first_name: string
  second_name: string
  display_name: string
  email: string
  avatar?: string
};
