export class Paddle {
  private readonly _width = 200;

  private readonly _height = 15;

  private readonly _color = '#0095DD';

  private readonly _bottomOffset = 10;

  private readonly _dx = 15;

  private _rightPressed = false;

  private _leftPressed = false;

  private _x: number;

  private readonly _y: number;

  constructor(
    private readonly ctx: CanvasRenderingContext2D,
    private readonly canvasWidth: number,
    private readonly canvasHeight: number,
  ) {
    this._x = (canvasWidth - this._width) / 2;
    this._y = canvasHeight - this._height - this._bottomOffset;
  }

  public keyHandler = (event: KeyboardEvent) => {
    if (['Right', 'ArrowRight'].includes(event.key)) {
      this._rightPressed = event.type === 'keydown';
    }

    if (['Left', 'ArrowLeft'].includes(event.key)) {
      this._leftPressed = event.type === 'keydown';
    }
  };

  public get heightWithOffset() {
    return this._height + this._bottomOffset;
  }

  public get width() {
    return this._width;
  }

  public get x(): number {
    return this._x;
  }

  public draw() {
    this.ctx.beginPath();
    this.ctx.rect(this._x, this._y, this._width, this._height);
    this.ctx.fillStyle = this._color;
    this.ctx.fill();
    this.ctx.closePath();
  }

  public moveByMouse(mouseX: number) {
    this._x = Math.min(mouseX, this.canvasWidth - this._width);
  }

  public moveByKeyboard() {
    if (this._rightPressed) {
      this._x = Math.min(this._x + this._dx, this.canvasWidth - this._width);
    }

    if (this._leftPressed) {
      this._x = Math.max(this._x - this._dx, 0);
    }
  }
}
