import React from 'react';
import { Tablehead } from '../../components/Leaderboard/Tablehead/Tablehead';
import { Tablerow } from '../../components/Leaderboard/Tablerow/Tablerow';
import styles from './Leaderboard.module.css';
import { TLeaderBoard } from './typings';

export function Leaderboard() {
  // const [count, setCount] = useState(0);

  const currentPlayerId = 3; // id текущего игрока

  const leaders: TLeaderBoard[] = [
    {
      num: 1,
      name: 'Безумный Майк',
      avatar: '/avatar.jpg',
      points: 999999,
    },
    {
      num: 2,
      name: 'Вася Петров',
      avatar: '/avatar.jpg',
      points: 44234,
    },
    {
      num: 3,
      name: 'Аня Иванов',
      avatar: '/avatar.jpg',
      points: 23322,
    },
    {
      num: 4,
      name: 'Владимир Ильич',
      avatar: '/avatar.jpg',
      points: 20000,
    },
    {
      num: 5,
      name: 'Кот',
      avatar: '/avatar.jpg',
      points: 12,
    },
    {
      num: 6,
      name: 'Кот',
      avatar: '/avatar.jpg',
      points: 12,
    },
    {
      num: 7,
      name: 'Кот',
      avatar: '/avatar.jpg',
      points: 12,
    },
    {
      num: 8,
      name: 'Кот',
      avatar: '/avatar.jpg',
      points: 12,
    },
    {
      num: 9,
      name: 'Кот',
      avatar: '/avatar.jpg',
      points: 12,
    },
  ];

  return (
    <div className={styles.leaderboard}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Leaderboard</h1>
        <table className={styles.table}>
          <Tablehead />
          <tbody>
            {leaders.map((leader, index) => (
              <Tablerow row={{
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
