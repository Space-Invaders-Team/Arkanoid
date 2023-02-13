import React, { useState } from 'react';
import { TableHead } from '../../components/Leaderboard/TableHead';
import { TableRow } from '../../components/Leaderboard/TableRow';
import styles from './Leaderboard.module.css';
import { Order, TLeaderBoard } from './typings';

export function Leaderboard() {
  const [leaders, setLeaders] = useState<TLeaderBoard[]>([
    {
      id: 123,
      name: 'Безумный Майк',
      avatar: '/avatar.jpg',
      points: 999999,
      place: 1,
    },
    {
      id: 1234,
      name: 'Вася Петров',
      avatar: '/avatar.jpg',
      points: 44234,
      place: 2,
    },
    {
      id: 12345,
      name: 'Аня Иванов',
      avatar: '/avatar.jpg',
      points: 23322,
      place: 3,
    },
    {
      id: 123456,
      name: 'Владимир Ильич',
      avatar: '/avatar.jpg',
      points: 20000,
      place: 4,
    },
    {
      id: 3213,
      name: 'Кот',
      avatar: '/avatar.jpg',
      points: 12,
      place: 5,
    },
    {
      id: 12123,
      name: 'Кот',
      avatar: '/avatar.jpg',
      points: 12,
      place: 6,
    },
    {
      id: 32,
      name: 'Кот',
      avatar: '/avatar.jpg',
      points: 12,
      place: 7,
    },
    {
      id: 1233,
      name: 'Кот',
      avatar: '/avatar.jpg',
      points: 12,
      place: 8,
    },
    {
      id: 33,
      name: 'Кот',
      avatar: '/avatar.jpg',
      points: 12,
      place: 9,
    },
  ]);

  const sortLeaders = (sortField: keyof TLeaderBoard, orders: Order) : void => {
    if (sortField !== null) {
      setLeaders([...leaders].sort((a, b) => {
        if (a[sortField] < b[sortField]) {
          return orders === 'desc' ? -1 : 1;
        }
        if (a[sortField] > b[sortField]) {
          return orders === 'desc' ? 1 : -1;
        }
        return 0;
      }));
    }
  };

  const currentPlayerId = 3; // id текущего игрока, пока захардкодено

  return (
    <div className={styles.leaderboard}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Leaderboard</h1>
        <table className={styles.table}>
          <TableHead sorting={sortLeaders} />
          <tbody>
            {leaders.map((leader, index) => (
              <TableRow row={{
                data: leader,
                key: leader.id,
                iam: (index === currentPlayerId),
              }}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
