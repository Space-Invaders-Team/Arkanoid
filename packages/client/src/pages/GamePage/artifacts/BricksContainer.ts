import { Brick } from './Brick';
import { Ball } from './Ball';

export class BricksContainer {
  private readonly _rowsAmount = 4;

  private readonly _columnsAmount: number;

  private readonly _bricksGap = 5;

  private readonly _bricksMatrix: Brick[][] = [];

  constructor(
    private readonly ctx: CanvasRenderingContext2D,
    private readonly canvasWidth: number,
    private readonly ball: Ball,
    private readonly increaseScore: () => void,
  ) {
    this._columnsAmount = Math.trunc(canvasWidth / (Brick.width + this._bricksGap));

    for (let i = 0; i < this._columnsAmount; i++) {
      this._bricksMatrix[i] = [];

      for (let j = 0; j < this._rowsAmount; j++) {
        this._bricksMatrix[i][j] = new Brick(this.ctx, ball, 0, 0);
      }
    }
  }

  public resetBricks() {
    this._bricksMatrix.forEach((column) => {
      column.forEach((row) => {
        row.isActive = true;
      });
    });
  }

  public draw() {
    const {
      canvasWidth,
      _columnsAmount: columnsAmount,
      _bricksGap: bricksGap,
    } = this;
    const bricksTotalWidth = columnsAmount * (Brick.width + bricksGap) - bricksGap;
    const leftOffset = (canvasWidth - bricksTotalWidth) / 2;
    const topOffset = 55;

    for (let i = 0; i < this._bricksMatrix.length; i++) {
      for (let j = 0; j < this._bricksMatrix[i].length; j++) {
        const brick = this._bricksMatrix[i][j];

        brick.x = i * (Brick.width + this._bricksGap) + leftOffset;
        brick.y = j * (Brick.height + this._bricksGap) + topOffset;

        if (brick.isActive) {
          brick.draw();
          const hasCollision = brick.isDetectedCollision();
          if (hasCollision) {
            this.increaseScore();
          }
        }
      }
    }
  }
}
