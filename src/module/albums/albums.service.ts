import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { Album } from './albums.interface';

@Injectable()
export class albumsService {
  constructor(private prisma: PrismaService) {}

  async getAllAlbums(): Promise<Album[]> {
    return this.prisma.album.findMany();
  }

  async getAlbumById(id: string): Promise<Album> {
    return this.prisma.album.findUnique({ where: { id } });
  }

  async createAlbum(album: Album): Promise<Album> {
    const newAlbum = {
      id: uuidv4(),
      name: album.name,
      year: album.year,
      artistId: album.artistId ? album.artistId : null,
    };

    return this.prisma.album.create({
      data: newAlbum,
    });
  }

  async updateAlbum(id: string, changeData: Album): Promise<Album> {
    return this.prisma.album.update({
      where: { id },
      data: changeData,
    });
  }

  async deleteAlbum(id: string) {
    return this.prisma.album.delete({ where: { id } });
  }

  // async artistIdSetNull(id: string) {
  //   const item = await this.prisma.album.findUnique({ where: { id } });
  //   item.artistId = null;
  // }
}
