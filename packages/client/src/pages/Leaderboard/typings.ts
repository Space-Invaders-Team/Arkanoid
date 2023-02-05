export type TLeaderBoard = {
  num: number;
  name: string;
  avatar: string;
  points: number;
};

export type TLeaderBoardProps = {
  data: TLeaderBoard;
  key: number;
  iam: boolean;
};
