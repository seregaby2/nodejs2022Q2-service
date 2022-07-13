import { Module } from '@nestjs/common';
import { artistsController } from './artists.controller';
import { artistsService } from './artists.service';

@Module({
  controllers: [artistsController],
  providers: [artistsService],
})
export class artistsModule {}
