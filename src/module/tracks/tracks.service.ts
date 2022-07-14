import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Track } from './tracks.interface';

@Injectable()
export class tracksService {
  tracks: Track[] = [];
  constructor() {
    this.tracks = [];
  }

  async getAllTracks(): Promise<Track[]> {
    return this.tracks;
  }

  async getTrackById(id: string): Promise<Track> {
    return this.tracks.find((item) => item.id === id);
  }

  async createTrack(dataTrack: Track): Promise<Track> {
    const newTrack = {
      id: uuidv4(),
      name: dataTrack.name,
      duration: dataTrack.duration,
      albumId: dataTrack.albumId,
      artistId: dataTrack.artistId,
    };
    this.tracks.push(newTrack);
    return newTrack;
  }

  async updateTrack(id: string, dataUpdate: Track): Promise<Track> {
    let index = -1;
    this.tracks.forEach((e, i) => {
      if (e.id === id) {
        e.name = dataUpdate.name;
        e.duration = dataUpdate.duration;
        e.albumId = dataUpdate.albumId;
        e.artistId = dataUpdate.artistId;
        index = i;
      }
    });
    return this.tracks[index];
  }

  async deleteTrack(id: string) {
    this.tracks = this.tracks.filter((e) => e.id !== id);
  }
}
