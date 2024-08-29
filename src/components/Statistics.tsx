/** @jsxImportSource @emotion/react */
import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { fetchStatistics } from "../features/statistics/statisticsSlice";
import { debounce } from "lodash";
import StatisticsCard from "./StaticsCard";

const Charts: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  const { songStats, songsByGenre } = useSelector(
    (state: RootState) => state.statistics
  );

  // Debounce fetchStatistics to avoid excessive API calls
  const debouncedFetchStatistics = useCallback(
    debounce(() => {
      dispatch(fetchStatistics() as any);
    }, 500), // Adjust the debounce delay as needed
    [dispatch]
  );

  useEffect(() => {
    if (songsByGenre === undefined) return;
    debouncedFetchStatistics();
    return () => {
      debouncedFetchStatistics.cancel();
    };
  }, [debouncedFetchStatistics, songsByGenre]);

  return (
    <StatisticsCard
      totalSongs={songStats.totalSongs}
      totalGenres={songStats.totalGenres}
      totalAlbums={songStats.totalAlbums}
      totalArtists={songStats.totalArtists}
    />
  );
});

export default Charts;
