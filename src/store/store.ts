import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import songsReducer from "../features/songs/songsSlice";
import statisticsReducer from "../features/statistics/statisticsSlice";
import rootSaga from "./rootSaga";

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure the Redux store
export const store = configureStore({
  reducer: {
    songs: songsReducer,
    statistics: statisticsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false, // Ensure redux-thunk is disabled if using redux-saga
      serializableCheck: false, // Optional: Disable serializable check if needed
    }).concat(sagaMiddleware), // Add saga middleware
});

// Run the root saga
sagaMiddleware.run(rootSaga);

// Export types for the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
