import { Injectable } from '@nestjs/common';
import { UserHelp } from '../../../constants';
import { v4 as uuidv4 } from 'uuid';
import { updateUserDto } from './dto/update-user.dto';
import { ResponseUser, User, UserCreate } from './users.interface';

@Injectable()
export class usersService {
  users: User[] = [];
  constructor() {
    this.users = [];
  }

  async getAllUsers(): Promise<ResponseUser[]> {
    return this.users.map((e) => {
      return {
        id: e.id,
        login: e.login,
        version: e.version,
        createdAt: e.createdAt,
        updatedAt: e.updatedAt,
      };
    });
  }

  async getUserById(id: string): Promise<ResponseUser> {
    return this.users.find((e) => {
      if (e.id === id) {
        return {
          id: e.id,
          login: e.login,
          version: e.version,
          createdAt: e.createdAt,
          updatedAt: e.updatedAt,
        };
      }
    });
  }

  async createUser(dataUser: UserCreate): Promise<ResponseUser> {
    const newUser = {
      id: uuidv4(),
      login: dataUser.login,
      password: dataUser.password,
      createdAt: +new Date(),
      updatedAt: +new Date(),
      version: UserHelp.version,
    };
    this.users.push(newUser);
    const { password, ...response } = newUser;
    return response;
  }

  async updateUser(
    id: string,
    updateData: updateUserDto,
  ): Promise<ResponseUser> {
    let index = -1;
    console.log('pass', updateData.oldPassword, updateData.newPassword);
    this.users.map((e, i) => {
      if (e.id === id) {
        e.password = updateData.newPassword;
        e.updatedAt = +new Date();
        e.version = UserHelp.version += 1;
        index = i;
      }
    });
    const { password, ...response } = this.users[index];
    return response;
  }

  async deleteUser(id: string): Promise<void> {
    this.users = this.users.filter((e) => e.id !== id);
  }

  comparePasswords(oldPassowrd: string, id: string) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let result = false;
        let index = -1;
        this.users.map((e, i) => {
          if (e.id === id) {
            index = i;
            if (this.users[index].password !== oldPassowrd) {
              result = true;
            }
          }
        });
        resolve(result);
      }, 10);
    });
  }
}
