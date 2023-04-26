import React, { useEffect, useState } from 'react';
import { TLeaderBoardProps } from '../typings';
import styles from './TableRow.module.css';
import { Avatar } from '../../../components/Avatar';
import { userAPI } from '../../../api/UserAPI/UserAPI';

export function TableRow({ row }: Record<string, TLeaderBoardProps>) {
  const { data, iam } = row;
  const [avatar, setAvatar] = useState<string>('');

  useEffect(() => {
    userAPI.get(data.id).then((userData) => {
      if (userData) {
        setAvatar(userData.avatar);
      }
    });
  }, [data]);

  const medalMap = new Map([
    [1, 'gold'],
    [2, 'silver'],
    [3, 'bronze'],
  ]);

  const medal = medalMap.get(data.place) ?? '';

  return (
    <tr data-testid="leaderboard-item" className={`${styles.tr} ${iam ? styles.currentRow : ''}`}>
      <td className={`${styles.td} ${styles.td__first}`}><span className={`${styles.medal} ${styles[medal]}`}>{data.place}</span></td>
      <td className={styles.td}>
        <div className={styles.leader}>
          <Avatar path={avatar} userId={data.id} userName={data.name} />
          {iam ? 'Вы:' : ''}
          <span className={styles.name}>
            {data.name}
          </span>
        </div>
      </td>
      <td className={styles.td}>
        <span className={styles.points}>{data.score}</span>
      </td>
    </tr>
  );
}
