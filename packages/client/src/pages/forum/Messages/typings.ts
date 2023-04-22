export type TMessage = {
  id: number
  user_id: number
  createdAt: string
  content: string
  forum_id: number
  parent_id?: number
  user?: any
};

export type TMessageNew = {
  content: string
  user_id: number
  topic_id: number
  forum_id: number
  parent_id?: number
  author?: string
};
