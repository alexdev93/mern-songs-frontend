import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchStatisticsData,
  fetchGenres,
  fetchArtists,
  fetchAlbums,
  // fetchSongsInAlbum,
} from "./statisticsAPI";

interface StatisticsState {
  totalSongs: number;
  totalArtists: number;
  totalAlbums: number;
  totalGenres: number;
  songsByGenre: { genre: string; count: number }[];
  songsByArtist: { artist: string; totalSongs: number; totalAlbums: number }[];
  songsByAlbum: { album: string; count: number }[];
  loading: boolean;
  error: string | null | undefined;
}

const initialState: StatisticsState = {
  totalSongs: 0,
  totalArtists: 0,
  totalAlbums: 0,
  totalGenres: 0,
  songsByGenre: [],
  songsByArtist: [],
  songsByAlbum: [],
  loading: false,
  error: null,
};

export const fetchStatistics = createAsyncThunk(
  "statistics/fetchStatistics",
  async () => {
    const [
      totalResponse,
      genresResponse,
      artistsResponse,
      albumsResponse,
      // songsInAlbumResponse,
    ] = await Promise.all([
      fetchStatisticsData(),
      fetchGenres(),
      fetchArtists(),
      fetchAlbums(),
      // fetchSongsInAlbum(),
    ]);

    return {
      totalSongs: totalResponse.data,
      totalArtists: totalResponse.data,
      totalAlbums: totalResponse.data,
      totalGenres: totalResponse.data,
      songsByGenre: genresResponse.data,
      songsByArtist: artistsResponse.data,
      songsByAlbum: albumsResponse.data,
      // songsInAlbum: songsInAlbumResponse.data,
    };
  }
);

const statisticsSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatistics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStatistics.fulfilled, (state, action) => {
        console.log("Fetched Statistics:", action.payload);
        state.totalSongs = action.payload.totalSongs;
        state.totalArtists = action.payload.totalArtists;
        state.totalAlbums = action.payload.totalAlbums;
        state.totalGenres = action.payload.totalGenres;
        state.songsByGenre = action.payload.songsByGenre;
        state.songsByArtist = action.payload.songsByArtist;
        state.songsByAlbum = action.payload.songsByAlbum;
        state.loading = false;
      })
      .addCase(fetchStatistics.rejected, (state, action) => {
        console.error("Failed to fetch statistics:", action.error.message);
        state.loading = false;
        // @ts-ignore
        state.error = action.error.message || "An error occurred";
      });
  },
});

export default statisticsSlice.reducer;
