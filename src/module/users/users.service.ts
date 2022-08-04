import { Injectable } from '@nestjs/common';
import { UserHelp } from '../../../constants';
import { v4 as uuidv4 } from 'uuid';
import { updateUserDto } from './dto/update-user.dto';
import { ResponseUser, User, UserCreate } from './users.interface';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class usersService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers(): Promise<ResponseUser[]> {
    const users = await this.prisma.user.findMany();
    return users.map((e: User) => {
      return {
        id: e.id,
        login: e.login,
        version: e.version,
        createdAt: new Date(e.createdAt),
        updatedAt: new Date(e.updatedAt),
      };
    });
  }

  async getUserById(id: string): Promise<ResponseUser> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (user) {
      const { password, ...response } = user;
      return response;
    } else return null;
  }

  async getUserByLogin(login: string): Promise<User> {
    const user = await this.prisma.user.findMany({ where: { login } });
    if (user[0]) {
      return user[0];
    } else {
      return null;
    }
  }

  async createUser(dataUser: UserCreate): Promise<any> {
    const newUser: User = {
      id: uuidv4(),
      login: dataUser.login,
      password: dataUser.password,
      createdAt: new Date(),
      updatedAt: new Date(),
      version: UserHelp.version,
    };
    await this.prisma.user.create({ data: newUser });
    return {
      id: newUser.id,
      login: dataUser.login,
      createdAt: +newUser.createdAt,
      updatedAt: +newUser.updatedAt,
      version: UserHelp.version,
    };
  }

  async updateUser(id: string, updateData: updateUserDto): Promise<any> {
    await this.prisma.user.update({
      where: { id },
      data: {
        password: updateData.newPassword,
        version: 2,
      },
    });
    const user = await this.prisma.user.findUnique({ where: { id } });
    return {
      id: id,
      login: user.login,
      version: user.version,
      createdAt: +user.createdAt,
      updatedAt: +user.updatedAt,
    };
  }

  async deleteUser(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }

  async comparePasswords(oldPassowrd: string, id: string) {
    const users = await this.prisma.user.findMany();
    return new Promise((resolve) => {
      setTimeout(() => {
        let result = false;
        let index = -1;
        users.map((e, i) => {
          if (e.id === id) {
            index = i;
            if (users[index].password !== oldPassowrd) {
              result = true;
            }
          }
        });
        resolve(result);
      }, 10);
    });
  }
}
