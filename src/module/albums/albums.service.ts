import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Album } from './albums.interface';

@Injectable()
export class albumsService {
  albums: Album[] = [];
  constructor() {
    this.albums = [];
  }

  async getAllAlbums(): Promise<Album[]> {
    return this.albums;
  }

  async getAlbumById(id: string): Promise<Album> {
    return this.albums.find((item) => item.id === id);
  }

  async createAlbum(album: Album): Promise<Album> {
    const newAlbum = {
      id: uuidv4(),
      name: album.name,
      year: album.year,
      artistId: album.artistId,
    };

    this.albums.push(newAlbum);
    return newAlbum;
  }

  async updateAlbum(id: string, changeData: Album): Promise<Album> {
    let index = -1;
    this.albums.forEach((item, i) => {
      if (item.id === id) {
        item.name = changeData.name;
        item.year = changeData.year;
        item.artistId = changeData.artistId;
        index = i;
      }
    });
    return this.albums[index];
  }

  async deleteArtist(id: string): Promise<void> {
    this.albums = this.albums.filter((item) => item.id !== id);
  }
}
