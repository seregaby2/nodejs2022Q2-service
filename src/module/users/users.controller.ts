import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { UserMessageError } from '../../../constants';
import { validate as uuidValidate } from 'uuid';
import { usersService } from './users.service';
import { ResponseUser } from './users.interface';
import { createUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';

@Controller('user')
export class usersController {
  constructor(private userService: usersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllUsers(): Promise<ResponseUser[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOne(@Param('id') id: string): Promise<ResponseUser> {
    const user = await this.userService.getUserById(id);
    if (!uuidValidate(id)) {
      throw new BadRequestException(UserMessageError.NotValid);
    } else if (!user) {
      throw new NotFoundException(UserMessageError.NotFound);
    } else {
      return user;
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(
    @Body(new ValidationPipe()) createUser: createUserDto,
  ): Promise<ResponseUser> {
    return this.userService.createUser(createUser);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateUser(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateUser: updateUserDto,
  ) {
    const user = await this.userService.getUserById(id);
    const correctPassword = await this.userService.comparePasswords(
      updateUser.oldPassword,
      id,
    );
    if (!uuidValidate(id)) {
      throw new BadRequestException(UserMessageError.NotValid);
    } else if (!user) {
      throw new NotFoundException(UserMessageError.NotFound);
    } else if (correctPassword) {
      throw new ForbiddenException(UserMessageError.Forbidden);
    } else return this.userService.updateUser(id, updateUser);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id') id: string): Promise<void> {
    const user = await this.userService.getUserById(id);
    if (!uuidValidate(id)) {
      throw new BadRequestException(UserMessageError.NotValid);
    } else if (!user) {
      throw new NotFoundException(UserMessageError.NotFound);
    } else return this.userService.deleteUser(id);
  }
}
