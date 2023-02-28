export type UserProfile = {
  id?: number | null;
  title?: string;
  firstName?: string;
  secondName?: string;
  login?: string;
  displayName?: string;
  email?: string;
  phone?: string;
  avatar?: string;
};

export type UserProfileForm = {
  title?: string;
  email: string;
  login: string;
  label?: string;
  firstName: string;
  secondName: string;
  displayName: string;
  phone: string;
  oldPassword: string;
  newPassword: string;
};
