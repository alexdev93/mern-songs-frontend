import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Song } from "./types";

interface SongsState {
  songs: Song[];
  loading: boolean;
  error: string | null;
}

const initialState: SongsState = {
  songs: [],
  loading: false,
  error: null,
};

const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    fetchSongsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSongsSuccess(state, action: PayloadAction<Song[]>) {
      state.songs = action.payload;
      state.loading = false;
    },
    fetchSongsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    createSongStart(state, action: PayloadAction<Song>) {
      // state.loading = true;
      state.error = null;
    },
    createSongSuccess(state, action: PayloadAction<Song>) {
      state.songs.push(action.payload);
      // state.loading = false;
    },
    createSongFailure(state, action: PayloadAction<string>) {
      // state.loading = false;
      state.error = action.payload;
    },
    updateSongStart(state, action: PayloadAction<Song>) {
      // state.loading = true;
      state.error = null;
    },
    updateSongSuccess(state, action: PayloadAction<Song>) {
      const index = state.songs.findIndex(
        (song) => song.id === action.payload.id
      );
      if (index !== -1) {
        state.songs[index] = action.payload;
      }
      // state.loading = false;
    },
    updateSongFailure(state, action: PayloadAction<string>) {
      // state.loading = false;
      state.error = action.payload;
    },
    deleteSongStart(state, action: PayloadAction<string>) {
      // state.loading = true;
      state.error = null;
    },
    deleteSongSuccess(state, action: PayloadAction<string>) {
      state.songs = state.songs.filter((song) => song.id !== action.payload);
      // state.loading = false;
    },
    deleteSongFailure(state, action: PayloadAction<string>) {
      // state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchSongsStart,
  fetchSongsSuccess,
  fetchSongsFailure,
  createSongStart,
  createSongSuccess,
  createSongFailure,
  updateSongStart,
  updateSongSuccess,
  updateSongFailure,
  deleteSongStart,
  deleteSongSuccess,
  deleteSongFailure,
} = songsSlice.actions;

export default songsSlice.reducer;
