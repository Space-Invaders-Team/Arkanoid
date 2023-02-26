import { useState } from 'react';
import { leaderboardAPI } from '../api/LeaderboardAPI/LeaderboardAPI';
import { TLeaderBoard } from '../pages/leaderboard/typings';

export function useLeaders(callback: (a: TLeaderBoard[]) => void): [() => void, boolean, string] {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchLeaders = () => {
    leaderboardAPI.getAllLiders({
      ratingFieldName: 'score',
      cursor: 0,
      limit: 15,
    })
      .then((result: Record<string, TLeaderBoard>[]) => {
        const leaders = result.map((item: Record<string, TLeaderBoard>, index: number) => {
          item.data.place = index + 1;
          if (!item.data.name) {
            item.data.name = 'No name';
          }
          return item.data;
        });

        callback(leaders);
      })
      .catch((e: Error) => {
        setError(e.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return [fetchLeaders, loading, error];
}
