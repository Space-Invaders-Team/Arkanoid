import { ForumItem } from '../../components/ForumItem/ForumItem';
import styles from './forum.module.css';
import { IForum } from '../../types/forum';

// mock-data
const forums: IForum[] = [
  {
    forumId: 1,
    forumName: 'Первый форум',
    countTopic: 15,
    countAnswer: 20,
  },

  {
    forumId: 2,
    forumName: 'Второй форум',
    countTopic: 5,
    countAnswer: 12,
  },

  {
    forumId: 3,
    forumName: 'Третий форум',
    countTopic: 11,
    countAnswer: 23,
  },
];

export function Forum() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapItems}>
        <div className={styles.item}>Форумы</div>
        <div className={styles.item}>Темы</div>
        <div className={styles.item}>Сообщения</div>
        {forums.map(
          (forum) => <ForumItem forum={forum} key={`${forum.forumId}`} />,
        )}
      </div>
    </div>
  );
}
