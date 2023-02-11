import { Link } from 'react-router-dom';
import { IForum } from '../../types/forum';
import styles from './ForumItem.module.css';

interface ForumItemProps {
  forum: IForum
}

export function ForumItem({ forum }: ForumItemProps) {
  return (
    <Link className={styles.flexRow} to={`./topicList/${forum.forumId}`}>
      <div className={styles.item}>{forum.forumName}</div>
      <div className={styles.item}>{forum.countTopic}</div>
      <div className={styles.item}>{forum.countAnswer}</div>
    </Link>
  );
}
