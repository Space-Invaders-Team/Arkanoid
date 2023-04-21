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

function ParentMessage(props: { messagesArr: TMessage[], id: number }) {
  const { messagesArr, id } = props;
  const dataMess = messagesArr.find((obj) => obj.id === id);
  return (
    <div className={styles.quoteRow}>
      {/* TODO When user will be in data */}
      <div className={styles.quotePerson}>TODO Пётр Пяточкин</div>
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
  });
  const [fetchActiveTopic, isLoadingTopic, topicError] = useDataById<TTopic>(setTopic);
  const [fetchMessages, isLoadingMessages, messagesError] = useDataById<TMessage[]>(setMessages);
  const [newMessageValue, setNewMessageValue] = useState<string>('');
  const [isDisabledBtn, setDisabledBtn] = useState<boolean>(true);

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
    const newMessage: TMessageNew = {
      content: newMessageValue,
      topic_id: topicId,
      forum_id: messages[0].forum_id,
      parent_id: parentMessage?.id,
    };

    messageAPI.create(newMessage)
      .then((response) => setMessages((prevValue) => [response, ...prevValue]))
      .then(() => setNewMessageValue(''));

    setParentMessage(null);
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
                        {/* TODO When user will be in data */}
                        <span className={styles.messAuthor}>TODO Автор</span>
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
                        {/* TODO src={avatar} When user will be in data */}
                        <img className={styles.avatar} src={avatar} alt="Avatar" />
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
                          {/* TODO When user will be in data */}
                          TODO Имя Автора
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
