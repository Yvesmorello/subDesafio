export interface UserPayload {
    sub: number;
    username: string;
    role: string;
    iat?: number;
    exp?: number;
  }