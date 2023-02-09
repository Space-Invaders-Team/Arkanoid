import React from 'react';
import { TLeaderBoardProps } from '../../../pages/Leaderboard/typings';
import styles from './TableRow.module.css';

export function Tablerow({ row }: Record<string, TLeaderBoardProps>) {
  const { data, iam } = row;

  let medal = '';

  switch (data.place) {
    case 1:
      medal = 'gold';
      break;
    case 2:
      medal = 'silver';
      break;
    case 3:
      medal = 'bronze';
      break;
    default:
      medal = '';
      break;
  }

  return (
    <tr className={`${styles.tr} ${iam ? styles.currentRow : ''}`}>
      <td className={`${styles.td} ${styles.td__first}`}><span className={`${styles.medal} ${styles[medal]}`}>{data.place}</span></td>
      <td className={styles.td}>
        <div className={styles.leader}>
          <img className={styles.avatar} src={data.avatar} alt={data.name} />
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
