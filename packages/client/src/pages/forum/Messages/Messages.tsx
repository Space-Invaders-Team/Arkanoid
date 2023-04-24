import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Button } from '../../../components/Button';
import styles from './Messages.module.css';
import { TMessage, TMessageNew } from './typings';
import { ButtonBack } from '../ButtonBack';
import close from '../../../assets/icons/close.svg';
import avatar from '../../../assets/img/logo.webp';
import { useDataById } from '../../../hooks/useDataById';
import { TTopic } from '../topicList/typings';
import { topicAPI } from '../../../api/ForumAPI/TopicAPI';
import { Loader } from '../../../components/Loader';
import { messageAPI } from '../../../api/ForumAPI/MessageAPI';
import { dateFormat } from '../../../utils/helpers';
import { useAppSelector } from '../../../store/hooks';
import { selectUserData } from '../../../store/selectors';
import { BASE_URL_YANDEX } from '../../../utils/apiConstans';

function makeDisplayName(user: any) {
  return user?.display_name ? user.display_name
    : `${user.first_name} ${user.second_name}`;
}

function ParentMessage(props: { messagesArr: TMessage[], id: number }) {
  const { messagesArr, id } = props;
  const dataMess = messagesArr.find((obj) => obj.id === id);

  return (
    <div className={styles.quoteRow}>
      <div className={styles.quotePerson}>{makeDisplayName(dataMess?.user)}</div>
      <div className={styles.subtext}>
        {dataMess?.content}
      </div>
    </div>
  );
}

export function Messages() {
  const [messages, setMessages] = useState<TMessage[]>([]);
  const [parentMessage, setParentMessage] = useState<TMessage | null>(null);
  const [topic, setTopic] = useState({
    name: '',
    forum_id: 0,
  });
  const [fetchActiveTopic, isLoadingTopic, topicError] = useDataById<TTopic>(setTopic);
  const [fetchMessages, isLoadingMessages, messagesError] = useDataById<TMessage[]>(setMessages);
  const [newMessageValue, setNewMessageValue] = useState<string>('');
  const [isDisabledBtn, setDisabledBtn] = useState<boolean>(true);
  const userData = useAppSelector(selectUserData);

  const showAuthor = (user: any) => {
    let author;
    if (user?.user_id === userData?.id || user === undefined) {
      author = 'Вы';
    } else {
      author = makeDisplayName(user);
    }
    return author;
  };

  function putAvatar(avatarData: string) {
    const avatarUrl = avatarData ? `${BASE_URL_YANDEX}/resources/${avatarData}` : avatar;
    return avatarUrl;
  }

  // берём id активной темы из url
  const params = useParams();
  const topicId = Number(params.id);

  useEffect(() => {
    fetchActiveTopic(topicAPI, topicId);
    fetchMessages(messageAPI, topicId);
  }, [topicId, fetchActiveTopic, fetchMessages]);

  // Добавление сообщения, на которое отвечает юзер
  const handleClickReply = (id: number): void => {
    const mess: TMessage | null = messages.find((obj) => obj.id === id) || null;
    setParentMessage(mess);
  };

  const handleClickHide = (): void => {
    setParentMessage(null);
  };

  // Ввод сообщения
  const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget;
    const isDisabledButton = target.value.length === 0;
    if (isDisabledButton) {
      target.classList.add(styles.error);
    } else {
      target.classList.remove(styles.error);
    }
    setDisabledBtn(isDisabledButton);
    setNewMessageValue(target.value);
  };

  // Отправка сообщения
  const onSubmitMessage = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    let newMessage: TMessageNew;
    if (userData) {
      newMessage = {
        content: newMessageValue,
        user_id: userData.id,
        topic_id: topicId,
        forum_id: topic.forum_id,
        parent_id: parentMessage?.id,
      };

      messageAPI.create(newMessage)
        .then(() => fetchMessages(messageAPI, topicId))
        .then(() => {
          setNewMessageValue('');
          setParentMessage(null);
        });
    }
  };

  const buttonClassNames = classNames(
    styles.sendBtn,
    { [styles.disabled]: isDisabledBtn },
  );

  return (
    <main className={styles.container}>
      {(isLoadingTopic || isLoadingMessages)
        ? <Loader />
        : (
          <div className={styles.wrapper}>
            <header className={styles.header}>
              <span className={styles.backBtn}>
                <ButtonBack />
              </span>

              <h1 className={styles.title}>
                Тема:
                {' '}
                {topic.name}
              </h1>
            </header>

            <section className={styles.section}>
              {messages.length ? messages.map(
                (data) => (
                  <div key={data.id} className={styles.messageWrap}>
                    <div className={styles.row}>
                      <div className={styles.subtext}>
                        <span className={styles.messAuthor}>
                          {showAuthor(data.user)}
                        </span>
                        <span>{dateFormat(data.createdAt)}</span>
                      </div>
                      <Button
                        extraClassName={styles.linkBtn}
                        onClick={() => handleClickReply(data.id)}
                      >
                        Ответить
                      </Button>
                    </div>

                    {data.parent_id
                      && <ParentMessage messagesArr={messages} id={data.parent_id} />}

                    <div className={styles.row}>
                      <div className={styles.rowItem1}>

                        {/* TODO When avatar will be in PS-database */}

                        <img
                          className={styles.avatar}
                          src={putAvatar(data.user?.avatar)}
                          alt="Avatar"
                        />
                        <div className={styles.messText}>{data.content}</div>
                      </div>
                      {/* TODO Will be Emoji reactions */}
                      {/* <div>Emoji</div> */}
                    </div>
                  </div>
                ),
              ) : <h2 className={styles.subtitle}>В этой теме ещё нет сообщений</h2>}
            </section>
            <footer>
              <form onSubmit={(e) => onSubmitMessage(e)} className={styles.footer}>
                <div className={styles.footerWrap}>
                  {parentMessage !== null && (
                  <div className={styles.replyWrap}>
                    <div className={styles.sender}>
                      <span>
                        {showAuthor(parentMessage.user)}
                      </span>
                      <button type="button" onClick={handleClickHide} className={styles.closeBtn}>
                        <img src={close} alt="Close button" />
                      </button>
                    </div>
                    <div className={styles.replyText}>
                      {parentMessage.content}
                    </div>
                  </div>
                  )}
                  <textarea
                    name="content"
                    value={newMessageValue}
                    onChange={(e) => handleMessageChange(e)}
                    className={styles.chatTextarea}
                    rows={4}
                    data-variant="filled"
                    data-autosize="true"
                    autoComplete="off"
                    placeholder="Сообщение"
                  />
                </div>
                <Button disabled={!newMessageValue} type="submit" extraClassName={buttonClassNames}>
                  Отправить
                </Button>
              </form>
            </footer>
          </div>
        )}
      {(topicError || messagesError) && <div>Произошла ошибка при загрузке данных</div>}
    </main>
  );
}
