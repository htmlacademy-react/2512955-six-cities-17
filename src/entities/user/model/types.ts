export interface User {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  email: string;
}

export interface AuthorizedUser extends User {
  token: string;
}

export type AuthorizationData = {
  email: string;
  password: string;
};
