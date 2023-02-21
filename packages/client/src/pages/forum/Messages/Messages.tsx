import { useState } from 'react';
import { Button } from '../../../components/Button';
import styles from './Messages.module.css';
import { TMessage } from './typings';
import { ButtonBack } from '../ButtonBack';
import close from '../../../assets/icons/close.svg';
import avatar from '../../../assets/img/logo.webp';
import { messData } from './data';

export function Messages() {
  const [replyMessage, setReplyMessage] = useState<TMessage | null>(null);
  // eslint-disable-next-line no-lone-blocks
  { /* TODO изменить при подключении API */ }
  const handleClickReply = (id: number): void => {
    console.log('Reply-button clicked', id);
    const mess: TMessage | null = messData.find((obj) => obj.id === id) || null;
    setReplyMessage(mess);
  };
  const handleClickSend = (): void => {
    console.log('Send-button clicked');
  };
  const handleClickHide = (): void => {
    setReplyMessage(null);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <span className={styles.backBtn}>
          <ButtonBack />
        </span>

        <h1>Название темы</h1>
      </header>
      <section className={styles.section}>
        {messData.map(
          (data) => (
            <div key={data.id} className={styles.messageWrap}>
              <div className={styles.row}>
                <div className={styles.subtext}>
                  <span className={styles.messAuthor}>{data.author}</span>
                  <span>{data.date}</span>
                </div>
                <Button extraClassName={styles.linkBtn} onClick={() => handleClickReply(data.id)}>
                  Ответить
                </Button>
              </div>
              {/* TODO удалить поле isQuote, заменить на id сообщения */}
              {data.isQuote && (
                <div className={styles.quoteRow}>
                  <div className={styles.quotePerson}>Пётр Пяточкин</div>
                  <div className={styles.subtext}>
                    Форм также в сфера условий сфера количественный реализация активизации.
                  </div>
                </div>
              )}
              <div className={styles.row}>
                <div className={styles.rowItem1}>
                  <img className={styles.avatar} src={avatar} alt="Avatar" />
                  <div className={styles.messText}>{data.text}</div>
                </div>
                {/* TODO Will be Emoji reactions */}
                {/* <div>Emoji</div> */}
              </div>
            </div>
          ),
        )}
      </section>
      <footer className={styles.footer}>
        <div className={styles.footerWrap}>
          {replyMessage !== null && (
          <div className={styles.replyWrap}>
            <div className={styles.sender}>
              <span>
                {replyMessage.author}
              </span>
              <button type="button" onClick={handleClickHide} className={styles.closeBtn}>
                <img src={close} alt="Close button" />
              </button>
            </div>
            <div className={styles.replyText}>
              {replyMessage.text}
            </div>
          </div>
          )}
          <textarea
            name="message"
            className={styles.chatTextarea}
            rows={4}
            data-variant="filled"
            data-autosize="true"
            autoComplete="off"
            placeholder="Сообщение"
          />
        </div>

        <Button extraClassName={styles.sendBtn} onClick={handleClickSend}>
          Отправить
        </Button>
      </footer>
    </div>
  );
}
