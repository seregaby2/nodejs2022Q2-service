import { Module } from '@nestjs/common';
import { favoritesService } from '../favorites/favorites.service';
import { tracksController } from './tracks.controller';
import { tracksService } from './tracks.service';

@Module({
  controllers: [tracksController],
  providers: [tracksService, favoritesService],
})
export class tracksModule {}
