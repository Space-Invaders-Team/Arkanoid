import { LinkRow } from '../../components/LinkRow';
import styles from './Forum.module.css';
import { TForum } from './typings';

// mock-data
const rowsData: TForum[] = [
  {
    id: 1,
    name: 'Первый форум',
    countTopic: 15,
    countAnswer: 20,
  },

  {
    id: 2,
    name: 'Второй форум',
    countTopic: 5,
    countAnswer: 12,
  },

  {
    id: 3,
    name: 'Третий форум',
    countTopic: 11,
    countAnswer: 23,
  },
];

export function Forum() {
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
          {rowsData.map(
            (data) => (
              <LinkRow
                rowData={{ cell1: data.name, cell2: data.countTopic, cell3: data.countAnswer }}
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
