import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { favoritesService } from '../favorites/favorites.service';
import { tracksController } from './tracks.controller';
import { tracksService } from './tracks.service';

@Module({
  controllers: [tracksController],
  providers: [tracksService, favoritesService, PrismaService],
})
export class tracksModule {}
