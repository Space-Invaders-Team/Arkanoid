import { BigHead } from '@bigheads/core';
import { TAvatar } from './typings';
import styles from './Avatar.module.css';

export function Avatar(props: TAvatar) {
  const { path, userId, userName } = props;

  const avatar = path ? <img src={path} alt={userName} /> : <BigHead />;

  return (
    <div className={styles.avatar} data-id={userId}>
      {avatar}
    </div>
  );
}
