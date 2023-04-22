import { useCallback, useState } from 'react';
import { forumAPI } from '../api/ForumAPI/ForumAPI';
import { TForum } from '../api/ForumAPI/typings';

export function useActiveForum(callback: (a: TForum) => void): [
  (n: number) => void,
  boolean,
  string,
] {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchActiveForum = useCallback(
    (forumId: number) => {
      forumAPI.getForum(forumId)
        .then((response: TForum) => {
          const forum = response;
          callback(forum);
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

  return [fetchActiveForum, loading, error];
}
