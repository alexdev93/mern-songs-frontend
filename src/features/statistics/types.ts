export interface StatisticsState {
  songStats: totalSongsInfo;
  songsByGenre: { _id: string; count: number }[];
  songsByArtist: { artist: string; totalSongs: number; totalAlbums: number }[];
  songsByAlbum: { album: string; count: number }[];
  loading: boolean;
  error: string | null | undefined;
}


export interface totalSongsInfo {
    totalSongs: number;
    totalArtists: number;
    totalAlbums: number;
    totalGenres: number;
}