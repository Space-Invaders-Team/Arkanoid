import React from 'react';
import styles from './TableHead.module.css';

export function Tablehead() {
  return (
    <thead className={styles.thead}>
      <tr className={styles.tr}>
        <th className={`${styles.th} ${styles.num}`}>#</th>
        <th className={styles.th}>Name</th>
        <th className={`${styles.th} ${styles.points}`}>Points</th>
      </tr>
    </thead>
  );
}
