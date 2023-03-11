export type UserData = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  avatar: string;
  email: string;
  phone: string;
};

export type StateObject = {
  auth: {
    status: string;
    isLogged: boolean;
    error: string | null;
    userData: UserData | null;
    navLinks: StringObject[];
  },
  game: TGameState
};

export type TGameState = {
  score: number;
  tryCount: number;
};
