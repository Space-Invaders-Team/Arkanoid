import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { GameCore } from './artifacts';
import { Button } from '../../components/Button';
import styles from './GamePage.module.css';

export function GamePage() {
  const [isVisibleDescrScreen, setIsVisibleDescrScreen] = useState<boolean>(true);
  const [isVisibleRules, setIsVisibleRules] = useState<boolean>(false);

  const handleClickStart = () => {
    setIsVisibleDescrScreen(false);
  };

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const drawGame = () => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return;
    }

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    const game = new GameCore(canvas, ctx);

    requestAnimationFrame(game.draw);
  };

  useEffect(() => {
    setIsVisibleRules(true);
    drawGame();
  }, []);

  const startScreenClassName = classNames(
    styles.startScreen,
    { [styles.startScreenHidden]: !isVisibleDescrScreen },
  );
  const descrWrapperClassName = classNames(
    styles.descrWrapper,
    { [styles.descrWrapperVisible]: isVisibleRules },
  );
  const startButtonClassName = classNames(
    styles.startButton,
    { [styles.startButtonVisible]: isVisibleRules },
  );

  return (
    <main className={styles.container}>
      <section className={styles.field}>
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
        <canvas
          id="game"
          className={styles.canvas}
          ref={canvasRef}
        />
      </section>
    </main>
  );
}
