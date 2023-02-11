import styles from './Forum.module.css';
import { IForum } from '../../types/forum';
import { ForumItem } from '../../components/ForumItem';

// mock-data
const forums: IForum[] = [
  {
    id: 1,
    name: 'Первый форум',
    countTopic: 15,
    countAnswer: 20,
  },

  {
    id: 2,
    name: 'Второй форум',
    countTopic: 5,
    countAnswer: 12,
  },

  {
    id: 3,
    name: 'Третий форум',
    countTopic: 11,
    countAnswer: 23,
  },
];

export function Forum() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapItems}>
        <div className={styles.flexRow}>
          <div className={styles.item}>Форумы</div>
          <div className={styles.item}>Темы</div>
          <div className={styles.item}>Сообщения</div>
        </div>
        {forums.map(
          (forum) => <ForumItem forum={forum} key={`${forum.id}`} />,
        )}
      </div>
    </div>
  );
}
