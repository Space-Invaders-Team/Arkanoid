import { TTopic } from './typings';

const dates = ['03.12.2022 12:55', '12.02.2023 18:55'];
export const topicData: TTopic[] = Array(20).fill('').map((_, n) => {
  const randomIndex = Math.floor(Math.random() * dates.length);
  const lastMessage = Math.floor(Math.random() * 100);
  return {
    id: `${n}`,
    name: `Название темы ${n}`,
    countAnswer: lastMessage,
    lastMessageTime: dates[randomIndex],
  };
});
