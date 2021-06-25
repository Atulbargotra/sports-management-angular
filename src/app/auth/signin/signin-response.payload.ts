export interface SigninResponse {
  authenticationToken: string;
  refreshToken: string;
  expiresAt: Date;
  username: string;
}
