import styles from './Messages.module.css';
import { TMessage } from './typings';

// mock-data
const messData: TMessage[] = [
  {
    id: 1,
    text: 'Первое сообщение',
  },

  {
    id: 2,
    text: 'Второе сообщение',
  },

  {
    id: 3,
    text: 'Третье сообщение',
  },
];

export function Messages() {
  console.log('messData: ', messData);

  return (
    <div className={styles.container}>
      <h1>Topic Name</h1>
    </div>
  );
}
