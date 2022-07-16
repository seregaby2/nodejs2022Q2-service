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
import { ArtistMessageError } from '../../../constants';
import { validate as uuidValidate } from 'uuid';
import { Artist } from './artista.interface';
import { artistsService } from './artists.service';
import { createArtistDto } from './dto/create-artust.dto';
import { updateArtistDto } from './dto/update-artist.dto';
import { tracksService } from '../tracks/tracks.service';
import { favoritesService } from '../favorites/favorites.service';
import { albumsService } from '../albums/albums.service';

@Controller('artist')
export class artistsController {
  constructor(
    private artistService: artistsService,
    private trackService: tracksService,
    private favoriteService: favoritesService,
    private albumFavorite: albumsService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAllArtist(): Promise<Artist[]> {
    return this.artistService.getAllArtists();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOne(@Param('id') id: string): Promise<Artist> {
    const artist = await this.artistService.getArtistById(id);
    if (!uuidValidate(id)) {
      throw new BadRequestException(ArtistMessageError.NotValid);
    } else if (!artist) {
      throw new NotFoundException(ArtistMessageError.NotFound);
    } else {
      return artist;
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createArtist(
    @Body(new ValidationPipe()) createArtist: createArtistDto,
  ): Promise<Artist> {
    return this.artistService.createArtist(createArtist);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateArtist(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateArtist: updateArtistDto,
  ): Promise<Artist> {
    const artist: Artist = await this.artistService.getArtistById(id);
    if (!uuidValidate(id)) {
      throw new BadRequestException(ArtistMessageError.NotValid);
    } else if (!artist) {
      throw new NotFoundException(ArtistMessageError.NotFound);
    } else {
      return this.artistService.updateArtist(id, updateArtist);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtist(@Param('id') id: string): Promise<void> {
    const artist: Artist = await this.artistService.getArtistById(id);
    if (!uuidValidate(id)) {
      throw new BadRequestException(ArtistMessageError.NotValid);
    } else if (!artist) {
      throw new NotFoundException(ArtistMessageError.NotFound);
    } else {
      this.artistService.deleteArtist(id);
      this.trackService.artistIdSetNull(id);
      this.favoriteService.deleteFavouriteArtit(id);
      this.albumFavorite.artistIdSetNull(id);
    }
  }
}
