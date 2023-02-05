import React from 'react';
import { TLeaderBoardProps } from '../../../pages/Leaderboard/typings';
import styles from './TableRow.module.css';

export function Tablerow({ row }: Record<string, TLeaderBoardProps>) {
  const { data, key, iam } = row;

  console.log(iam);

  let medal = '';

  switch (key) {
    case 0:
      medal = 'gold';
      break;
    case 1:
      medal = 'silver';
      break;
    case 2:
      medal = 'bronze';
      break;
    default:
      medal = '';
      break;
  }

  return (
    <tr className={`${styles.tr} ${iam ? styles.currentRow : ''}`}>
      <td className={`${styles.td} ${styles.td__first}`}><span className={`${styles.medal} ${styles[medal]}`}>{key + 1}</span></td>
      <td className={styles.td}>
        <div className={styles.leader}>
          <img className={styles.avatar} src={data.avatar} alt={data.name} />
          <span className={styles.name}>{data.name}</span>
        </div>
      </td>
      <td className={styles.td}>
        <span className={styles.points}>{data.points}</span>
      </td>
    </tr>
  );
}
