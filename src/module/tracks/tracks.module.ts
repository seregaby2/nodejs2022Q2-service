import { Module } from '@nestjs/common';
import { tracksController } from './tracks.controller';
import { tracksService } from './tracks.service';

@Module({
  controllers: [tracksController],
  providers: [tracksService],
})
export class tracksModule {}
