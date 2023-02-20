import React, { useState } from 'react';
import { Sorting, SortEventProps, Order, TLeaderBoard } from '../../../pages/leaderboard/typings';
import styles from './TableHead.module.css';

export function TableHead({ sorting } : SortEventProps) {
  const [selectedSort, setSelectedSort] = useState<Sorting>({
    sort: 'points',
    order: Order.DESC,
  });

  const changeSort = (sort: keyof Omit<TLeaderBoard, 'avatar'>, order: Order) => {
    if (sort && order) {
      sorting(sort, order);
      const newOrder = order === Order.ASC ? Order.DESC : Order.ASC;
      setSelectedSort({ sort, order: newOrder });
    }
  };

  const nameSort: keyof TLeaderBoard = 'name';
  const nameOrder: Order = (selectedSort.sort === nameSort)
    ? selectedSort.order
    : Order.DESC;

  const pointsSort: keyof TLeaderBoard = 'points';
  const pointsOrder: Order = selectedSort.sort === pointsSort
    ? selectedSort.order
    : Order.ASC;

  return (
    <thead className={styles.thead}>
      <tr className={styles.tr}>
        <th className={`${styles.th} ${styles.num}`}>#</th>
        <th className={`${styles.th} ${styles.name}`}>
          <button
            className={styles.button}
            type="button"
            onClick={() => changeSort(nameSort, nameOrder)}
            data-active={selectedSort.sort === nameSort ? 'true' : 'false'}
            data-sort={nameSort}
            data-order={nameOrder}
          >
            Name
          </button>
        </th>
        <th className={`${styles.th} ${styles.points}`}>
          <button
            className={styles.button}
            type="button"
            onClick={() => changeSort(pointsSort, pointsOrder)}
            data-active={selectedSort.sort === pointsSort ? 'true' : 'false'}
            data-sort={pointsSort}
            data-order={pointsOrder}
          >
            Points
          </button>
        </th>
      </tr>
    </thead>
  );
}
