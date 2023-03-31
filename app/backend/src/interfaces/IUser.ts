export interface UserLogin {
  email: string;
  password: string;
}

export interface IPayload {
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface IUser extends UserLogin, IPayload{
}

export interface IDecoded extends IPayload {
  iat: number;
  exp: number;
}
