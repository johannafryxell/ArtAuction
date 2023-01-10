export interface IUser {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface ISignupUser {
  // id: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

export interface ISigninUser {
  email: string;
  password: string;
}
