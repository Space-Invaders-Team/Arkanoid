import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Button } from '../../../components/Button';
import styles from './Messages.module.css';
import { TLike, TMessage, TMessageNew } from './typings';
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
import { IconLike } from '../../../components/Icons/IconLike';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  const [likeClicks, setlikeClicks] = useState<number>(0);
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  }, [topicId, fetchActiveTopic, fetchMessages, likeClicks]);

  // Добавление сообщения, на которое отвечает юзер
  const handleClickReply = (id: number): void => {
    const mess: TMessage | null = messages.find((obj) => obj.id === id) || null;
    setParentMessage(mess);
  };

  // Лайк
  const handleClickLike = (e: React.SyntheticEvent<EventTarget>, id: number) => {
    const userId: number | undefined = userData?.id;

    if (userId) {
      const likeData: TLike = {
        userId: Number(userId),
        messageId: Number(id),
      };

      messageAPI.like(likeData)
        .then(() => {
          setlikeClicks(likeClicks + 1);
        });
    }
  };

  // Дизлайк
  const handleClickDisLike = (e: React.SyntheticEvent<EventTarget>, id: number) => {
    const userId: number | undefined = userData?.id;

    if (userId) {
      const likeData: TLike = {
        userId: Number(userId),
        messageId: Number(id),
      };

      messageAPI.dislike(likeData)
        .then(() => {
          setlikeClicks(likeClicks + 1);
        });
    }
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

                        <div className={styles.avatar}>
                          <img
                            className={styles.avatarImg}
                            src={putAvatar(data.user?.avatar)}
                            alt="Avatar"
                          />
                        </div>

                        <div className={styles.messText}>{data.content}</div>
                      </div>
                    </div>

                    <div className={styles.reactions}>
                      <button
                        className={classNames(styles.likeBtn, styles.like)}
                        onClick={(e) => handleClickLike(e, data.id)}
                      >
                        <IconLike />
                      </button>
                      (
                      {data.likeCount}
                      )

                      <button
                        className={classNames(styles.likeBtn, styles.dislike)}
                        onClick={(e) => handleClickDisLike(e, data.id)}
                      >
                        <IconLike />
                      </button>
                      (
                      {data.dislikeCount}
                      )

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
