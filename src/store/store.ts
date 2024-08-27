import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import songsReducer from "../features/songs/songsSlice";
import statisticsReducer from "../features/statistics/statisticsSlice";
import rootSaga from "./rootSaga";

// Create the Redux Saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure the Redux store
export const store = configureStore({
  reducer: {
    songs: songsReducer,
    statistics: statisticsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware), // Add saga middleware only
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
