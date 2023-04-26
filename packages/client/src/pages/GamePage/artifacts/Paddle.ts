import paddle1 from '../../../assets/img/paddle1.svg';
import paddle2 from '../../../assets/img/paddle2.svg';
import paddle3 from '../../../assets/img/paddle3.svg';
import { getRandomNumInRange } from '../../../utils/helpers';

export class Paddle {
  private readonly _width: number;

  private readonly _height: number;

  private readonly _bottomOffset = 10;

  private readonly _dx = 15;

  private _rightPressed = false;

  private _leftPressed = false;

  private _x: number;

  private readonly _y: number;

  private readonly _image1 = new Image();

  private readonly _image2 = new Image();

  private readonly _image3 = new Image();

  constructor(
    private readonly ctx: CanvasRenderingContext2D,
    private readonly canvasWidth: number,
    private readonly canvasHeight: number,
  ) {
    this._image1.src = paddle1;
    this._image2.src = paddle2;
    this._image3.src = paddle3;
    this._width = Math.min(200, canvasWidth * 0.1);
    this._height = Math.min(15, canvasHeight * 0.02);
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
    const randomIndex = getRandomNumInRange(0, 2);
    const image = [this._image1, this._image2, this._image3][randomIndex];
    this.ctx.drawImage(image, this._x, this._y, this._width, this._height);
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
