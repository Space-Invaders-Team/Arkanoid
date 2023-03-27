import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Button } from '../../Button';
import { GameStatus } from '../../../pages/GamePage/typings';
import commonStyles from '../GameScreens.module.css';
import styles from './EndScreen.module.css';
import type { Props } from './typings';
import { Paths } from '../../../utils/routeConstants';
import { useAppSelector } from '../../../store/hooks';
import { selectGameData } from '../../../store/selectors';
import { TGameState } from '../../../store/typings';
import gameOver from '../../../assets/sounds/game-over.mp3';
import { createAudioContext } from '../../../pages/GamePage/utils/audio';

let audioCtx: { audioContext: AudioContext; audio: HTMLAudioElement; };

const titleMap = new Map<GameStatus, string>([
  [GameStatus.WIN, 'FLAWLESS VICTORY'],
  [GameStatus.LOSE, 'GAME OVER'],
]);

const videoMap = new Map<GameStatus, string>([
  [GameStatus.WIN, '/win.mp4'],
  [GameStatus.LOSE, '/lose.mp4'],
]);

export function EndScreen({ status, onClickPrimaryBtn }: Props) {
  const navigate = useNavigate();
  const endScreenClassName = classNames(commonStyles.dummyScreen, styles.container);
  const gameData: TGameState = useAppSelector(selectGameData);
  const { score, tryCount } = gameData;

  useEffect(() => {
    const isMute = localStorage.getItem('isMute') === 'true';
    if (!isMute) {
      audioCtx = createAudioContext(gameOver);
      audioCtx.audio.play();
    }
    return () => {
      audioCtx?.audioContext?.suspend();
    };
  }, []);

  return (
    <div className={endScreenClassName}>
      <span className={styles.text}>{titleMap.get(status)}</span>
      <span className={styles.score}>
        {'Очки: '}
        { score }
      </span>
      <span className={styles.tries}>
        {'Попытки: '}
        { tryCount }
      </span>
      <video className={styles.video} autoPlay loop muted src={videoMap.get(status)} />
      <Button
        extraClassName={commonStyles.button}
        onClick={onClickPrimaryBtn}
      >
        Начать заново
      </Button>
      <Button
        extraClassName={commonStyles.buttonLight}
        onClick={() => navigate(Paths.LEADERBOARD)}
      >
        Таблица лидеров
      </Button>
    </div>
  );
}
