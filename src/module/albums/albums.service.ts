import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Album } from './albums.interface';

@Injectable()
export class albumsService {
  private static albums: Album[] = [];
  constructor() {
    albumsService.albums = [];
  }

  async getAllAlbums(): Promise<Album[]> {
    return albumsService.albums;
  }

  async getAlbumById(id: string): Promise<Album> {
    return albumsService.albums.find((item) => item.id === id);
  }

  async createAlbum(album: Album): Promise<Album> {
    const newAlbum = {
      id: uuidv4(),
      name: album.name,
      year: album.year,
      artistId: album.artistId,
    };

    albumsService.albums.push(newAlbum);
    return newAlbum;
  }

  async updateAlbum(id: string, changeData: Album): Promise<Album> {
    let index = -1;
    albumsService.albums.forEach((item, i) => {
      if (item.id === id) {
        item.name = changeData.name;
        item.year = changeData.year;
        item.artistId = changeData.artistId;
        index = i;
      }
    });
    return albumsService.albums[index];
  }

  async deleteArtist(id: string): Promise<void> {
    albumsService.albums = albumsService.albums.filter(
      (item) => item.id !== id,
    );
  }

  async artistIdSetNull(id: string) {
    albumsService.albums.find((e) => {
      if (e.artistId === id) {
        e.artistId = null;
      }
    });
  }
}
