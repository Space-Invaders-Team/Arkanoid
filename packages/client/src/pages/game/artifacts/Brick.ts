import { Ball } from './Ball';

export class Brick {
  public static readonly width = 60;

  public static readonly height = 25;

  private readonly _color = '#0095DD';

  private _isActive = true;

  private _x: number;

  private _y: number;

  constructor(
    private readonly ctx: CanvasRenderingContext2D,
    private readonly ball: Ball,
    x: number,
    y: number,
  ) {
    this._x = x;
    this._y = y;
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

  private isBallInBrick() {
    return this.ball.getEdgeCoord('right') > this._x
      && this.ball.getEdgeCoord('left') < this._x + Brick.width
      && this.ball.getEdgeCoord('bottom') > this._y
      && this.ball.getEdgeCoord('top') < this._y + Brick.height;
  }

  public draw() {
    this.ctx.beginPath();
    this.ctx.rect(this._x, this._y, Brick.width, Brick.height);
    this.ctx.fillStyle = this._color;
    this.ctx.fill();
    this.ctx.closePath();
  }

  public detectCollision() {
    if (this._isActive) {
      if (this.isBallInBrick()) {
        const brickCenterCoords = {
          x: this._x + (Brick.width / 2),
          y: this._y + (Brick.height / 2),
        };

        const brickTangent = Brick.height / Brick.width;
        const ballTangent = Math.abs(this.ball.getTangent(brickCenterCoords));

        if (ballTangent < brickTangent) {
          this.ball.flipX();
        } else if (ballTangent > brickTangent) {
          this.ball.flipY();
        } else {
          this.ball.flipX();
          this.ball.flipY();
        }

        this._isActive = false;
      }
    }
  }
}
