import React from 'react';
import { TLeaderBoardProps } from '../../../pages/leaderboard/typings';
import styles from './TableRow.module.css';
import { Avatar } from '../../Avatar';

export function TableRow({ row }: Record<string, TLeaderBoardProps>) {
  const { data, iam } = row;

  const medalMap = new Map([
    [1, 'gold'],
    [2, 'silver'],
    [3, 'bronze'],
  ]);

  const medal = medalMap.get(data.place) ?? '';

  return (
    <tr className={`${styles.tr} ${iam ? styles.currentRow : ''}`}>
      <td className={`${styles.td} ${styles.td__first}`}><span className={`${styles.medal} ${styles[medal]}`}>{data.place}</span></td>
      <td className={styles.td}>
        <div className={styles.leader}>
          <Avatar path={data.avatar} userId={data.id} userName={data.name} />
          {iam ? 'Вы:' : ''}
          <span className={styles.name}>
            {data.name}
          </span>
        </div>
      </td>
      <td className={styles.td}>
        <span className={styles.points}>{data.points}</span>
      </td>
    </tr>
  );
}
