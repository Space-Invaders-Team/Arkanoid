import { FormEvent, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { LinkRow } from '../../../components/LinkRow';
import { ButtonBack } from '../ButtonBack';
import styles from './TopicList.module.css';
import { TTopic, TTopicNew } from './typings';
import { topicAPI } from '../../../api/ForumAPI/TopicAPI';
import { dateFormat } from '../../../utils/helpers';
import { useDataById } from '../../../hooks/useDataById';
import { useTopics } from '../../../hooks/useTopics';
import { Loader } from '../../../components/Loader';
import { TForum } from '../typings';
import { forumAPI } from '../../../api/ForumAPI/ForumAPI';

export function TopicList() {
  const [topics, setTopics] = useState<TTopic[]>([]);
  const [topicTitle, setTopicTitle] = useState<string>('');
  const [isDisabledBtn, setDisabledBtn] = useState<boolean>(true);
  const [forum, setForum] = useState({
    name: '',
  });
  const [fetchActiveForum, isLoadingForum, forumError] = useDataById<TForum>(setForum);
  const [fetchTopics, isLoadingTopics, topicsError] = useTopics(setTopics);

  // берём id активного форума из url
  const params = useParams();
  const forumId = Number(params.id);

  useEffect(() => {
    fetchActiveForum(forumAPI, forumId);
    fetchTopics(forumId);
  }, [forumId, fetchActiveForum, fetchTopics]);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target: EventTarget & HTMLInputElement = e.currentTarget;
    const isDisabledButton = target.value.length === 0 || target.value.length > 80;
    if (isDisabledButton) {
      target.classList.add(styles.error);
    } else {
      target.classList.remove(styles.error);
    }
    setDisabledBtn(isDisabledButton);
    setTopicTitle(target.value);
  };

  const addTopic = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTopic: TTopicNew = {
      name: topicTitle,
      forum_id: forumId,
    };

    topicAPI.create(newTopic)
      .then((response) => setTopics((prevValue) => [response, ...prevValue]))
      .then(() => setTopicTitle(''));
  };

  const buttonClassNames = classNames(
    styles.button,
    { [styles.disabled]: isDisabledBtn },
  );

  return (
    <main className={styles.topicList}>
      {isLoadingForum || isLoadingTopics
        ? <Loader />
        : (
          <div className={styles.wrapper}>
            <header className={styles.header}>
              <span className={styles.backBtn}>
                <ButtonBack />
              </span>
              <h1 className={styles.title}>
                Форум:
                {' '}
                {forum.name}
              </h1>
              {!topics.length && <h2 className={styles.subtitle}>В этом форуме ещё нет тем</h2>}
            </header>
            <section className={styles.tableSection}>
              {!!topics.length && (
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
                            cell2: item.messagesCount || 0,
                            cell3: (item.dateLastMessage && dateFormat(item.dateLastMessage)) || 'Ответов нет',
                          }}
                          key={`${item.name + item.dateLastMessage}`}
                          path={`./topic/${item.id}`}
                        />
                      ),
                    )}
                  </tbody>
                </table>
              )}

              <div className={styles.sidebar}>
                <div className={styles.addTopic}>
                  <form onSubmit={(e) => addTopic(e)}>
                    <Input
                      value={topicTitle}
                      onChange={(e) => handleChange(e)}
                      name="name"
                      placeholder="Введите название темы"
                      type="text"
                    />
                    <Button
                      type="submit"
                      extraClassName={buttonClassNames}
                      disabled={!topicTitle}
                    >
                      <span className={styles.add}> + </span>
                      Добавить тему
                    </Button>
                  </form>
                </div>
              </div>
            </section>
          </div>
        )}
      {(forumError || topicsError) && <div>Произошла ошибка при загрузке данных</div>}
    </main>
  );
}
