import { call, put, takeLatest } from "redux-saga/effects";
import {
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
} from "./songsSlice";
import { fetchSongs, createSong, updateSong, deleteSong } from "./songsAPI";
import { PayloadAction } from "@reduxjs/toolkit";
import { Song } from "./types";

function* handleFetchSongs() {
  try {
    const songs: Song[] = yield call(fetchSongs);
    yield put(fetchSongsSuccess(songs));
  } catch (error) {
    yield put(fetchSongsFailure((error as Error).message));
  }
}

function* handleCreateSong(action: PayloadAction<Omit<Song, "id">>) {
  try {
    const newSong: Song = yield call(createSong, action.payload);
    yield put(createSongSuccess(newSong));
  } catch (error) {
    yield put(createSongFailure((error as Error).message));
  }
}

function* handleUpdateSong(action: PayloadAction<Song>) {
  try {
    const updatedSong: Song = yield call(updateSong, action.payload);
    yield put(updateSongSuccess(updatedSong));
  } catch (error) {
    yield put(updateSongFailure((error as Error).message));
  }
}

function* handleDeleteSong(action: PayloadAction<string>) {
  try {
    yield call(deleteSong, action.payload);
    yield put(deleteSongSuccess(action.payload));
  } catch (error) {
    yield put(deleteSongFailure((error as Error).message));
  }
}

export default function* songsSaga() {
  yield takeLatest(fetchSongsStart.type, handleFetchSongs);
  yield takeLatest(createSongStart.type, handleCreateSong);
  yield takeLatest(updateSongStart.type, handleUpdateSong);
  yield takeLatest(deleteSongStart.type, handleDeleteSong);
}
