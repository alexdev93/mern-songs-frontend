import { all } from "redux-saga/effects";
import songsSaga from "../features/songs/songsSaga";
import statisticsSaga from "../features/statistics/statisticsSaga";

export default function* rootSaga() {
  yield all([songsSaga(), statisticsSaga()]);
}
