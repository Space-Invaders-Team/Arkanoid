import { ReactNode, useEffect, useRef, useState } from 'react';
import { drawGame } from './utils/drawGame';
import { EndScreen, StartScreen } from '../../components/GameScreens';
import styles from './GamePage.module.css';
import { GameStatus } from './typings';
import type { GameCore } from './artifacts';

export function GamePage() {
  const gameRef = useRef<GameCore | null>(null);
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.ONBOARDING);

  const handleClickStart = () => {
    setGameStatus(GameStatus.PREPARING);

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

  const sentResults = () => {
    console.log('Здесь должна быть отправка результата в API Leaderboard');
  };

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
  }, []);

  useEffect(() => {
    if (gameStatus === GameStatus.LOSE) {
      sentResults();
    }
  }, [gameStatus]);

  return (
    <main className={styles.container}>
      <section className={styles.field}>
        {
          screenMap.get(gameStatus)
        }
        <canvas
          id="game"
          className={styles.canvas}
          ref={canvasRef}
        />
      </section>
    </main>
  );
}
