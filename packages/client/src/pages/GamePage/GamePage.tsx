import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { drawGame } from './utils/drawGame';
import { Button } from '../../components/Button';
import { GameStatus } from './typings';
import type { GameCore } from './artifacts';
import styles from './GamePage.module.css';

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

  useEffect(() => {
    setIsRunStartAnimation(true);
    drawGame(canvasRef, gameRef);
  }, []);

  const startScreenClassName = classNames(styles.dummyScreen, styles.startScreen);
  const descrWrapperClassName = classNames(
    styles.descrWrapper,
    { [styles.descrWrapperVisible]: isRunStartAnimation },
  );
  const startButtonClassName = classNames(
    styles.button,
    styles.startButton,
    { [styles.startButtonVisible]: isRunStartAnimation },
  );
  const endScreenClassName = classNames(styles.dummyScreen, styles.endScreen);
  const endButtonClassName = classNames(styles.button);

  return (
    <main className={styles.container}>
      <section className={styles.field}>
        {
          gameStatus === GameStatus.ONBOARDING
          && (
            <div className={startScreenClassName}>
              <article className={descrWrapperClassName}>
                <h2 className={styles.descrTitle}>Об игре:</h2>
                <p className={styles.descrText}>
                  Игра арканоид являет собой классику жанра среди игровой серии аркады. В вашем
                  распоряжении шарик и платформа, которая запускает или отбивает шарик. Цель игры
                  уничтожить все блоки и сохранить все доступные жизни. За прохождение уровней игрок
                  будет получать очки награды, которые фиксируются в таблице рекордов.
                </p>
              </article>
              <article className={descrWrapperClassName}>
                <h2 className={styles.descrTitle}>Как играть:</h2>
                <p className={styles.descrText}>
                  Двигайте мышью вправо или влево либо нажимайте стрелки ⬅️ ➡️ на клавиатуре︎, чтобы
                  управлять подвижной платформой и отбивать шарик. Для запуска шара нажмите левую
                  клавишу
                  мыши или пробел.
                </p>
              </article>
              <Button extraClassName={startButtonClassName} onClick={handleClickStart}>
                Начать игру
              </Button>
            </div>
          )
        }
        <canvas
          id="game"
          className={styles.canvas}
          ref={canvasRef}
        />
        {
          gameStatus === GameStatus.WIN
          && (
            <div className={endScreenClassName}>
              <span className={styles.endText}>Уровень пройден!</span>
              <Button
                extraClassName={endButtonClassName}
                onClick={handleClickNextLevel}
              >
                Играть дальше
              </Button>
              <Button
                mode="secondary"
                extraClassName={endButtonClassName}
                onClick={handleClickStartAgain}
              >
                Переиграть уровень
              </Button>
            </div>
          )
        }
        {
          gameStatus === GameStatus.LOSE
          && (
            <div className={endScreenClassName}>
              <span className={styles.endText}>Поражение!</span>
              <Button
                extraClassName={endButtonClassName}
                onClick={handleClickStartAgain}
              >
                Играть заново
              </Button>
            </div>
          )
        }
      </section>
    </main>
  );
}
