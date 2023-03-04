import classNames from 'classnames';
import { Button } from '../../Button';
import { GameStatus } from '../../../pages/GamePage/typings';
import commonStyles from '../GameScreens.module.css';
import styles from './EndScreen.module.css';
import type { Props } from './typings';

const titleMap = new Map<GameStatus, string>([
  [GameStatus.WIN, 'FLAWLESS VICTORY'],
  [GameStatus.LOSE, 'GAME OVER'],
]);

const videoMap = new Map<GameStatus, string>([
  [GameStatus.WIN, '/win.mp4'],
  [GameStatus.LOSE, '/lose.mp4'],
]);

export function EndScreen({ status, onClickPrimaryBtn }: Props) {
  const endScreenClassName = classNames(commonStyles.dummyScreen, styles.container);

  return (
    <div className={endScreenClassName}>
      <span className={styles.text}>{titleMap.get(status)}</span>
      <video className={styles.video} autoPlay loop muted src={videoMap.get(status)} />
      <Button
        extraClassName={commonStyles.button}
        onClick={onClickPrimaryBtn}
      >
        Начать заново
      </Button>
    </div>
  );
}
