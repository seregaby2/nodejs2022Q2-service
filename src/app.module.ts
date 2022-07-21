import { Module } from '@nestjs/common';
import { albumsModule } from './module/albums/albums.module';
import { artistsModule } from './module/artists/artists.module';
import { favoritesModule } from './module/favorites/favorites.module';
import { tracksModule } from './module/tracks/tracks.module';
import { usersModule } from './module/users/users.module';

@Module({
  imports: [
    artistsModule,
    usersModule,
    albumsModule,
    tracksModule,
    favoritesModule,
  ],
})
export class AppModule {}
