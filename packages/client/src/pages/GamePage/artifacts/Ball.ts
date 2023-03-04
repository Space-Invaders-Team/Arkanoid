export class Ball {
  private readonly _radius = 10;

  private readonly _color = '#0095dd';

  private readonly _speed = 6;

  private readonly _initialY: number;

  private _y: number;

  private _angle = -(Math.random() * (Math.PI / 2) + Math.PI / 4);

  constructor(
    private readonly ctx: CanvasRenderingContext2D,
    private _x: number,
    canvasHeight: number,
    paddleOffset: number,
  ) {
    this._y = canvasHeight - this._radius - paddleOffset;
    this._initialY = this._y;
  }

  public set angle(value: number) {
    this._angle = value;
  }

  public get radius(): number {
    return this._radius;
  }

  public get y(): number {
    return this._y;
  }

  public get x(): number {
    return this._x;
  }

  public draw() {
    this.ctx.beginPath();
    this.ctx.arc(this._x, this._y, this._radius, 0, Math.PI * 2);
    this.ctx.fillStyle = this._color;
    this.ctx.fill();
    this.ctx.closePath();
  }

  public moveByX(paddleX?: number) {
    if (paddleX) {
      this._x = paddleX;

      return;
    }

    this._x += this._speed * Math.cos(this._angle);
  }

  public moveByY(paddleY?: number) {
    if (paddleY) {
      this._y = paddleY;

      return;
    }

    this._y += this._speed * Math.sin(this._angle);
  }

  public flipX() {
    this._angle = Math.PI - this._angle;
  }

  public flipY() {
    this._angle *= -1;
  }

  public resetY() {
    this._y = this._initialY;
  }
}
