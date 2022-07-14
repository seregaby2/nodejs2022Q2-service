import { Module } from '@nestjs/common';
import { albumsModule } from './module/albums/albums.module';
import { artistsModule } from './module/artists/artists.module';
import { usersModule } from './module/users/users.module';

@Module({
  imports: [artistsModule, usersModule, albumsModule],
})
export class AppModule {}
