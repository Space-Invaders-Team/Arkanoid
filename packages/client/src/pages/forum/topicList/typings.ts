export type TTopic = {
  id: number;
  name: string;
  messagesCount: number;
  dateLastMessage: string;
  forum_id: number;
};

export type TTopicNew = {
  name: string;
  forum_id: number;
};
