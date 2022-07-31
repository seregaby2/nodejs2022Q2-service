import { Album } from '../albums/albums.interface';
import { Artist } from '../artists/artista.interface';
import { Track } from '../tracks/tracks.interface';

export interface Favorites {
  artists: Artist[]; // favorite artists ids
  albums: Album[]; // favorite albums ids
  tracks: Track[]; // favorite tracks ids
}
