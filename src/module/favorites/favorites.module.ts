import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { albumsService } from '../albums/albums.service';
import { artistsService } from '../artists/artists.service';
import { tracksService } from '../tracks/tracks.service';
import { favoritesController } from './favorites.controller';
import { favoritesService } from './favorites.service';

@Module({
  controllers: [favoritesController],
  providers: [
    favoritesService,
    artistsService,
    albumsService,
    tracksService,
    PrismaService,
  ],
})
export class favoritesModule {}
