import { Ball } from './Ball';
import { Paddle } from './Paddle';
import { BricksContainer } from './BricksContainer';
import { GameStatus } from '../typings';

const SPACEBAR_KEY = ' ';
const LIVES_AMOUNT = 2;

export class GameCore {
  private readonly _ball: Ball;

  private readonly _paddle: Paddle;

  private readonly _bricks: BricksContainer;

  private _status = GameStatus.ONBOARDING;

  private _lives = LIVES_AMOUNT;

  private _score = 0;

  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly ctx: CanvasRenderingContext2D,
    private readonly onChangeStatus: (status: GameStatus) => void,
  ) {
    this._paddle = new Paddle(ctx, canvas.width, canvas.height);
    this._ball = new Ball(ctx, canvas.width / 2, canvas.height, this._paddle.heightWithOffset);
    this._bricks = new BricksContainer(ctx, canvas.width, this._ball, this.increaseScore);

    document.addEventListener('keydown', this.startGame);
    document.addEventListener('keydown', this._paddle.keyHandler, false);
    document.addEventListener('keyup', this._paddle.keyHandler, false);

    canvas.addEventListener('click', this.startGame);
    canvas.addEventListener('mousemove', this.movePaddleByMouse);
    canvas.addEventListener('mouseover', this.toggleCursor);
    canvas.addEventListener('mouseout', this.toggleCursor);
  }

  public get status(): GameStatus {
    return this._status;
  }

  public set status(value: GameStatus) {
    this._status = value;
  }

  private increaseScore = () => {
    this._score += 10;
  };

  private startGame = (event: KeyboardEvent | MouseEvent) => {
    const isSpacebarPressed = event instanceof KeyboardEvent && event.key === SPACEBAR_KEY;

    if (event instanceof MouseEvent || isSpacebarPressed) {
      this._status = GameStatus.RUNNING;
      document.removeEventListener('keydown', this.startGame);
      document.removeEventListener('click', this.startGame);
    }
  };

  private toggleCursor(event: MouseEvent) {
    if (event.type === 'mouseover') {
      document.body.style.cursor = 'none';

      return;
    }

    document.body.style.cursor = 'initial';
  }

  private movePaddleByMouse = (event: MouseEvent) => {
    this._paddle.moveByMouse(event.offsetX);

    if (this._status === GameStatus.PREPARING) {
      this.followBallToPaddle(event.offsetX);
    }
  };

  private followBallToPaddle = (paddleXCoord: number) => {
    const paddleTop = this.canvas.height - this._paddle.heightWithOffset;
    const paddleMiddle = Math.min(
      paddleXCoord + this._paddle.width / 2,
      this.canvas.width - this._paddle.width / 2,
    );

    this._ball.moveByX(paddleMiddle);
    this._ball.moveByY(paddleTop - this._ball.radius);
  };

  private changeUIStatus(status: GameStatus) {
    this._status = status;
    this.onChangeStatus(status);
  }

  private drawText(text: string, x: number, y: number) {
    const fontFamily = getComputedStyle(document.body)
      .getPropertyValue('--font-family') ?? 'Arial, sans-serif';

    this.ctx.font = `32px ${fontFamily}`;
    this.ctx.fillStyle = '#0095dd';
    this.ctx.fillText(text, x, y);
  }

  public setInitialState = () => {
    const {
      canvas,
      ctx,
      _paddle: paddle,
      _ball: ball,
      _bricks: bricks,
    } = this;

    this._score = 0;
    this._lives = LIVES_AMOUNT;
    this._status = GameStatus.PREPARING;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    paddle.draw();
    ball.resetY();
    ball.draw();
    bricks.resetBricks();
    bricks.draw();
  };

  public startNewGame = () => {
    this.setInitialState();
  };

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
    this.drawText(`Очки: ${this._score}`, 8, 32);
    this.drawText(`Жизни: ${this._lives}`, this.canvas.width - 150, 32);

    const canvasRightEdgeX = canvas.width - ball.radius;

    if (ball.x > canvasRightEdgeX || ball.x < ball.radius) {
      ball.flipX();
    }

    const canvasBottomEdgeY = canvas.height - ball.radius - paddle.heightWithOffset;

    if (ball.y < ball.radius) {
      ball.flipY();
    } else if (ball.y > canvasBottomEdgeY) {
      const isBallIntoPaddle = (
        ball.x > paddle.x
        && ball.x < paddle.x + paddle.width
      );

      if (isBallIntoPaddle) {
        const shift = (
          (paddle.x + paddle.width / 2 - ball.x)
          / (paddle.width / 2)
        );
        const shiftCoef = shift / 2 + 0.5;

        ball.angle = -(shiftCoef * (Math.PI / 2) + Math.PI / 4);
      } else {
        this._lives--;
        this._status = GameStatus.PREPARING;
        ball.flipY();

        if (this._lives <= 0) {
          this.changeUIStatus(GameStatus.LOSE);
        }
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

    if (![GameStatus.WIN, GameStatus.LOSE].includes(this._status)) {
      requestAnimationFrame(this.draw);
    }
  };
}
