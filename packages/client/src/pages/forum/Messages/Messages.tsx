import { useState } from 'react';
import { Button } from '../../../components/Button';
import styles from './Messages.module.css';
import { TMessage } from './typings';
import { ButtonBack } from '../ButtonBack';
import close from '../../../assets/icons/close.svg';
import avatar from '../../../assets/img/logo.webp';

// mock-data
const messData: TMessage[] = [
  {
    id: 1,
    author: 'Иван Иванов',
    date: '15.02.2023',
    text: 'В целом, конечно, начало повседневной работы по формированию позиции не даёт нам иного выбора, кроме определения системы массового участия!',
  },
  {
    id: 2,
    author: 'Иван Иванов',
    date: '15.02.2023',
    isQuote: true,
    text: 'Форм также в сфера условий сфера количественный реализация активизации. Формировании значение порядка, участниками также что рост подготовки развития. Рост нашей и в постоянный задания организаци.',
  },
  {
    id: 3,
    author: 'Иван Иванов',
    date: '15.02.2023',
    text: 'Короткое сообщение',
  },
  {
    id: 4,
    author: 'Иван Иванов',
    date: '15.02.2023',
    text: 'Форм также в сфера условий сфера количественный реализация активизации.',
  },

  {
    id: 5,
    author: 'Иван Иванов',
    date: '15.02.2023',
    text: 'Форм также в сфера условий сфера количественный реализация активизации. Формировании значение порядка, участниками также что рост подготовки развития. Рост нашей и в постоянный задания организаци.',
  },
];

export function Messages() {
  const [isReply, setIsReply] = useState<boolean>(false);
  const handleClickReply = ():void => {
    console.log('Reply-button clicked');
    setIsReply(true);
  };
  const handleClickSend = ():void => {
    console.log('Send-button clicked');
  };
  const handleClickHide = ():void => {
    setIsReply(false);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <ButtonBack />
        <h1>Название темы</h1>
      </header>
      <section className={styles.section}>
        <div>
          {messData.map(
            (data) => (
              <div key={data.id} className={styles.messageWrap}>
                <div className={styles.row}>
                  <div className={styles.subtext}>
                    <span className={styles.messAuthor}>{data.author}</span>
                    <span>{data.date}</span>
                  </div>
                  <Button extraClassName={styles.linkBtn} onClick={handleClickReply}>
                    Ответить
                  </Button>
                </div>
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
        </div>
      </section>
      <footer>
        <div className={styles.footerWrap}>
          {isReply && (
          <div className={styles.replyWrap}>
            <div className={styles.sender}>
              <span>Иван Иванов</span>
              <button type="button" onClick={handleClickHide} className={styles.closeBtn}>
                <img src={close} alt="Close button" />
              </button>
            </div>
            <div className={styles.replyText}>
              Форм также в сфера условий сфера количественный реализация активизации.
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
