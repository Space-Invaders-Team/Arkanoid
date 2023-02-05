import React from 'react';
import { TableHead } from '../../components/Leaderboard/TableHead/Tablehead';
import { TableRow } from '../../components/Leaderboard/Tablerow/Tablerow';
import styles from './style.module.css';
import { TLeaderBoard } from './typings';

export function LeaderBoard() {
  // const [count, setCount] = useState(0);

  const currentPlayerId = 3; // id текущего игрока

  const leaders: TLeaderBoard[] = [
    {
      num: 1,
      name: 'Безумный Майк',
      avatar: '/public/avatar.jpg',
      points: 999999,
    },
    {
      num: 2,
      name: 'Вася Петров',
      avatar: '/public/avatar.jpg',
      points: 44234,
    },
    {
      num: 3,
      name: 'Аня Иванов',
      avatar: '/public/avatar.jpg',
      points: 23322,
    },
    {
      num: 4,
      name: 'Владимир Ильич',
      avatar: '/public/avatar.jpg',
      points: 20000,
    },
    {
      num: 5,
      name: 'Кот',
      avatar: '/public/avatar.jpg',
      points: 12,
    },
    {
      num: 6,
      name: 'Кот',
      avatar: '/public/avatar.jpg',
      points: 12,
    },
    {
      num: 7,
      name: 'Кот',
      avatar: '/public/avatar.jpg',
      points: 12,
    },
    {
      num: 8,
      name: 'Кот',
      avatar: '/public/avatar.jpg',
      points: 12,
    },
    {
      num: 9,
      name: 'Кот',
      avatar: '/public/avatar.jpg',
      points: 12,
    },
  ];

  return (
    <div className={styles.leaderboard}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Leaderboard</h1>
        <table className={styles.table}>
          <TableHead />
          <tbody>
            {leaders.map((leader, index) => (
              <TableRow row={{
                data: leader,
                key: index,
                iam: (index === currentPlayerId) }}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
