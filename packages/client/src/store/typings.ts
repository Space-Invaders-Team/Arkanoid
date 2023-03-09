export type UserData = {
  userData: {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    avatar: string;
    email: string;
    phone: string;
  }
};

export type StateObject = {
  auth: {
    status: string;
    isLogged: boolean;
    error: string | null;
    userData: UserData | null;
    navLinks: StringObject[];
  },
};
