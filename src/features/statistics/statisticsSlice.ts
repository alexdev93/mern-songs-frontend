import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchStatisticsData,
  fetchGenres,
  fetchArtists,
  fetchAlbums,
  // fetchSongsInAlbum,
} from "./statisticsAPI";
import { StatisticsState } from "./types";

const initialState: StatisticsState = {
  songStats: { totalSongs: 0, totalArtists: 0, totalAlbums: 0, totalGenres: 0},
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
      songStats: totalResponse,
      songsByGenre: genresResponse,
      songsByArtist: artistsResponse,
      songsByAlbum: albumsResponse,
      // songsInAlbum: songsInAlbumResponse,
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
        Object.assign(state, {
          ...action.payload,
          loading: false,
        });
      })
      .addCase(fetchStatistics.rejected, (state, action) => {
        console.error("Failed to fetch statistics:", action.error?.message);
        state.loading = false;
        state.error = action.error?.message || "An error occurred";
      });
  },
});

export default statisticsSlice.reducer;
