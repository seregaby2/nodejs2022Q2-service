export interface ResponseUser {
  id: string; // uuid v4
  login: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}

export interface User extends ResponseUser {
  password: string;
}

export interface UserCreate {
  login: string;
  password: string;
}
