import classNames from 'classnames';
import { Button } from '../../Button';
import { GameStatus } from '../../../pages/GamePage/typings';
import commonStyles from '../gameScreen.module.css';
import styles from './EndScreen.module.css';
import type { Props } from './typings';

const titleMap = new Map<GameStatus, string>([
  [GameStatus.WIN, 'Уровень пройден!'],
  [GameStatus.LOSE, 'Поражение!'],
]);

const primaryButtonMap = new Map<GameStatus, string>([
  [GameStatus.WIN, 'Играть дальше'],
  [GameStatus.LOSE, 'Начать заново'],
]);

const secondaryButtonMap = new Map<GameStatus, string>([
  [GameStatus.WIN, 'Переиграть уровень'],
]);

export function EndScreen({ status, onClickPrimaryBtn, onClickSecondaryBtn }: Props) {
  const endScreenClassName = classNames(commonStyles.dummyScreen, styles.container);
  const endButtonClassName = classNames(commonStyles.button);

  return (
    <div className={endScreenClassName}>
      <span className={styles.text}>{titleMap.get(status)}</span>
      <Button
        extraClassName={endButtonClassName}
        onClick={onClickPrimaryBtn}
      >
        {primaryButtonMap.get(status)}
      </Button>
      {
        status === GameStatus.WIN
        && onClickSecondaryBtn
        && (
          <Button
            mode="secondary"
            extraClassName={endButtonClassName}
            onClick={onClickSecondaryBtn}
          >
            {secondaryButtonMap.get(status)}
          </Button>
        )
      }
    </div>
  );
}
