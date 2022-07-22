import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { Artist } from './artista.interface';

@Injectable()
export class artistsService {
  private static artists: Artist[] = [];

  constructor(private prisma: PrismaService) {
    artistsService.artists = [];
  }

  async getAllArtists(): Promise<Artist[]> {
    return artistsService.artists;
  }

  async getArtistById(id: string): Promise<Artist> {
    return artistsService.artists.find((user) => user.id === id);
  }

  async createArtist(artist: Artist): Promise<Artist> {
    const newArtis: Artist = {
      id: uuidv4(),
      name: artist.name,
      grammy: artist.grammy,
    };

    artistsService.artists.push(newArtis);

    return newArtis;
  }

  async updateArtist(id: string, changeData: Artist): Promise<Artist> {
    let index = -1;
    artistsService.artists.forEach((item, i) => {
      if (item.id === id) {
        item.name = changeData.name;
        item.grammy = changeData.grammy;
        index = i;
      }
    });
    return artistsService.artists[index];
  }

  async deleteArtist(id: string): Promise<void> {
    artistsService.artists = artistsService.artists.filter(
      (item) => item.id !== id,
    );
  }
}
