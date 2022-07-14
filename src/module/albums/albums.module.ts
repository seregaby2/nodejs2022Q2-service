import { Module } from '@nestjs/common';
import { albumsController } from './albums.controller';
import { albumsService } from './albums.service';

@Module({
  controllers: [albumsController],
  providers: [albumsService],
})
export class albumsModule {}
