import { useEffect, useRef } from 'react';
import styles from './game.module.css';
import { GameCore } from './artifacts/GameCore';

export function Game() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
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
  }, []);
  return (
    <div className={styles.container}>
      <canvas
        id="game"
        className={styles.canvas}
        ref={canvasRef}
      />
    </div>
  );
}
