import { IForum } from '../../types/forum';
import styles from './forumItem.module.css';

interface ForumItemProps {
  forum: IForum
}

export function ForumItem({ forum }: ForumItemProps) {
  return (
    <>
      <div className={styles.item}>{forum.forumName}</div>
      <div className={styles.item}>{forum.countTopic}</div>
      <div className={styles.item}>{forum.countAnswer}</div>
    </>
  );
}
