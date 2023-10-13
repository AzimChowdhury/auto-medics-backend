import { ENUM_USER_ROLE } from '../../../enums/user';

export type ISignInUser = {
  email: string;
  password: string;
};

export type ISignUpUser = {
  email: string;
  password: string;
  role: ENUM_USER_ROLE;
};

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};

export type IAuthErrorResponse = {
  message: string;
};
