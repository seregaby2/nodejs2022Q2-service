import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { usersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '../users/users.interface';
import { createUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: usersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: User) {
    return this.generateToken(userDto);
  }

  async registration(userDto: createUserDto) {
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  async generateToken(user: User) {
    const payload = { id: user.id, login: user.login };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
