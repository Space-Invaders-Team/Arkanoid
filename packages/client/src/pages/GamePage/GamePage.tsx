import { ReactNode, useEffect, useRef, useState } from 'react';
import { drawGame } from './utils/drawGame';
import { StartScreen } from '../../components/game_screens/StartScreen';
import { EndScreen } from '../../components/game_screens/EndScreen';
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

  const handleClickNextLevel = () => {
    console.log('Перейти на следующий уровень');
  };

  const handleClickStartAgain = () => {
    console.log('Переиграть уровень!');
  };

  const canvasRef = useRef<HTMLCanvasElement>(null);
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
        onClickPrimaryBtn={handleClickNextLevel}
        onClickSecondaryBtn={handleClickStartAgain}
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
    drawGame(canvasRef, gameRef);
  }, []);

  return (
    <main className={styles.container}>
      {/* TODO: Убрать кнопки, когда сделаю подсчёт очков и завершение игры */}
      <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', gap: 16, top: '50vh', left: 100 }}>
        <button onClick={() => setGameStatus(GameStatus.WIN)}>Победа</button>
        <button onClick={() => setGameStatus(GameStatus.LOSE)}>Поражение</button>
        <button onClick={() => setGameStatus(GameStatus.ONBOARDING)}>Онбординг</button>
      </div>
      {/*  */}
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
