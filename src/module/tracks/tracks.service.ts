import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Track } from './tracks.interface';

@Injectable()
export class tracksService {
  private static tracks: Track[] = [];
  constructor() {
    tracksService.tracks = [];
  }

  async getAllTracks(): Promise<Track[]> {
    return tracksService.tracks;
  }

  async getTrackById(id: string): Promise<Track> {
    return tracksService.tracks.find((item) => item.id === id);
  }

  async createTrack(dataTrack: Track): Promise<Track> {
    const newTrack = {
      id: uuidv4(),
      name: dataTrack.name,
      duration: dataTrack.duration,
      albumId: dataTrack.albumId,
      artistId: dataTrack.artistId,
    };
    tracksService.tracks.push(newTrack);
    return newTrack;
  }

  async updateTrack(id: string, dataUpdate: Track): Promise<Track> {
    let index = -1;
    tracksService.tracks.forEach((e, i) => {
      if (e.id === id) {
        e.name = dataUpdate.name;
        e.duration = dataUpdate.duration;
        e.albumId = dataUpdate.albumId;
        e.artistId = dataUpdate.artistId;
        index = i;
      }
    });
    return tracksService.tracks[index];
  }

  async deleteTrack(id: string) {
    tracksService.tracks = tracksService.tracks.filter((e) => e.id !== id);
  }

  async artistIdSetNull(id: string) {
    tracksService.tracks.map((e) => {
      if (e.artistId === id) {
        e.artistId = null;
      }
    });
  }

  async albumIdSetNull(id: string) {
    tracksService.tracks.map((e) => {
      if (e.albumId === id) {
        e.albumId = null;
      }
    });
  }
}
