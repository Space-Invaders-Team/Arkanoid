import { useCallback, useState } from 'react';
import { TApi } from './typings';

export function useDataById<T>(callback: (a: T) => void): [
  (api: TApi<T>, n: number) => void,
  boolean,
  string,
] {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDataById = useCallback(
    (itemAPI: TApi<T>, id: number) => {
      itemAPI.getById(id)
        .then((response: T) => {
          const item = response;
          callback(item);
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

  return [fetchDataById, loading, error];
}
