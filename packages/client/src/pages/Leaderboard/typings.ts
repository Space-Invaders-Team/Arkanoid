export type TLeaderBoard = {
  id: number;
  name: string;
  avatar: string;
  points: number;
  place: number;
};

export type TLeaderBoardProps = {
  data: TLeaderBoard;
  key: number;
  iam: boolean;
};

export type SortEventProps = {
  sorting: (sortField: keyof TLeaderBoard, order: ('asc' | 'desc')) => void;
};

export type Sorting = {
  sort: string;
  order: string;
};
