import React, { useState } from 'react';
import { Sorting, SortEventProps, Order, TLeaderBoard } from '../../../pages/leaderboard/typings';
import styles from './TableHead.module.css';

export function TableHead({ sorting }: SortEventProps) {
  const [selectedSort, setSelectedSort] = useState<Sorting>({
    sort: 'score',
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

  const scoreSort: keyof TLeaderBoard = 'score';
  const scoreOrder: Order = selectedSort.sort === scoreSort
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
            Имя
          </button>
        </th>
        <th className={`${styles.th} ${styles.points}`}>
          <button
            className={styles.button}
            type="button"
            onClick={() => changeSort(scoreSort, scoreOrder)}
            data-active={selectedSort.sort === scoreSort ? 'true' : 'false'}
            data-sort={scoreSort}
            data-order={scoreOrder}
          >
            Очки
          </button>
        </th>
      </tr>
    </thead>
  );
}
