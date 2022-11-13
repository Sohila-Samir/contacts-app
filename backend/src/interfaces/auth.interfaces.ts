export interface UserAuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface CustomPassportAuthInfo
  extends Express.AuthInfo,
    UserAuthTokens {
  message?: string;
}
