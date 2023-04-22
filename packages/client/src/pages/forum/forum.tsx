import { useEffect, useState } from 'react';
import { LinkRow } from '../../components/LinkRow';
import styles from './Forum.module.css';
import { TForum } from './typings';
import { useForums } from '../../hooks/useForums';
import { Loader } from '../../components/Loader';

export function Forum() {
  const [forumList, setForumList] = useState<TForum[]>([]);
  const [fetchForums, isLoading, forumsError] = useForums(setForumList);

  useEffect(() => {
    fetchForums();
  }, [fetchForums]);

  return (
    <div className={styles.container}>
      {isLoading
        ? <Loader />
        : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Форумы</th>
                <th>Темы</th>
                <th>Сообщения</th>
              </tr>
            </thead>
            <tbody>
              {forumList.map(
                (data) => (
                  <LinkRow
                    rowData={{ cell1: data.name,
                      cell2: data.topicsCount,
                      cell3: data.messagesCount }}
                    key={`${data.id}`}
                    path={`./topicList/${data.id}`}
                  />
                ),
              )}
            </tbody>
          </table>
        )}
      {forumsError && <div>Произошла ошибка при загрузке данных</div>}
    </div>
  );
}
