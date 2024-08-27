import { all, call, put, takeEvery } from "redux-saga/effects";
import { fetchStatistics } from "./statisticsSlice";
import {
  fetchStatisticsData,
  fetchGenres,
  fetchArtists,
  fetchAlbums,
  // fetchSongsInAlbum, // Removed if not used
} from "./statisticsAPI";

function* fetchStatisticsSaga(): Generator<any, void, any> {
  try {
    const [
      totalResponse,
      genresResponse,
      artistsResponse,
      albumsResponse,
      // songsInAlbumResponse,
    ] = yield all([
      call(fetchStatisticsData),
      call(fetchGenres),
      call(fetchArtists),
      call(fetchAlbums),
      // call(fetchSongsInAlbum),
    ]);

    yield put(
      fetchStatistics.fulfilled(
        {
          totalSongs: totalResponse.data.totalSongs,
          totalArtists: totalResponse.data.totalArtists,
          totalAlbums: totalResponse.data.totalAlbums,
          totalGenres: totalResponse.data.totalGenres,
          songsByGenre: genresResponse.data,
          songsByArtist: artistsResponse.data,
          songsByAlbum: albumsResponse.data,
          // songsInAlbum: songsInAlbumResponse.data,
        },
        "uniqueRequestId"
      )
    );
  } catch (error) {
    const errorMessage = (error as Error).message || "Unknown error";
    yield put(fetchStatistics.rejected(null, errorMessage));
  }
}

export default function* statisticsSaga() {
  yield takeEvery(fetchStatistics.pending.type, fetchStatisticsSaga);
}
