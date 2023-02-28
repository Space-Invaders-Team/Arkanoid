import { GameStatus } from '../../../pages/GamePage/typings';

export type Props = {
  status: GameStatus,
  onClickPrimaryBtn(): void,
  onClickSecondaryBtn?(): void,
};
