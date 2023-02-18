import type { MutableRefObject } from 'react';
import { GameCore } from '../artifacts';

export const drawGame = (
  canvasRef: MutableRefObject<HTMLCanvasElement | null>,
  gameRef: MutableRefObject<GameCore | null>,
) => {
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

  gameRef.current = new GameCore(canvas, ctx);

  requestAnimationFrame(gameRef.current.draw);
};
