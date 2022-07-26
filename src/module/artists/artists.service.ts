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
    return this.prisma.artist.findMany();
  }

  async getArtistById(id: string): Promise<Artist> {
    // return artistsService.artists.find((user) => user.id === id);
    return this.prisma.artist.findUnique({ where: { id } });
  }

  async createArtist(artist: Artist): Promise<Artist> {
    const newArtis: Artist = {
      id: uuidv4(),
      name: artist.name,
      grammy: artist.grammy,
    };
    return this.prisma.artist.create({ data: newArtis });

    // artistsService.artists.push(newArtis);

    // return newArtis;
  }

  async updateArtist(id: string, changeData: Artist): Promise<Artist> {
    // let index = -1;
    // artistsService.artists.forEach((item, i) => {
    //   if (item.id === id) {
    //     item.name = changeData.name;
    //     item.grammy = changeData.grammy;
    //     index = i;
    //   }
    // });
    // return artistsService.artists[index];
    return this.prisma.artist.update({
      where: { id },
      data: changeData,
    });
  }

  async deleteArtist(id: string) {
    // artistsService.artists = artistsService.artists.filter(
    //   (item) => item.id !== id,
    // );
    return this.prisma.artist.delete({ where: { id } });
  }
}
