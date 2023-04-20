import { useMemo } from 'react';
import { BigHead } from '@bigheads/core';
import { TAvatar } from './typings';
import { BASE_URL_YANDEX } from '../../utils/apiConstans';
import styles from './Avatar.module.css';

export function Avatar(props: TAvatar) {
  const { path, userId, userName, avatarSize } = props;

  const avatar = useMemo(() => (
    path
      ? (
        <img
          className={styles.avatarImg}
          src={`${BASE_URL_YANDEX}/resources${path}`}
          alt={userName}
          data-testid="AvatarImg"
        />
      )
      : <BigHead data-testid="BigHead" />), [path, userName]);

  return (
    <div
      className={avatarSize === 'big' ? styles.avatarBig : styles.avatarSmall}
      data-id={userId}
      data-testid="Avatar"
    >
      {avatar}
    </div>
  );
}
