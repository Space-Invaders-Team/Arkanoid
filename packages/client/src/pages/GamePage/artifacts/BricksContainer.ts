import { Brick } from './Brick';
import { Ball } from './Ball';
import { LEVELS } from '../utils/levels';
import brickSound from '../../../assets/sounds/toBlock.mp3';
import { createAudioContext } from '../utils/audio';

export class BricksContainer {
  private readonly _rowsAmount: number = 0;

  private readonly _columnsAmount: number = 0;

  private readonly _brickWidth: number = 0;

  private readonly _brickHeight: number = 0;

  private readonly _bricksGap = 5;

  private readonly _bricksMatrix: Brick[][] = [];

  constructor(
    private readonly ctx: CanvasRenderingContext2D,
    private readonly canvasWidth: number,
    private readonly levelNumber: number,
    private readonly ball: Ball,
    private readonly increaseScore: () => void,
    private readonly increaseLevel: () => void,
  ) {
    const level = LEVELS.get(levelNumber);
    const { audio, audioContext } = createAudioContext(brickSound);

    if (Array.isArray(level) && Array.isArray(level[0])) {
      this._rowsAmount = level.length;
      this._columnsAmount = level[0].length;

      this._brickWidth = Math.trunc(canvasWidth / (this._columnsAmount)) - this._bricksGap;
      this._brickHeight = (this._brickWidth * 3) / 8;

      for (let i = 0; i < this._columnsAmount; i++) {
        this._bricksMatrix[i] = [];

        for (let j = 0; j < this._rowsAmount; j++) {
          const isActiveBrick = Array.isArray(level[j]) ? level[j][i] : true;

          this._bricksMatrix[i][j] = new Brick(
            this.ctx,
            ball,
            this._brickWidth,
            this._brickHeight,
            isActiveBrick,
            0,
            0,
            audio,
            audioContext,
          );
        }
      }
    }
  }

  public draw() {
    const {
      canvasWidth,
      _columnsAmount: columnsAmount,
      _bricksGap: bricksGap,
    } = this;
    const bricksTotalWidth = columnsAmount * (this._brickWidth + bricksGap) - bricksGap;
    const leftOffset = (canvasWidth - bricksTotalWidth) / 2;
    const topOffset = 55;
    let activeBricksCounter = 0;

    for (let i = 0; i < this._bricksMatrix.length; i++) {
      for (let j = 0; j < this._bricksMatrix[i].length; j++) {
        const brick = this._bricksMatrix[i][j];

        brick.x = i * (this._brickWidth + this._bricksGap) + leftOffset;
        brick.y = j * (this._brickHeight + this._bricksGap) + topOffset;

        if (brick.isActive) {
          brick.draw();
          const hasCollision = brick.isDetectedCollision();

          if (hasCollision) {
            this.increaseScore();
          } else {
            activeBricksCounter++;
          }
        }
      }
    }

    if (activeBricksCounter === 0) {
      this.increaseLevel();
    }
  }
}
