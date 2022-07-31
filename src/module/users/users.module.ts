import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { usersController } from './users.controller';
import { usersService } from './users.service';

@Module({
  controllers: [usersController],
  providers: [usersService, PrismaService],
})
export class usersModule {}
