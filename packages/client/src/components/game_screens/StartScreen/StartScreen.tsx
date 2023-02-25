import classNames from 'classnames';
import { Button } from '../../Button';
import commonStyles from '../gameScreen.module.css';
import styles from './StartScreen.module.css';
import type { Props } from './typings';

export function StartScreen({ isRunStartAnimation, onClick }: Props) {
  const startScreenClassName = classNames(commonStyles.dummyScreen, styles.container);
  const descrWrapperClassName = classNames(
    styles.descrWrapper,
    { [styles.descrWrapperVisible]: isRunStartAnimation },
  );
  const startButtonClassName = classNames(
    commonStyles.button,
    styles.button,
    { [styles.buttonVisible]: isRunStartAnimation },
  );

  return (
    <div className={startScreenClassName}>
      <article className={descrWrapperClassName}>
        <h2 className={styles.descrTitle}>Как играть:</h2>
        <p className={styles.descrText}>
          Двигайте мышью вправо или влево либо нажимайте стрелки ⬅️ ➡️ на клавиатуре︎, чтобы
          управлять подвижной платформой и отбивать шарик. Для запуска шара нажмите левую
          клавишу
          мыши или пробел.
        </p>
      </article>
      <Button extraClassName={startButtonClassName} onClick={onClick}>
        Начать игру
      </Button>
    </div>
  );
}
