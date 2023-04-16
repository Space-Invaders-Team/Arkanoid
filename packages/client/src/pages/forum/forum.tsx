import { useEffect, useState } from 'react';
import { LinkRow } from '../../components/LinkRow';
import styles from './Forum.module.css';
import { TForum } from './typings';
import { forumAPI } from '../../api/ForumAPI/ForumAPI';

export function Forum() {
  const [forumList, setForumList] = useState<TForum[]>([]);

  useEffect(() => {
    forumAPI.getAllForums().then((response) => setForumList(response));
  }, []);

  return (
    <div className={styles.container}>
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
                rowData={{ cell1: data.name, cell2: data.topicsCount, cell3: data.messagesCount }}
                key={`${data.id}`}
                path={`./topicList/${data.id}`}
              />
            ),
          )}
        </tbody>
      </table>
    </div>
  );
}
