import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { albumsService } from '../albums/albums.service';
import { artistsService } from '../artists/artists.service';
import { Track } from '../tracks/tracks.interface';
import { tracksService } from '../tracks/tracks.service';
import { Favorites } from './favorites.interface';
import { validate as uuidValidate } from 'uuid';
import { favoritesService } from './favorites.service';
import {
  AlbumMessageError,
  ArtistMessageError,
  TrackMessageError,
} from '../../../constants';
import { Album } from '../albums/albums.interface';
import { Artist } from '../artists/artista.interface';

@Controller('favs')
export class favoritesController {
  constructor(
    private favoriteService: favoritesService,
    private trackService: tracksService,
    private albumService: albumsService,
    private artistService: artistsService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllFavorites(): Promise<Favorites> {
    return this.favoriteService.getAllFavorites();
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  async createFavouriteTrack(@Param('id') id: string): Promise<Track> {
    const track = await this.trackService.getTrackById(id);
    if (!uuidValidate(id)) {
      throw new BadRequestException(TrackMessageError.NotValid);
    } else if (!track) {
      throw new UnprocessableEntityException(TrackMessageError.Unprocessable);
    } else {
      return this.favoriteService.createFavoriteTrack(track);
    }
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  async createFavouriteAlbum(@Param('id') id: string): Promise<Album> {
    const album = await this.albumService.getAlbumById(id);
    if (!uuidValidate(id)) {
      throw new BadRequestException(AlbumMessageError.NotValid);
    } else if (!album) {
      throw new UnprocessableEntityException(AlbumMessageError.Unprocessable);
    } else {
      return this.favoriteService.createFavoriteAlbum(album);
    }
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  async createFavouriteArtist(@Param('id') id: string): Promise<Artist> {
    const artist = await this.artistService.getArtistById(id);
    if (!uuidValidate(id)) {
      throw new BadRequestException(ArtistMessageError.NotValid);
    } else if (!artist) {
      throw new UnprocessableEntityException(ArtistMessageError.Unprocessable);
    } else {
      return this.favoriteService.createFavoriteArtist(artist);
    }
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteFavoriteTrack(@Param('id') id: string): Promise<void> {
    const track = await this.trackService.getTrackById(id);
    if (!uuidValidate(id)) {
      throw new BadRequestException(TrackMessageError.NotValid);
    } else if (!track) {
      throw new NotFoundException(TrackMessageError.NotFound);
    } else {
      return this.favoriteService.deleteFavouriteTrack(id);
    }
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteFavoriteAlbum(@Param('id') id: string): Promise<void> {
    const album = await this.albumService.getAlbumById(id);
    if (!uuidValidate(id)) {
      throw new BadRequestException(AlbumMessageError.NotValid);
    } else if (!album) {
      throw new NotFoundException(AlbumMessageError.NotFound);
    } else {
      return this.favoriteService.deleteFavouriteAlbum(id);
    }
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteFavoriteArtist(@Param('id') id: string): Promise<void> {
    const artist = await this.artistService.getArtistById(id);
    if (!uuidValidate(id)) {
      throw new BadRequestException(ArtistMessageError.NotValid);
    } else if (!artist) {
      throw new NotFoundException(ArtistMessageError.NotFound);
    } else {
      return this.favoriteService.deleteFavouriteArtit(id);
    }
  }
}
