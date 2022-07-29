import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { Artist } from './artista.interface';

@Injectable()
export class artistsService {
  constructor(private prisma: PrismaService) {}

  async getAllArtists(): Promise<Artist[]> {
    return this.prisma.artist.findMany();
  }

  async getArtistById(id: string): Promise<Artist> {
    return this.prisma.artist.findUnique({ where: { id } });
  }

  async createArtist(artist: Artist): Promise<Artist> {
    const newArtis: Artist = {
      id: uuidv4(),
      name: artist.name,
      grammy: artist.grammy,
    };
    return this.prisma.artist.create({ data: newArtis });
  }

  async updateArtist(id: string, changeData: Artist): Promise<Artist> {
    return this.prisma.artist.update({
      where: { id },
      data: changeData,
    });
  }

  async deleteArtist(id: string): Promise<void> {
    this.prisma.artist.delete({ where: { id } });
  }
}
