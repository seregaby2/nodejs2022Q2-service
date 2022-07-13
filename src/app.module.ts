import { Module } from '@nestjs/common';
import { artistsModule } from './module/artists/artists.module';

@Module({
  imports: [artistsModule],
})
export class AppModule {}
