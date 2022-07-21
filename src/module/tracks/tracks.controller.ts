import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { TrackMessageError } from '../../../constants';
import { validate as uuidValidate } from 'uuid';
import { createTrackDto } from './dto/create-track.dto';
import { updateTrackDto } from './dto/update-track.dto';
import { Track } from './tracks.interface';
import { tracksService } from './tracks.service';
import { favoritesService } from '../favorites/favorites.service';

@Controller('track')
export class tracksController {
  constructor(
    private trackService: tracksService,
    private favoriteService: favoritesService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllTracks(): Promise<Track[]> {
    return this.trackService.getAllTracks();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOne(@Param('id') id: string): Promise<Track> {
    const track = await this.trackService.getTrackById(id);
    if (!uuidValidate(id)) {
      throw new BadRequestException(TrackMessageError.NotValid);
    } else if (!track) {
      throw new NotFoundException(TrackMessageError.NotFound);
    } else {
      return track;
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTrack(@Body(new ValidationPipe()) createTrack: createTrackDto) {
    return this.trackService.createTrack(createTrack);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateTrack(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateTrack: updateTrackDto,
  ): Promise<Track> {
    const track: Track = await this.trackService.getTrackById(id);
    if (!uuidValidate(id)) {
      throw new BadRequestException(TrackMessageError.NotValid);
    }
    if (!track) {
      throw new NotFoundException(TrackMessageError.NotFound);
    } else return this.trackService.updateTrack(id, updateTrack);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrack(@Param('id') id: string): Promise<void> {
    const track: Track = await this.trackService.getTrackById(id);
    if (!uuidValidate(id)) {
      throw new BadRequestException(TrackMessageError.NotValid);
    }
    if (!track) {
      throw new NotFoundException(TrackMessageError.NotFound);
    } else {
      this.trackService.deleteTrack(id);
      this.favoriteService.deleteFavouriteTrack(id);
    }
  }
}
