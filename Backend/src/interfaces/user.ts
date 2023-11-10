export interface UserLogin {
  email: string;
  password: string;
}

export interface userRegister{
    name: string,
    email: string,
    password: string,
}

export interface emailTrigger{
  email: string,
}

export interface passwordUpdate{
  resetLink: string,
  newPass: string,
}