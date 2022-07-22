import { Module } from '@nestjs/common';
// import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { albumsService } from '../albums/albums.service';
import { favoritesService } from '../favorites/favorites.service';
import { tracksService } from '../tracks/tracks.service';
import { artistsController } from './artists.controller';
import { artistsService } from './artists.service';

@Module({
  controllers: [artistsController],
  providers: [
    artistsService,
    tracksService,
    favoritesService,
    albumsService,
    PrismaService,
  ],
})
export class artistsModule {}
