import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Album } from '../albums/albums.interface';
import { Artist } from '../artists/artista.interface';
import { Track } from '../tracks/tracks.interface';

@Injectable()
export class favoritesService {
  constructor(private prisma: PrismaService) {}

  async getAllFavorites(): Promise<any> {
    const favorites = await this.prisma.favorite.findMany({
      select: {
        tracks: {
          select: {
            id: true,
            name: true,
            duration: true,
            artistId: true,
            albumId: true,
          },
        },
        artists: {
          select: {
            id: true,
            name: true,
            grammy: true,
          },
        },
        albums: {
          select: {
            id: true,
            name: true,
            year: true,
            artistId: true,
          },
        },
      },
    });
    const _ = favorites[0];

    return {
      artists: favorites.length && _.artists ? _.artists : [],
      albums: favorites.length && _.albums ? _.albums : [],
      tracks: favorites.length && _.tracks ? _.tracks : [],
    };
  }

  async createFavoriteTrack(track: Track): Promise<Track> {
    const favorites = await this.prisma.favorite.findMany();

    if (favorites.length) {
      await this.prisma.track.update({
        where: { id: track.id },
        data: { favoritesId: favorites[0].id },
      });
    } else {
      const newTrack = await this.prisma.favorite.create({ data: {} });

      await this.prisma.track.update({
        where: { id: newTrack.id },
        data: { favoritesId: newTrack.id },
      });
    }

    return track;
  }

  async deleteFavouriteTrack(id: string): Promise<void> {
    await this.prisma.track.update({
      where: { id: id },
      data: { favoritesId: { set: null } },
    });
  }

  async createFavoriteAlbum(album: Album): Promise<Album> {
    const favorites = await this.prisma.favorite.findMany();

    if (favorites.length) {
      await this.prisma.album.update({
        where: { id: album.id },
        data: { favoritesId: favorites[0].id },
      });
    } else {
      const newAlbum = await this.prisma.favorite.create({ data: {} });

      await this.prisma.album.update({
        where: { id: newAlbum.id },
        data: { favoritesId: newAlbum.id },
      });
    }

    return album;
  }

  async deleteFavouriteAlbum(id: string): Promise<void> {
    await this.prisma.album.update({
      where: { id: id },
      data: { favoritesId: { set: null }, artistId: { set: null } },
    });
  }

  async createFavoriteArtist(artist: Artist): Promise<Artist> {
    const favorites = await this.prisma.favorite.findMany();

    if (favorites.length) {
      await this.prisma.artist.update({
        where: { id: artist.id },
        data: { favoritesId: favorites[0].id },
      });
    } else {
      const newAtrist = await this.prisma.favorite.create({ data: {} });

      await this.prisma.artist.update({
        where: { id: artist.id },
        data: { favoritesId: newAtrist.id },
      });
    }

    return artist;
  }

  async deleteFavouriteArtit(id: string): Promise<void> {
    await this.prisma.artist.update({
      where: { id: id },
      data: { favoritesId: { set: null } },
    });
  }
}
