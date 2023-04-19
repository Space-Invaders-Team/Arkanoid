import { useCallback, useState } from 'react';
import { TTopic } from '../pages/forum/topicList/typings';
import { topicAPI } from '../api/ForumAPI/TopicAPI';

export function useTopics(callback: (a: TTopic[]) => void): [(n: number) => void, boolean, string] {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTopics = useCallback(
    (forumId: number) => {
      topicAPI.getAllTopics(forumId)
        .then((response: TTopic[]) => {
          const topics = response;
          callback(topics);
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

  return [fetchTopics, loading, error];
}
