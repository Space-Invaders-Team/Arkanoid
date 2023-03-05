import { Ball } from './Ball';

export class Brick {
  public static readonly width = 80;

  public static readonly height = 30;

  private readonly _color = '#0095dd';

  constructor(
    private readonly ctx: CanvasRenderingContext2D,
    private readonly ball: Ball,
    private readonly _width: number,
    private readonly _height: number,
    private _isActive: boolean,
    private _x: number,
    private _y: number,
  ) {
  }

  public get isActive(): boolean {
    return this._isActive;
  }

  public set x(value: number) {
    this._x = value;
  }

  public set y(value: number) {
    this._y = value;
  }

  private getClosestSides() {
    const { x: ballX, y: ballY } = this.ball;
    const { _x: brickX, _y: brickY, _width: brickWidth, _height: brickHeight } = this;

    let closestBrickX = ballX;
    let closestBrickY = ballY;

    if (ballX < brickX) {
      closestBrickX = brickX;
    } else if (ballX > brickX + brickWidth) {
      closestBrickX = brickX + brickWidth;
    }

    if (ballY < brickY) {
      closestBrickY = brickY;
    } else if (ballY > brickY + brickHeight) {
      closestBrickY = brickY + brickHeight;
    }

    return { closestBrickX, closestBrickY };
  }

  private isBallInBrick() {
    const { x: ballX, y: ballY, radius: ballRadius } = this.ball;
    const { closestBrickX, closestBrickY } = this.getClosestSides();
    const legX = ballX - closestBrickX;
    const legY = ballY - closestBrickY;
    const distance = Math.sqrt((legX ** 2) + (legY ** 2));

    return distance <= ballRadius;
  }

  public draw() {
    this.ctx.beginPath();
    this.ctx.rect(this._x, this._y, this._width, this._height);
    this.ctx.fillStyle = this._color;
    this.ctx.fill();
    this.ctx.closePath();
  }

  public isDetectedCollision() {
    if (this._isActive) {
      if (this.isBallInBrick()) {
        this._isActive = false;

        const isBallBetweenTopAndBottom = (
          this._y <= this.ball.y
          && this.ball.y <= this._y + this._height
        );

        if (isBallBetweenTopAndBottom) {
          this.ball.flipX();
        } else {
          this.ball.flipY();
        }

        return true;
      }
    }

    return false;
  }
}
