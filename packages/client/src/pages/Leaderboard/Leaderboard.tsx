import { useEffect, useState } from 'react';
import { TableHead } from './TableHead';
import { TableRow } from './TableRow';
import { Loader } from '../../components/Loader';
import { useLeaders } from '../../hooks/useLeaders';
import styles from './Leaderboard.module.css';
import { Order, TLeaderBoard } from './typings';

export function Leaderboard() {
  const [leaders, setLeaders] = useState<TLeaderBoard[]>([]);
  const [fetchLeaders, isLoading, leadersError] = useLeaders(setLeaders);

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

        {isLoading
          ? <Loader />
          : (
            <table className={styles.table}>
              <TableHead sorting={sortLeaders} />
              <tbody>

                {leaders.length !== 0
                  ? leaders.map((leader, index) => (
                    <TableRow row={{
                      data: leader,
                      key: leader.id + leader.name,
                      iam: (index === currentPlayerId),
                    }}
                    />
                  ))
                  : <tr><td colSpan={3} align="center">Вы можете быть первым!</td></tr>}
              </tbody>
            </table>
          )}
        {leadersError && <div>Произошла ошибка при загрузке данных</div>}
      </section>
    </main>
  );
}
