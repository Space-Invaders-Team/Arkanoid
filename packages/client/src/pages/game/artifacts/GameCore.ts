import { Ball } from './Ball';
import { Paddle } from './Paddle';
import { BricksContainer } from './BricksContainer';

export class GameCore {
  private readonly _ball: Ball;

  private readonly _paddle: Paddle;

  private readonly _bricks: BricksContainer;

  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly ctx: CanvasRenderingContext2D,
  ) {
    this._ball = new Ball(ctx, canvas.width / 2, canvas.height - 30);
    this._paddle = new Paddle(ctx, canvas.width, canvas.height);
    this._bricks = new BricksContainer(ctx, canvas.width, this._ball);

    document.addEventListener('keydown', this._paddle.keyHandler, false);
    document.addEventListener('keyup', this._paddle.keyHandler, false);

    canvas.addEventListener('mousemove', (event) => {
      this._paddle.moveByMouse(event.offsetX);
    });

    canvas.addEventListener('mouseover', () => {
      document.body.style.cursor = 'none';
    });
    canvas.addEventListener('mouseout', () => {
      document.body.style.cursor = 'initial';
    });
  }

  public draw = () => {
    const {
      canvas,
      _paddle: paddle,
      _ball: ball,
      _bricks: bricks,
      ctx,
    } = this;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    paddle.draw();
    ball.draw();
    bricks.draw();

    const canvasRightEdgeX = canvas.width - ball.radius;

    if (ball.nextX > canvasRightEdgeX || ball.nextX < ball.radius) {
      ball.flipX();
    }

    const canvasBottomEdgeY = canvas.height - ball.radius - paddle.heightWithOffset;

    if (ball.nextY < ball.radius) {
      ball.flipY();
    } else if (ball.nextY > canvasBottomEdgeY) {
      const isBallIntoPaddle = ball.x > paddle.x
        && ball.x < paddle.x + paddle.width;

      if (isBallIntoPaddle) {
        ball.flipY();
      } else {
        console.log('game over');
        document.location.reload();
      }
    }

    paddle.moveByKeyboard();
    ball.moveByX();
    ball.moveByY();

    requestAnimationFrame(this.draw);
  };
}
