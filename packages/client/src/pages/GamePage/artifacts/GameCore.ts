import { Ball } from './Ball';
import { Paddle } from './Paddle';
import { BricksContainer } from './BricksContainer';
import { GameStatus } from '../typings';

const SPACEBAR_KEY = ' ';

export class GameCore {
  private readonly _ball: Ball;

  private readonly _paddle: Paddle;

  private readonly _bricks: BricksContainer;

  private _status: GameStatus;

  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly ctx: CanvasRenderingContext2D,
  ) {
    this._ball = new Ball(ctx, canvas.width / 2, canvas.height - 30);
    this._paddle = new Paddle(ctx, canvas.width, canvas.height);
    this._bricks = new BricksContainer(ctx, canvas.width, this._ball);
    this._status = GameStatus.ONBOARDING;

    document.addEventListener('keydown', this.startGame);
    document.addEventListener('keydown', this._paddle.keyHandler, false);
    document.addEventListener('keyup', this._paddle.keyHandler, false);

    canvas.addEventListener('click', this.startGame);
    canvas.addEventListener('mousemove', this.movePaddleByMouse);
    canvas.addEventListener('mouseover', this.toggleCursor);
    canvas.addEventListener('mouseout', this.toggleCursor);
  }

  private startGame = (event: KeyboardEvent | MouseEvent) => {
    const isSpacebarPressed = event instanceof KeyboardEvent && event.key === SPACEBAR_KEY;

    if (event instanceof MouseEvent || isSpacebarPressed) {
      this._status = GameStatus.RUNNING;
      document.removeEventListener('keydown', this.startGame);
      document.removeEventListener('click', this.startGame);
    }
  };

  private toggleCursor = (event: MouseEvent) => {
    if (event.type === 'mouseover') {
      document.body.style.cursor = 'none';

      return;
    }

    document.body.style.cursor = 'initial';
  };

  private movePaddleByMouse = (event: MouseEvent) => {
    this._paddle.moveByMouse(event.offsetX);

    if (this._status === GameStatus.PREPARING) {
      this.followBallToPaddle(event.offsetX);
    }
  };

  private followBallToPaddle(paddleXCoord: number) {
    const paddleTop = this.canvas.height - this._paddle.heightWithOffset;
    const paddleMiddle = Math.min(
      paddleXCoord + this._paddle.width / 2,
      this.canvas.width - this._paddle.width / 2,
    );

    this._ball.moveByX(paddleMiddle);
    this._ball.moveByY(paddleTop - this._ball.radius);
  }

  public get status(): GameStatus {
    return this._status;
  }

  public set status(value: GameStatus) {
    this._status = value;
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
        // console.log('game over');
        // document.location.reload();
      }
    }

    paddle.moveByKeyboard();

    if (this._status === GameStatus.PREPARING) {
      this.followBallToPaddle(this._paddle.x);
    }

    if (this._status === GameStatus.RUNNING) {
      ball.moveByX();
      ball.moveByY();
    }

    requestAnimationFrame(this.draw);
  };
}
