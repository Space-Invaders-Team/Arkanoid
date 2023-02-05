import React from 'react';
import styles from './style.module.css';

export function TableHead() {
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
