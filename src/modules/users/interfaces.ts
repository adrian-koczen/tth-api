export interface DeleteUser {
  username: string;
}

export interface CreateUser {
  username: string;
  password: string;
  passwordAgain: string;
  email: string;
}

export interface CreateProfile {
  firstname: string;
  lastname: string;
  phoneNumber: string;
}
