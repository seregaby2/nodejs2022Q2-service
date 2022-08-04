import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthMessageError } from '../../../constants';
import { createUserDto } from '../users/dto/create-user.dto';
import { usersService } from '../users/users.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: usersService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body(new ValidationPipe()) userDto: createUserDto) {
    const user = await this.userService.getUserByLogin(userDto.login);
    if (user) {
      return this.authService.login(user);
    } else {
      throw new BadRequestException(AuthMessageError.NotValid);
    }
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  registration(@Body(new ValidationPipe()) userDto: createUserDto) {
    return this.authService.registration(userDto);
  }
}
