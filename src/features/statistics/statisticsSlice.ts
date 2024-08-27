import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchStatisticsData,
  fetchGenres,
  fetchArtists,
  fetchAlbums,
  fetchSongsInAlbum,
} from "./statisticsAPI";

interface StatisticsState {
  totalSongs: number;
  totalArtists: number;
  totalAlbums: number;
  totalGenres: number;
  songsByGenre: { genre: string; count: number }[];
  songsByArtist: { artist: string; totalSongs: number; totalAlbums: number }[];
  songsByAlbum: { album: string; count: number }[];
  songsInAlbum: { album: string; count: number }[];
}

const initialState: StatisticsState = {
  totalSongs: 0,
  totalArtists: 0,
  totalAlbums: 0,
  totalGenres: 0,
  songsByGenre: [],
  songsByArtist: [],
  songsByAlbum: [],
  songsInAlbum: [],
};

export const fetchStatistics = createAsyncThunk(
  "statistics/fetchStatistics",
  async () => {
    const [
      totalResponse,
      genresResponse,
      artistsResponse,
      albumsResponse,
      songsInAlbumResponse,
    ] = await Promise.all([
      fetchStatisticsData(),
      fetchGenres(),
      fetchArtists(),
      fetchAlbums(),
      fetchSongsInAlbum(),
    ]);

    return {
      ...totalResponse.data,
      songsByGenre: genresResponse.data,
      songsByArtist: artistsResponse.data,
      songsByAlbum: albumsResponse.data,
      songsInAlbum: songsInAlbumResponse.data,
    };
  }
);

const statisticsSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStatistics.fulfilled, (state, action) => {
      return { ...state, ...action.payload };
    });
  },
});

export default statisticsSlice.reducer;
