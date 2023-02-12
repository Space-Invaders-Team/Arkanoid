type EdgeName = 'top' | 'right' | 'bottom' | 'left';

export class Ball {
  private readonly _radius = 10;

  private readonly _color = '#0095dd';

  private readonly _speed = 6;

  private _x: number;

  private _y: number;

  private _dx = this._speed;

  private _dy = this._speed;

  constructor(
    private readonly ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
  ) {
    this._x = x;
    this._y = y;
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

  public get dy(): number {
    return this._dy;
  }

  public get dx(): number {
    return this._dx;
  }

  public get nextX() {
    return this._x + this._dx;
  }

  public get nextY() {
    return this._y + this._dy;
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

    this._x += this._dx;
  }

  public moveByY(paddleY?: number) {
    if (paddleY) {
      this._y = paddleY;

      return;
    }

    this._y += this._dy;
  }

  public flipX() {
    this._dx *= -1;
  }

  public flipY() {
    this._dy *= -1;
  }

  public getEdgeCoord(direction: EdgeName) {
    switch (direction) {
      case 'top':
        return this._y - this._radius;
      case 'right':
        return this._x + this._radius;
      case 'bottom':
        return this._y + this._radius;
      case 'left':
        return this._x - this._radius;
      default:
        throw new Error('Нет такой стороны!');
    }
  }

  public getTangent(brickCenter: { x: number, y: number }) {
    const xEdgeMultiplier = this._dx > 0 ? 1 : -1;
    const yEdgeMultiplier = this._dy > 0 ? -1 : 1;

    return (
      (this._y + yEdgeMultiplier * this._radius - brickCenter.y)
      / (this._x + xEdgeMultiplier * this._radius - brickCenter.x)
    );
  }
}
