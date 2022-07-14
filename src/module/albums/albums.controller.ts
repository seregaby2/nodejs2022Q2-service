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
} from '@nestjs/common';
import { validate as uuidValidate } from 'uuid';
import { Album } from './albums.interface';
import { albumsService } from './albums.service';
import { createAlbumDto } from './dto/create-album.dto';
import { updateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class albumsController {
  constructor(private albumService: albumsService) {}

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
      throw new BadRequestException('Album id is not valid');
    } else if (!album) {
      throw new NotFoundException('Album is not found');
    } else {
      return album;
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createAlbum(@Body() createAlbum: createAlbumDto): Promise<Album> {
    if (
      !createAlbum.name ||
      !createAlbum.year ||
      typeof createAlbum.name !== 'string' ||
      typeof createAlbum.year !== 'number'
    ) {
      throw new BadRequestException('fill in the fields correctly');
    } else {
      return this.albumService.createAlbum(createAlbum);
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateAlbum(
    @Body() updateAlbum: updateAlbumDto,
    @Param('id') id: string,
  ): Promise<Album> {
    const album: Album = await this.albumService.getAlbumById(id);
    if (!uuidValidate(id)) {
      throw new BadRequestException('Album id is not valid');
    } else if (!album) {
      throw new NotFoundException('Album is not found');
    } else if (
      !updateAlbum.artistId ||
      !updateAlbum.name ||
      !updateAlbum.year ||
      typeof updateAlbum.name !== 'string' ||
      typeof updateAlbum.year !== 'number' ||
      typeof updateAlbum.artistId !== ('string' || null)
    ) {
      throw new BadRequestException('fill in the fields correctly');
    } else {
      return this.albumService.updateAlbum(id, updateAlbum);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtist(@Param('id') id: string) {
    const album: Album = await this.albumService.getAlbumById(id);
    if (!uuidValidate(id)) {
      throw new BadRequestException('Album id is not valid');
    } else if (!album) {
      throw new NotFoundException('Album is not found');
    } else {
      return this.albumService.deleteArtist(id);
    }
  }
}
