import { Brick } from './Brick';
import { Ball } from './Ball';

export class BricksContainer {
  private readonly _rowsAmount = 4;

  private readonly _columnsAmount: number;

  private readonly _bricksGap = 10;

  private readonly _bricksMatrix: Brick[][] = [];

  constructor(
    private readonly ctx: CanvasRenderingContext2D,
    private readonly canvasWidth: number,
    private readonly ball: Ball,
  ) {
    this._columnsAmount = Math.trunc(canvasWidth / (Brick.width + this._bricksGap));

    for (let i = 0; i < this._columnsAmount; i++) {
      this._bricksMatrix[i] = [];

      for (let j = 0; j < this._rowsAmount; j++) {
        this._bricksMatrix[i][j] = new Brick(this.ctx, ball, 0, 0);
      }
    }
  }

  draw() {
    for (let i = 0; i < this._bricksMatrix.length; i++) {
      for (let j = 0; j < this._bricksMatrix[i].length; j++) {
        const brick = this._bricksMatrix[i][j];
        const {
          canvasWidth,
          _columnsAmount: columnsAmount,
          _bricksGap: bricksGap,
        } = this;
        const bricksTotalWidth = columnsAmount * (Brick.width + bricksGap) - bricksGap;
        const leftOffset = (canvasWidth - bricksTotalWidth) / 2;

        brick.x = i * (Brick.width + this._bricksGap) + leftOffset;
        brick.y = j * (Brick.height + this._bricksGap);

        if (brick.isActive) {
          brick.draw();
          brick.detectCollision();
        }
      }
    }
  }
}
