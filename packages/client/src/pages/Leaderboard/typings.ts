export enum Order {
  ASC = 'asc',
  DESC = 'desc',
}

export type TLeaderBoard = {
  id: number;
  name: string;
  avatar?: string;
  score: number;
  place: number;
};

export type TLeaderBoardProps = {
  data: TLeaderBoard;
  iam: boolean;
};

export type SortEventProps = {
  sorting: (sortField: keyof Omit<TLeaderBoard, 'avatar'>, order: Order) => void;
};

export type Sorting = {
  sort: keyof TLeaderBoard;
  order: Order;
};
