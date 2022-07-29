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
import { AlbumMessageError } from '../../../constants';
import { validate as uuidValidate } from 'uuid';
import { Album } from './albums.interface';
import { albumsService } from './albums.service';
import { createAlbumDto } from './dto/create-album.dto';
import { updateAlbumDto } from './dto/update-album.dto';
import { tracksService } from '../tracks/tracks.service';
import { favoritesService } from '../favorites/favorites.service';

@Controller('album')
export class albumsController {
  constructor(
    private albumService: albumsService,
    private trackService: tracksService,
    private favoriteService: favoritesService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAllAlbum(): Promise<Album[]> {
    return this.albumService.getAllAlbums();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOne(@Param('id') id: string): Promise<Album> {
    const album = await this.albumService.getAlbumById(id);
    if (!uuidValidate(id)) {
      throw new BadRequestException(AlbumMessageError.NotValid);
    } else if (!album) {
      throw new NotFoundException(AlbumMessageError.NotFound);
    } else {
      return album;
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createAlbum(
    @Body(new ValidationPipe()) createAlbum: createAlbumDto,
  ): Promise<Album> {
    return this.albumService.createAlbum(createAlbum);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateAlbum(
    @Body(new ValidationPipe()) updateAlbum: updateAlbumDto,
    @Param('id') id: string,
  ): Promise<Album> {
    const album: Album = await this.albumService.getAlbumById(id);
    if (!uuidValidate(id)) {
      throw new BadRequestException(AlbumMessageError.NotValid);
    } else if (!album) {
      throw new NotFoundException(AlbumMessageError.NotFound);
    } else {
      return this.albumService.updateAlbum(id, updateAlbum);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtist(@Param('id') id: string): Promise<void> {
    const album: Album = await this.albumService.getAlbumById(id);
    if (!uuidValidate(id)) {
      throw new BadRequestException(AlbumMessageError.NotValid);
    } else if (!album) {
      throw new NotFoundException(AlbumMessageError.NotFound);
    } else {
      this.albumService.deleteAlbum(id);
      // this.trackService.albumIdSetNull(id);
      // this.favoriteService.deleteFavouriteAlbum(id);
    }
  }
}
