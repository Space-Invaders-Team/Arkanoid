import React, { useEffect, useState } from 'react';
import { leaderboardAPI } from '../../api/LeaderboardAPI/LeaderboardAPI';
import { TableHead } from '../../components/Leaderboard/TableHead';
import { TableRow } from '../../components/Leaderboard/TableRow';
import { Loader } from '../../components/Loader';
import styles from './Leaderboard.module.css';
import { Order, TLeaderBoard } from './typings';

export function Leaderboard() {
  const [leaders, setLeaders] = useState<TLeaderBoard[]>([
    {
      id: 123,
      name: 'Безумный Майк',
      score: 999999,
      place: 1,
    },
    {
      id: 1234,
      name: 'Вася Петров',
      score: 44234,
      place: 2,
    },
    {
      id: 12345,
      name: 'Аня Иванов',
      score: 23322,
      place: 3,
    },
    {
      id: 123456,
      name: 'Владимир Ильич',
      score: 20000,
      place: 4,
    },
    {
      id: 3213,
      name: 'Кот',
      avatar: '/avatar.jpg',
      score: 12,
      place: 5,
    },
    {
      id: 12123,
      name: 'Кот',
      avatar: '/avatar.jpg',
      score: 12,
      place: 6,
    },
    {
      id: 32,
      name: 'Кот',
      avatar: '/avatar.jpg',
      score: 12,
      place: 7,
    },
    {
      id: 1233,
      name: 'Кот',
      avatar: '/avatar.jpg',
      score: 12,
      place: 8,
    },
    {
      id: 33,
      name: 'Кот',
      avatar: '/avatar.jpg',
      score: 12,
      place: 9,
    },
  ]);
  const [loading, setLoading] = useState(true);

  function fetchLeaders() {
    const promise = leaderboardAPI.getAllLiders({
      ratingFieldName: 'score',
      cursor: 0,
      limit: 15,
    });

    promise
      .then((result) => {
        setLeaders(result.map((item: Record<string, TLeaderBoard>, index: number) => {
          item.data.place = index + 1;
          if (!item.data.name) {
            item.data.name = 'No name';
          }
          return item.data;
        }));
      })
      .catch((error) => {
        throw Error(`Something wrong with Leaderboard - ${error}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchLeaders();
  }, []);

  const sortLeaders = (sortField: keyof Omit<TLeaderBoard, 'avatar'>, orders: Order): void => {
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

  /**
   * id текущего игрока - пока захардкодено
   * TODO: вытащить id текущего пользователя
   */
  const currentPlayerId = 3;

  return (
    <main className={styles.leaderboard}>
      <section className={styles.wrapper}>
        <h1 className={styles.title}>Рейтинг игроков</h1>

        {loading
          ? <Loader />
          : (
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
          )}

      </section>
    </main>
  );
}
