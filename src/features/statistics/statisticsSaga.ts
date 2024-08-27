import { all, call, put, takeEvery } from "redux-saga/effects"; // Fix missing 'all' import
import { fetchStatistics } from "./statisticsSlice"; // Fix import issue
import {
  fetchStatisticsData,
  fetchGenres,
  fetchArtists,
  fetchAlbums,
  fetchSongsInAlbum,
} from "./statisticsAPI";

// Define the return type for fetchStatisticsSaga
function* fetchStatisticsSaga(): Generator<any, void, any> {
 try {
   // Use all to run effects in parallel
   const [
     totalResponse,
     genresResponse,
     artistsResponse,
     albumsResponse,
     songsInAlbumResponse,
   ] = yield all([
     call(fetchStatisticsData),
     call(fetchGenres),
     call(fetchArtists),
     call(fetchAlbums),
     call(fetchSongsInAlbum),
   ]);

   yield put(
     fetchStatistics.fulfilled({
       totalSongs: totalResponse.data.totalSongs,
       totalArtists: totalResponse.data.totalArtists,
       totalAlbums: totalResponse.data.totalAlbums,
       totalGenres: totalResponse.data.totalGenres,
       songsByGenre: genresResponse.data,
       songsByArtist: artistsResponse.data,
       songsByAlbum: albumsResponse.data,
       songsInAlbum: songsInAlbumResponse.data,
     })
   );
 } catch (error) {
   console.error("Failed to fetch statistics:", error);
 }
}

export function* statisticsSaga() {
  yield takeEvery(fetchStatistics.pending.type, fetchStatisticsSaga);
}
