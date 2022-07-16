import { Module } from '@nestjs/common';
import { favoritesService } from '../favorites/favorites.service';
import { tracksService } from '../tracks/tracks.service';
import { albumsController } from './albums.controller';
import { albumsService } from './albums.service';

@Module({
  controllers: [albumsController],
  providers: [albumsService, tracksService, favoritesService],
})
export class albumsModule {}
