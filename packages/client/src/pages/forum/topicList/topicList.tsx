import { useState } from 'react';
import classNames from 'classnames';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { LinkRow } from '../../../components/LinkRow';
import { ButtonBack } from '../ButtonBack';
import { topicData } from './data';
import styles from './TopicList.module.css';
import { TTopic } from './typings';

export function TopicList() {
  const [topics, setTopics] = useState<TTopic[]>(topicData);
  const [topicTitle, setTopicTitle] = useState<string>('');
  const [isDisabledBtn, setDisabledBtn] = useState<boolean>(false);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target: EventTarget & HTMLInputElement = e.currentTarget;
    const isDisabledButton = target.value.length > 80;
    if (isDisabledButton) {
      target.classList.add(styles.error);
    } else {
      target.classList.remove(styles.error);
    }
    setDisabledBtn(isDisabledButton);
    setTopicTitle(e.currentTarget.value);
  };

  const addTopic = () => {
    const newTopic: TTopic = {
      id: `${topicTitle + new Date()}`,
      name: topicTitle,
      countAnswer: 0,
      lastMessageTime: `${new Date().toLocaleString()}`,
    };
    setTopics((prevValue) => [newTopic, ...prevValue]);
    setTopicTitle('');
  };

  const buttonClassNames = classNames(
    styles.button,
    { [styles.disabled]: isDisabledBtn },
  );

  return (
    <main className={styles.topicList}>
      <header className={styles.header}>
        <span className={styles.backBtn}>
          <ButtonBack />
        </span>
        <h1 className={styles.title}>Название форума</h1>
      </header>
      <section className={styles.wrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Темы</th>
              <th>Ответы</th>
              <th>Последний ответ</th>
            </tr>
          </thead>
          <tbody>
            {topics.map(
              (item) => (
                <LinkRow
                  rowData={{
                    cell1: item.name,
                    cell2: item.countAnswer,
                    cell3: item.lastMessageTime,
                  }}
                  key={`${item.name + item.lastMessageTime}`}
                  path={`./topic/${item.id}`}
                />
              ),
            )}
          </tbody>
        </table>

        <div className={styles.sidebar}>
          <div className={styles.addTopic}>
            <Input
              value={topicTitle}
              onChange={handleChange}
              name="name"
              placeholder="Введите название темы"
              type="text"
            />
            <Button type="button" extraClassName={buttonClassNames} onClick={addTopic}>
              <span className={styles.add}> + </span>
              Добавить тему
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
