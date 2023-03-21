import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { drawGame } from './utils/drawGame';
import { EndScreen, StartScreen } from '../../components/GameScreens';
import styles from './GamePage.module.css';
import { GameStatus } from './typings';
import type { GameCore } from './artifacts';
import { Button } from '../../components/Button';
import { toggleFullScreen } from './utils/toggleFullScreen';
import { IconFullscreen } from '../../components/Icons/IconFullscreen';
import { IconFullscreenExit } from '../../components/Icons/IconFullscreenExit';
import { leaderboardAPI } from '../../api/LeaderboardAPI/LeaderboardAPI';
import { TEAM_NAME } from '../../utils/apiConstans';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectUserData } from '../../store/selectors';
import { UserData } from '../../store/typings';
import { increaseTryCount, setScore } from '../../store/features/gameSlice';
import startAudio from '../../assets/sounds/start.mp3';
import { createAudioContext } from './utils/audio';

const { audio, audioContext } = createAudioContext(startAudio);

export function GamePage() {
  const gameRef = useRef<GameCore | null>(null);
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.ONBOARDING);
  const userData: UserData | null = useAppSelector(selectUserData);
  const dispatch = useAppDispatch();

  const handleClickStart = () => {
    setGameStatus(GameStatus.PREPARING);
    audio.pause();

    if (gameRef.current) {
      gameRef.current.status = GameStatus.PREPARING;
    }
  };

  const handleClickStartAgain = () => {
    const gameCore = gameRef.current;

    if (gameCore) {
      gameCore.startNewGame();
      setGameStatus(GameStatus.PREPARING);
      requestAnimationFrame(gameCore.draw);
    }
  };

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const sentResults = useCallback(
    () => {
      if (gameRef.current) {
        const score: number = gameRef.current.getScore();

        if (userData) {
          const userId: number = userData.id;
          const userName: string = userData.login;

          dispatch(setScore(score));
          dispatch(increaseTryCount());

          leaderboardAPI.addLider({
            data: {
              id: userId,
              name: userName,
              score,
            },
            ratingFieldName: 'score',
            teamName: TEAM_NAME,
          });
        }
      }
    },
    [dispatch, userData],
  );

  const [isRunStartAnimation, setIsRunStartAnimation] = useState<boolean>(false);
  const screenMap = new Map<GameStatus, ReactNode>([
    [
      GameStatus.ONBOARDING,
      <StartScreen
        isRunStartAnimation={isRunStartAnimation}
        onClick={handleClickStart}
      />,
    ],
    [
      GameStatus.WIN,
      <EndScreen
        status={gameStatus}
        onClickPrimaryBtn={handleClickStartAgain}
      />,
    ],
    [
      GameStatus.LOSE,
      <EndScreen
        status={gameStatus}
        onClickPrimaryBtn={handleClickStartAgain}
      />,
    ],
  ]);

  useEffect(() => {
    setIsRunStartAnimation(true);

    if (!gameRef.current) {
      drawGame(canvasRef, gameRef, setGameStatus);
    }

    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    audio.play();
    return () => {
      audio.pause();
    };
  }, []);

  useEffect(() => {
    if (gameStatus === GameStatus.LOSE) {
      sentResults();
    }
  }, [gameStatus, sentResults]);

  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  const fullscreenchanged = () => {
    // document.fullscreenElement will point to the element that
    // is in fullscreen mode if there is one. If there isn't one,
    // the value of the property is null.
    if (document.fullscreenElement) {
      setIsFullScreen(true);
    } else {
      setIsFullScreen(false);
    }
  };

  return (
    <main className={styles.container}>
      <section className={styles.field} id="gameWrap">
        {
          screenMap.get(gameStatus)
        }
        <canvas
          id="game"
          className={styles.canvas}
          ref={canvasRef}
        />
        <div className={styles.btnWrap}>
          <Button
            id="fullscreenBtn"
            onClick={() => toggleFullScreen(fullscreenchanged)}
            shape="icon"
            mode="secondary"
          >
            {isFullScreen ? <IconFullscreenExit /> : <IconFullscreen />}
          </Button>
        </div>

      </section>
    </main>
  );
}
