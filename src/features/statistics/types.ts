export interface StatisticsState {
  songStats: totalSongsInfo;
  songsByGenre: { _id: string; count: number }[];
  songsByArtist: { _id: string; totalAlbums: number }[];
  songsByAlbum: { _id: string; count: number }[];
  loading: boolean;
  error: string | null | undefined;
}


export interface totalSongsInfo {
    totalSongs: number;
    totalArtists: number;
    totalAlbums: number;
    totalGenres: number;
}