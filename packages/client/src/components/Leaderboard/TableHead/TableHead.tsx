import React, { useState } from 'react';
import { Sorting, SortEventProps } from '../../../pages/leaderboard/typings';
import styles from './TableHead.module.css';

export function TableHead({ sorting } : SortEventProps) {
  const [selectedSort, setSelectedSort] = useState<Sorting>({
    sort: 'points',
    order: 'desc',
  });

  const changeSort = (e: React.SyntheticEvent<HTMLButtonElement>) : void => {
    const { sort } = e.currentTarget.dataset;
    const { order } = e.currentTarget.dataset;
    if (sort && order) {
      // @ts-ignore
      sorting(sort, order);
      const newOrder = order === 'asc' ? 'desc' : 'asc';
      setSelectedSort({ sort, order: newOrder });
    }
  };

  return (
    <thead className={styles.thead}>
      <tr className={styles.tr}>
        <th className={`${styles.th} ${styles.num}`}>#</th>
        <th className={`${styles.th} ${styles.name}`}>
          <button className={styles.button} type="button" onClick={changeSort} data-active={selectedSort.sort === 'name' ? 'true' : 'false'} data-sort="name" data-order={selectedSort.sort === 'name' ? selectedSort.order : 'desc'}>
            Name
          </button>
        </th>
        <th className={`${styles.th} ${styles.points}`}>
          <button className={styles.button} type="button" onClick={changeSort} data-active={selectedSort.sort === 'points' ? 'true' : 'false'} data-sort="points" data-order={selectedSort.sort === 'points' ? selectedSort.order : 'asc'}>
            Points
          </button>
        </th>
      </tr>
    </thead>
  );
}
