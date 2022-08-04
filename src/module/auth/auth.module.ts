import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { usersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, usersService, PrismaService],
  imports: [
    authModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY || 'SECRET',
      signOptions: {
        expiresIn: process.env.TOKEN_EXPIRE_TIME || '1h',
      },
    }),
  ],
})
export class authModule {}
