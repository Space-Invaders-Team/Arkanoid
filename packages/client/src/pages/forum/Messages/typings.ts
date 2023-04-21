export type TMessage = {
  id: number
  author: string
  createdAt: string
  content: string
  forum_id: number
  parent_id?: number
};

export type TMessageNew = {
  content: string
  topic_id: number
  forum_id: number
  parent_id?: number
};
