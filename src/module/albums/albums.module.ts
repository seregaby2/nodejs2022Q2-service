import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { favoritesService } from '../favorites/favorites.service';
import { tracksService } from '../tracks/tracks.service';
import { albumsController } from './albums.controller';
import { albumsService } from './albums.service';

@Module({
  controllers: [albumsController],
  providers: [albumsService, tracksService, favoritesService, PrismaService],
})
export class albumsModule {}
