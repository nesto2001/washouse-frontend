export type LoginModel = {
  token: string;
  expiresIn: number;
  refreshExpiresIn: number;
  refreshToken: string;
  tokenType: string;
  idToken: string;
  notBeforePolicy: number;
  sessionState: string;
  otherClaims: any;
  scope: string;
};
