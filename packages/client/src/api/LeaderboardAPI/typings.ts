export type TLider = {
  data: {
    id: number;
    name: string;
    score: number;
    avatar?: string;
  };
  ratingFieldName: string;
  teamName: string;
};

export type TLeaderboard = {
  ratingFieldName: string,
  cursor: number,
  limit: number
};
