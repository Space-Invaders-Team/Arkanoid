export type UserProfile = {
  id?: number | null;
  firstName?: string;
  second_name?: string;
  login?: string;
  display_name?: string;
  email?: string;
  phone?: string;
  avatar?: string;
};

export type UserProfileForm = {
  email: string;
  login: string;
  firstName: string;
  second_name: string;
  display_name: string;
  phone: string;
  oldPassword: string;
  newPassword: string;
};
