import { useMemo } from 'react';
import { BigHead } from '@bigheads/core';
import { TAvatar } from './typings';
import styles from './Avatar.module.css';

export function Avatar(props: TAvatar) {
  const { path, userId, userName } = props;

  const avatar = useMemo(() => (
    path
      ? <img src={path} alt={userName} data-testid="AvatarImg" />
      : <BigHead data-testid="BigHead" />), [path, userName]);

  return (
    <div className={styles.avatar} data-id={userId} data-testid="Avatar">
      {avatar}
    </div>
  );
}
