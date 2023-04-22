import { useCallback, useState } from 'react';
import { TForum } from '../api/ForumAPI/typings';
import { forumAPI } from '../api/ForumAPI/ForumAPI';

export function useForums(callback: (a: TForum[]) => void): [() => void, boolean, string] {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchForums = useCallback(
    () => {
      forumAPI.getAllForums()
        .then((response: TForum[]) => {
          const forums = response;
          callback(forums);
        })
        .catch((e: Error) => {
          setError(e.message);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [callback],
  );

  return [fetchForums, loading, error];
}
