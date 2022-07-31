import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { albumsController } from './albums.controller';
import { albumsService } from './albums.service';

@Module({
  controllers: [albumsController],
  providers: [albumsService, PrismaService],
})
export class albumsModule {}
