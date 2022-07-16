import { Injectable } from '@nestjs/common';
import { Album } from '../albums/albums.interface';
import { Artist } from '../artists/artista.interface';
import { Track } from '../tracks/tracks.interface';
// import { v4 as uuidv4 } from 'uuid';
import { Favorites } from './favorites.interface';

@Injectable()
export class favoritesService {
  private static favorites: Favorites;
  constructor() {
    favoritesService.favorites = {
      artists: [],
      albums: [],
      tracks: [],
    };
  }

  async getAllFavorites(): Promise<Favorites> {
    return favoritesService.favorites;
  }

  async createFavoriteTrack(track: Track): Promise<Track> {
    favoritesService.favorites.tracks.push(track);
    return track;
  }

  async createFavoriteArtist(artist: Artist): Promise<Artist> {
    favoritesService.favorites.artists.push(artist);
    return artist;
  }

  async createFavoriteAlbum(album: Album): Promise<Album> {
    favoritesService.favorites.albums.push(album);
    return album;
  }

  async deleteFavouriteTrack(id: string): Promise<void> {
    favoritesService.favorites.tracks =
      favoritesService.favorites.tracks.filter((e) => e.id !== id);
  }

  async deleteFavouriteAlbum(id: string): Promise<void> {
    favoritesService.favorites.albums =
      favoritesService.favorites.albums.filter((e) => e.id !== id);
  }

  async deleteFavouriteArtit(id: string): Promise<void> {
    favoritesService.favorites.artists =
      favoritesService.favorites.artists.filter((e) => e.id !== id);
  }
}
