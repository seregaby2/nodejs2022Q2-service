import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Artist } from './artista.interface';

@Injectable()
export class artistsService {
  artists: Artist[] = [];
  constructor() {
    this.artists = [];
  }

  async getAllArtists(): Promise<Artist[]> {
    return this.artists;
  }

  async getArtistById(id: string): Promise<Artist> {
    return this.artists.find((user) => user.id === id);
  }

  async createArtist(artist: Artist): Promise<Artist> {
    const newArtis: Artist = {
      id: uuidv4(),
      name: artist.name,
      grammy: artist.grammy,
    };

    this.artists.push(newArtis);

    return newArtis;
  }

  async updateArtist(id: string, changeData: Artist): Promise<Artist> {
    let index = -1;
    this.artists.forEach((item, i) => {
      if (item.id === id) {
        item.name = changeData.name;
        item.grammy = changeData.grammy;
        index = i;
      }
    });
    return this.artists[index];
  }

  async deleteArtist(id: string): Promise<void> {
    this.artists = this.artists.filter((item) => item.id !== id);
  }
}
