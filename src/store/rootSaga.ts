import { all } from "redux-saga/effects";
import songsSaga from "../features/songs/songsSaga";
// import statisticsSaga from "@/statistics/statistics/";

export default function* rootSaga() {
  yield all([songsSaga()]);
}
