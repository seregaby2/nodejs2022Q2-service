import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { Track } from './tracks.interface';

@Injectable()
export class tracksService {
  constructor(private prisma: PrismaService) {}

  async getAllTracks(): Promise<Track[]> {
    return this.prisma.track.findMany();
  }

  async getTrackById(id: string): Promise<Track> {
    return this.prisma.track.findUnique({ where: { id } });
  }

  async createTrack(dataTrack: Track): Promise<Track> {
    const newTrack = {
      id: uuidv4(),
      name: dataTrack.name,
      duration: dataTrack.duration,
      albumId: dataTrack.albumId,
      artistId: dataTrack.artistId,
    };
    return this.prisma.track.create({ data: newTrack });
  }

  async updateTrack(id: string, dataUpdate: Track): Promise<Track> {
    return this.prisma.track.update({ where: { id }, data: dataUpdate });
  }

  async deleteTrack(id: string) {
    this.prisma.track.delete({ where: { id } });
  }
}
