export type StateObject = {
  auth: {
    status: string;
    isLogged: boolean;
    error: string | null;
    userData: {
      id: number;
      first_name: string;
      second_name: string;
      display_name: string;
      login: string;
      avatar: string;
      email: string;
      phone: string;
    } | null;
    navLinks: {
      url: string,
      title: string,
      protect: string | boolean
    }[];
  },
};
