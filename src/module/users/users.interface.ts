export interface ResponseUser {
  id: string; // uuid v4
  login: string;
  version: number; // integer number, increments on update
  createdAt: Date; // timestamp of creation
  updatedAt: Date; // timestamp of last update
}

export interface User extends ResponseUser {
  password: string;
}

export interface UserCreate {
  login: string;
  password: string;
}
